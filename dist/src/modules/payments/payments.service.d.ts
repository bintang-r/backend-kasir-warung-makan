import { PrismaService } from '../../prisma/prisma.service';
import { PaymentMethod } from '@prisma/client';
export declare class PaymentsService {
    private prisma;
    constructor(prisma: PrismaService);
    createPayment(orderId: bigint, method: PaymentMethod, amount: number): Promise<{
        id: bigint;
        status: import("@prisma/client").$Enums.PaymentStatus;
        orderId: bigint;
        method: import("@prisma/client").$Enums.PaymentMethod;
        amount: import("@prisma/client-runtime-utils").Decimal;
        paidAt: Date | null;
    }>;
    getPaymentByOrder(orderId: bigint): Promise<{
        id: bigint;
        status: import("@prisma/client").$Enums.PaymentStatus;
        orderId: bigint;
        method: import("@prisma/client").$Enums.PaymentMethod;
        amount: import("@prisma/client-runtime-utils").Decimal;
        paidAt: Date | null;
    } | null>;
}
