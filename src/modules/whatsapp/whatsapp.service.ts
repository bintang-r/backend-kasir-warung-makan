import { Injectable, OnModuleInit, Logger, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, LocalAuth } from 'whatsapp-web.js';
import * as qrcode from 'qrcode';
import { PrismaService } from '../../prisma/prisma.service';

@Global()
@Injectable()
export class WhatsappService implements OnModuleInit {
  private senderClient: Client;
  private receiverClient: Client;
  
  private senderState = { isReady: false, qrCode: null as string | null };
  private receiverState = { isReady: false, qrCode: null as string | null };

  private readonly logger = new Logger(WhatsappService.name);

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    this.senderClient = this.createClientInstance('sender', './.wwebjs_auth_sender');
    this.receiverClient = this.createClientInstance('receiver', './.wwebjs_auth_receiver');
  }

  private createClientInstance(id: string, dataPath: string) {
    return new Client({
      authStrategy: new LocalAuth({
        clientId: id,
        dataPath: dataPath
      }),
      webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.3000.1018908151-alpha.html',
      },
      puppeteer: {
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu'
        ],
        headless: true,
      }
    });
  }

  onModuleInit() {
    this.initializeClient(this.senderClient, 'sender');
    this.initializeClient(this.receiverClient, 'receiver');
  }

  private initializeClient(client: Client, type: 'sender' | 'receiver') {
    client.on('qr', (qr) => {
      this.logger.log(`WhatsApp QR Code received for ${type}`);
      qrcode.toDataURL(qr, (err, url) => {
        if (type === 'sender') this.senderState.qrCode = url;
        else this.receiverState.qrCode = url;
      });
      if (type === 'sender') this.senderState.isReady = false;
      else this.receiverState.isReady = false;
    });

    client.on('ready', async () => {
      this.logger.log(`WhatsApp Client (${type}) is ready!`);
      if (type === 'sender') {
        this.senderState.qrCode = null;
        this.senderState.isReady = true;
      } else {
        this.receiverState.qrCode = null;
        this.receiverState.isReady = true;

        // Auto-detect number for receiver
        const number = client.info.wid.user;
        if (number) {
          this.logger.log(`Detected Receiver Number: ${number}`);
          await this.updateAdminNumber(number);
        }
      }
    });

    client.on('authenticated', () => {
      this.logger.log(`WhatsApp Client (${type}) authenticated`);
    });

    client.on('auth_failure', (msg) => {
      this.logger.error(`WhatsApp Auth failure for ${type}`, msg);
      if (type === 'sender') this.senderState.isReady = false;
      else this.receiverState.isReady = false;
    });

    client.on('disconnected', (reason) => {
      this.logger.warn(`WhatsApp Client (${type}) disconnected`, reason);
      if (type === 'sender') {
        this.senderState.isReady = false;
        this.senderState.qrCode = null;
      } else {
        this.receiverState.isReady = false;
        this.receiverState.qrCode = null;
      }
      setTimeout(() => client.initialize(), 5000);
    });

    client.initialize().catch(err => {
      this.logger.error(`Failed to initialize WhatsApp client (${type})`, err);
    });
  }

  private async updateAdminNumber(number: string) {
    try {
      await this.prisma.systemSetting.upsert({
        where: { key: 'admin_whatsapp_number' },
        update: { value: number },
        create: { key: 'admin_whatsapp_number', value: number },
      });
    } catch (err) {
      this.logger.error('Failed to auto-update admin number', err);
    }
  }

  getStatus() {
    return {
      sender: this.senderState,
      receiver: this.receiverState,
    };
  }

  async sendMessage(to: string, message: string) {
    if (!this.senderState.isReady) {
      this.logger.warn('Cannot send message, Sender Bot not ready');
      await this.logMessage(to, message, 'FAILED (Sender Not Ready)');
      return false;
    }

    try {
      const cleanedNum = to.replace(/\D/g, '');
      const finalNum = cleanedNum.includes('@c.us') ? cleanedNum : `${cleanedNum}@c.us`;
      
      await this.senderClient.sendMessage(finalNum, message);
      await this.logMessage(to, message, 'SENT');
      return true;
    } catch (error) {
      this.logger.error(`Error sending message to ${to}`, error);
      await this.logMessage(to, message, `FAILED (${error.message})`);
      return false;
    }
  }

  private async logMessage(recipient: string, message: string, status: string) {
    try {
      await this.prisma.whatsappLog.create({
        data: {
          recipient,
          message,
          status,
        }
      });
    } catch (err) {
      this.logger.error('Failed to log WhatsApp message', err);
    }
  }

  async getAdminNumber() {
    const envNum = this.configService.get<string>('WHATSAPP_SENDING_NUMBER');
    if (envNum) return envNum;

    const setting = await this.prisma.systemSetting.findUnique({
      where: { key: 'admin_whatsapp_number' }
    });
    return setting?.value || null;
  }
}
