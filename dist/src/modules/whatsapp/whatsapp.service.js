"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var WhatsappService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const whatsapp_web_js_1 = require("whatsapp-web.js");
const qrcode = __importStar(require("qrcode"));
const prisma_service_1 = require("../../prisma/prisma.service");
let WhatsappService = WhatsappService_1 = class WhatsappService {
    prisma;
    configService;
    senderClient;
    receiverClient;
    senderState = { isReady: false, qrCode: null };
    receiverState = { isReady: false, qrCode: null };
    logger = new common_1.Logger(WhatsappService_1.name);
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
        this.senderClient = this.createClientInstance('sender', './.wwebjs_auth_sender');
        this.receiverClient = this.createClientInstance('receiver', './.wwebjs_auth_receiver');
    }
    createClientInstance(id, dataPath) {
        return new whatsapp_web_js_1.Client({
            authStrategy: new whatsapp_web_js_1.LocalAuth({
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
    initializeClient(client, type) {
        client.on('qr', (qr) => {
            this.logger.log(`WhatsApp QR Code received for ${type}`);
            qrcode.toDataURL(qr, (err, url) => {
                if (type === 'sender')
                    this.senderState.qrCode = url;
                else
                    this.receiverState.qrCode = url;
            });
            if (type === 'sender')
                this.senderState.isReady = false;
            else
                this.receiverState.isReady = false;
        });
        client.on('ready', async () => {
            this.logger.log(`WhatsApp Client (${type}) is ready!`);
            if (type === 'sender') {
                this.senderState.qrCode = null;
                this.senderState.isReady = true;
            }
            else {
                this.receiverState.qrCode = null;
                this.receiverState.isReady = true;
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
            if (type === 'sender')
                this.senderState.isReady = false;
            else
                this.receiverState.isReady = false;
        });
        client.on('disconnected', (reason) => {
            this.logger.warn(`WhatsApp Client (${type}) disconnected`, reason);
            if (type === 'sender') {
                this.senderState.isReady = false;
                this.senderState.qrCode = null;
            }
            else {
                this.receiverState.isReady = false;
                this.receiverState.qrCode = null;
            }
            setTimeout(() => client.initialize(), 5000);
        });
        client.initialize().catch(err => {
            this.logger.error(`Failed to initialize WhatsApp client (${type})`, err);
        });
    }
    async updateAdminNumber(number) {
        try {
            await this.prisma.systemSetting.upsert({
                where: { key: 'admin_whatsapp_number' },
                update: { value: number },
                create: { key: 'admin_whatsapp_number', value: number },
            });
        }
        catch (err) {
            this.logger.error('Failed to auto-update admin number', err);
        }
    }
    getStatus() {
        return {
            sender: this.senderState,
            receiver: this.receiverState,
        };
    }
    async sendMessage(to, message) {
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
        }
        catch (error) {
            this.logger.error(`Error sending message to ${to}`, error);
            await this.logMessage(to, message, `FAILED (${error.message})`);
            return false;
        }
    }
    async logMessage(recipient, message, status) {
        try {
            await this.prisma.whatsappLog.create({
                data: {
                    recipient,
                    message,
                    status,
                }
            });
        }
        catch (err) {
            this.logger.error('Failed to log WhatsApp message', err);
        }
    }
    async getAdminNumber() {
        const envNum = this.configService.get('WHATSAPP_SENDING_NUMBER');
        if (envNum)
            return envNum;
        const setting = await this.prisma.systemSetting.findUnique({
            where: { key: 'admin_whatsapp_number' }
        });
        return setting?.value || null;
    }
};
exports.WhatsappService = WhatsappService;
exports.WhatsappService = WhatsappService = WhatsappService_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], WhatsappService);
//# sourceMappingURL=whatsapp.service.js.map