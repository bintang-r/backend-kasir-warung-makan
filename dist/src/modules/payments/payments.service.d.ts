import { PrismaService } from '../../prisma/prisma.service';
import { PaymentMethod, PaymentStatus } from '@prisma/client';
import { WhatsappService } from '../whatsapp/whatsapp.service';
export declare class PaymentsService {
    private prisma;
    private whatsappService;
    constructor(prisma: PrismaService, whatsappService: WhatsappService);
    processPayment(orderId: bigint, method: PaymentMethod, amount: number): Promise<{
        id: bigint;
        status: import("@prisma/client").$Enums.PaymentStatus;
        method: import("@prisma/client").$Enums.PaymentMethod;
        amount: import("@prisma/client-runtime-utils").Decimal;
        paidAt: Date | null;
        orderId: bigint;
    }>;
    private sendWhatsAppPaymentNotification;
    getPaymentByOrder(orderId: bigint): Promise<({
        order: {
            id: bigint;
            status: import("@prisma/client").$Enums.OrderStatus;
            createdAt: Date;
            updatedAt: Date;
            userId: bigint | null;
            guestSessionId: bigint | null;
            orderSource: import("@prisma/client").$Enums.OrderSource;
            totalPrice: import("@prisma/client-runtime-utils").Decimal;
            address: string | null;
            orderType: import("@prisma/client").$Enums.OrderType;
            isReceived: boolean;
            tableId: bigint | null;
        };
    } & {
        id: bigint;
        status: import("@prisma/client").$Enums.PaymentStatus;
        method: import("@prisma/client").$Enums.PaymentMethod;
        amount: import("@prisma/client-runtime-utils").Decimal;
        paidAt: Date | null;
        orderId: bigint;
    }) | null>;
    findAll(): Promise<({
        order: {
            table: {
                id: bigint;
                name: string;
                qrCode: string | null;
                status: import("@prisma/client").$Enums.TableStatus;
            } | null;
            user: {
                name: string;
            } | null;
        } & {
            id: bigint;
            status: import("@prisma/client").$Enums.OrderStatus;
            createdAt: Date;
            updatedAt: Date;
            userId: bigint | null;
            guestSessionId: bigint | null;
            orderSource: import("@prisma/client").$Enums.OrderSource;
            totalPrice: import("@prisma/client-runtime-utils").Decimal;
            address: string | null;
            orderType: import("@prisma/client").$Enums.OrderType;
            isReceived: boolean;
            tableId: bigint | null;
        };
    } & {
        id: bigint;
        status: import("@prisma/client").$Enums.PaymentStatus;
        method: import("@prisma/client").$Enums.PaymentMethod;
        amount: import("@prisma/client-runtime-utils").Decimal;
        paidAt: Date | null;
        orderId: bigint;
    })[]>;
    updateStatus(id: bigint, status: PaymentStatus): Promise<{
        id: bigint;
        status: import("@prisma/client").$Enums.PaymentStatus;
        method: import("@prisma/client").$Enums.PaymentMethod;
        amount: import("@prisma/client-runtime-utils").Decimal;
        paidAt: Date | null;
        orderId: bigint;
    }>;
}
