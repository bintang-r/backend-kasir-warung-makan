import { PaymentsService } from './payments.service';
import { PaymentMethod } from '@prisma/client';
export declare class PaymentsController {
    private paymentsService;
    constructor(paymentsService: PaymentsService);
    create(body: {
        orderId: string;
        method: PaymentMethod;
        amount: number;
    }): Promise<{
        id: bigint;
        status: import("@prisma/client").$Enums.PaymentStatus;
        orderId: bigint;
        method: import("@prisma/client").$Enums.PaymentMethod;
        amount: import("@prisma/client-runtime-utils").Decimal;
        paidAt: Date | null;
    }>;
    findByOrder(orderId: string): Promise<{
        id: bigint;
        status: import("@prisma/client").$Enums.PaymentStatus;
        orderId: bigint;
        method: import("@prisma/client").$Enums.PaymentMethod;
        amount: import("@prisma/client-runtime-utils").Decimal;
        paidAt: Date | null;
    } | null>;
}
