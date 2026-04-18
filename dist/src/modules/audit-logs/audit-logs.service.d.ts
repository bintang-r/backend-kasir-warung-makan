import { PrismaService } from '../../prisma/prisma.service';
import { LogType } from '@prisma/client';
export declare class AuditLogsService {
    private prisma;
    constructor(prisma: PrismaService);
    log(userId: bigint | null, action: string, module: string, details?: string | null, type?: LogType): Promise<{
        id: bigint;
        createdAt: Date;
        userId: bigint | null;
        action: string;
        module: string;
        details: string | null;
        type: import("@prisma/client").$Enums.LogType;
    } | undefined>;
    findAll(query?: {
        module?: string;
        type?: string;
        search?: string;
    }): Promise<({
        user: {
            name: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
        } | null;
    } & {
        id: bigint;
        createdAt: Date;
        userId: bigint | null;
        action: string;
        module: string;
        details: string | null;
        type: import("@prisma/client").$Enums.LogType;
    })[]>;
}
