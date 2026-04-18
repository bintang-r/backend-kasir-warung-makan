import { AuditLogsService } from '../audit-logs/audit-logs.service';
export declare class UsersService {
    private prisma;
    private auditLogsService;
    constructor(prisma: PrismaService, auditLogsService: AuditLogsService);
    findByEmail(email: string): Promise<any>;
    findById(id: bigint): Promise<any>;
    create(data: any, actorId?: bigint): Promise<any>;
    findAll(): Promise<any>;
    updateUser(id: bigint, data: any, actorId?: bigint): Promise<any>;
    remove(id: bigint): Promise<any>;
}
