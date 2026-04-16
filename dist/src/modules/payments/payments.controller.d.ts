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
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.OrderStatus;
            tableId: bigint | null;
            userId: bigint | null;
            guestSessionId: bigint | null;
            orderSource: import("@prisma/client").$Enums.OrderSource;
            orderType: import("@prisma/client").$Enums.OrderType;
            totalPrice: import("@prisma/client-runtime-utils").Decimal;
            address: string | null;
            isReceived: boolean;
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
            user: {
                name: string;
            } | null;
            table: {
                id: bigint;
                name: string;
                qrCode: string | null;
                status: import("@prisma/client").$Enums.TableStatus;
            } | null;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.OrderStatus;
            guestSessionId: bigint | null;
            orderSource: import("@prisma/client").$Enums.OrderSource;
            orderType: import("@prisma/client").$Enums.OrderType;
            totalPrice: import("@prisma/client-runtime-utils").Decimal;
            address: string | null;
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
