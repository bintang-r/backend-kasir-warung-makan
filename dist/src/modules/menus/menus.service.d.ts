import { AuditLogsService } from '../audit-logs/audit-logs.service';
export declare class MenusService {
    private prisma;
    private auditLogsService;
    constructor(prisma: PrismaService, auditLogsService: AuditLogsService);
    findAll(): Promise<any>;
    findOne(id: bigint): Promise<any>;
    create(data: any, actorId?: bigint): Promise<any>;
    update(id: bigint, data: any, actorId?: bigint): Promise<any>;
    remove(id: bigint): Promise<any>;
}
