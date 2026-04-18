import { AuditLogsService } from './audit-logs.service';
export declare class AuditLogsController {
    private readonly auditLogsService;
    constructor(auditLogsService: AuditLogsService);
    getLogs(module?: string, type?: string, search?: string): Promise<({
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
