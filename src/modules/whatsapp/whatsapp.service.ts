import { Injectable, OnModuleInit, Logger, Global } from '@nestjs/common';
import { Client, LocalAuth, Events } from 'whatsapp-web.js';
import * as qrcode from 'qrcode';
import { PrismaService } from '../../prisma/prisma.service';

@Global()
@Injectable()
export class WhatsappService implements OnModuleInit {
  private client: Client;
  private qrCode: string | null = null;
  private isReady = false;
  private readonly logger = new Logger(WhatsappService.name);

  constructor(private prisma: PrismaService) {
    this.client = new Client({
      authStrategy: new LocalAuth({
        dataPath: './.wwebjs_auth'
      }),
      puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: true,
      }
    });
  }

  onModuleInit() {
    this.initialize();
  }

  private initialize() {
    this.client.on('qr', (qr) => {
      this.logger.log('WhatsApp QR Code received');
      // Convert QR to base64 for frontend
      qrcode.toDataURL(qr, (err, url) => {
        this.qrCode = url;
      });
      this.isReady = false;
    });

    this.client.on('ready', () => {
      this.logger.log('WhatsApp Client is ready!');
      this.qrCode = null;
      this.isReady = true;
    });

    this.client.on('authenticated', () => {
      this.logger.log('WhatsApp Client authenticated');
    });

    this.client.on('auth_failure', (msg) => {
      this.logger.error('WhatsApp Auth failure', msg);
      this.isReady = false;
    });

    this.client.on('disconnected', (reason) => {
      this.logger.warn('WhatsApp Client disconnected', reason);
      this.isReady = false;
      this.qrCode = null;
      // Re-initialize after some delay
      setTimeout(() => this.client.initialize(), 5000);
    });

    this.client.initialize().catch(err => {
      this.logger.error('Failed to initialize WhatsApp client', err);
    });
  }

  getStatus() {
    return {
      isReady: this.isReady,
      qrCode: this.qrCode,
    };
  }

  async sendMessage(to: string, message: string) {
    if (!this.isReady) {
      this.logger.warn('Cannot send message, WhatsApp client not ready');
      await this.logMessage(to, message, 'FAILED (Client Not Ready)');
      return false;
    }

    try {
      // Clean the phone number: remove non-numeric
      const cleanedNum = to.replace(/\D/g, '');
      const finalNum = cleanedNum.includes('@c.us') ? cleanedNum : `${cleanedNum}@c.us`;
      
      await this.client.sendMessage(finalNum, message);
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
    const setting = await this.prisma.systemSetting.findUnique({
      where: { key: 'admin_whatsapp_number' }
    });
    return setting?.value || null;
  }
}
