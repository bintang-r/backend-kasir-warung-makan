import { PaymentsService } from './payments.service';
import { PaymentMethod, PaymentStatus } from '@prisma/client';
export declare class PaymentsController {
    private paymentsService;
    constructor(paymentsService: PaymentsService);
    createAdmin(body: {
        orderId: string;
        method: PaymentMethod;
        amount: number;
    }): Promise<{
        id: bigint;
        status: import("@prisma/client").$Enums.PaymentStatus;
        method: import("@prisma/client").$Enums.PaymentMethod;
        amount: import("@prisma/client-runtime-utils").Decimal;
        paidAt: Date | null;
        orderId: bigint;
    }>;
    process(body: {
        orderId: string;
        method: PaymentMethod;
        amount: number;
    }): Promise<{
        id: bigint;
        status: import("@prisma/client").$Enums.PaymentStatus;
        method: import("@prisma/client").$Enums.PaymentMethod;
        amount: import("@prisma/client-runtime-utils").Decimal;
        paidAt: Date | null;
        orderId: bigint;
    }>;
    findByOrder(orderId: string): Promise<{
        id: string;
        orderId: string;
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
        status: import("@prisma/client").$Enums.PaymentStatus;
        method: import("@prisma/client").$Enums.PaymentMethod;
        amount: import("@prisma/client-runtime-utils").Decimal;
        paidAt: Date | null;
    } | null>;
    findAll(): Promise<{
        id: string;
        orderId: string;
        order: {
            id: string;
            userId: string | undefined;
            tableId: string | undefined;
            table: {
                id: bigint;
                name: string;
                qrCode: string | null;
                status: import("@prisma/client").$Enums.TableStatus;
            } | null;
            user: {
                name: string;
            } | null;
            status: import("@prisma/client").$Enums.OrderStatus;
            createdAt: Date;
            updatedAt: Date;
            guestSessionId: bigint | null;
            orderSource: import("@prisma/client").$Enums.OrderSource;
            totalPrice: import("@prisma/client-runtime-utils").Decimal;
            address: string | null;
            orderType: import("@prisma/client").$Enums.OrderType;
            isReceived: boolean;
        };
        status: import("@prisma/client").$Enums.PaymentStatus;
        method: import("@prisma/client").$Enums.PaymentMethod;
        amount: import("@prisma/client-runtime-utils").Decimal;
        paidAt: Date | null;
    }[]>;
    updateStatus(id: string, status: PaymentStatus): Promise<{
        id: bigint;
        status: import("@prisma/client").$Enums.PaymentStatus;
        method: import("@prisma/client").$Enums.PaymentMethod;
        amount: import("@prisma/client-runtime-utils").Decimal;
        paidAt: Date | null;
        orderId: bigint;
    }>;
}
