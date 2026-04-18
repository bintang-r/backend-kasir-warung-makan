import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { AuditLogsService } from '../../modules/audit-logs/audit-logs.service';
export declare class AuditLogFilter implements ExceptionFilter {
    private auditLogsService;
    constructor(auditLogsService: AuditLogsService);
    catch(exception: any, host: ArgumentsHost): Promise<void>;
}
