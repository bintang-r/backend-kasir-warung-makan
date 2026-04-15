import { PaymentsService } from './payments.service';
import { PaymentMethod } from '@prisma/client';
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
    findByOrder(orderId: string): Promise<({
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
    } & {
        id: bigint;
        status: import("@prisma/client").$Enums.PaymentStatus;
        method: import("@prisma/client").$Enums.PaymentMethod;
        amount: import("@prisma/client-runtime-utils").Decimal;
        paidAt: Date | null;
        orderId: bigint;
    }) | null>;
}
