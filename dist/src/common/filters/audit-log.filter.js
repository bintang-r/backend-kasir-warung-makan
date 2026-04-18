"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogFilter = void 0;
const common_1 = require("@nestjs/common");
const audit_logs_service_1 = require("../../modules/audit-logs/audit-logs.service");
const client_1 = require("@prisma/client");
let AuditLogFilter = class AuditLogFilter {
    auditLogsService;
    constructor(auditLogsService) {
        this.auditLogsService = auditLogsService;
    }
    async catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const exceptionResponse = exception instanceof common_1.HttpException
            ? exception.getResponse()
            : { message: exception.message || 'Internal Server Error' };
        const errorMessage = typeof exceptionResponse === 'object'
            ? exceptionResponse.message || JSON.stringify(exceptionResponse)
            : exceptionResponse;
        if (status >= 400) {
            const user = request.user;
            const actorId = user ? BigInt(user.id) : null;
            await this.auditLogsService.log(actorId, `Sistem Error: ${status}`, 'Sistem/Security', `Path: ${request.url}\nError: ${errorMessage}`, status >= 500 ? client_1.LogType.danger : client_1.LogType.warning);
        }
        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: errorMessage,
        });
    }
};
exports.AuditLogFilter = AuditLogFilter;
exports.AuditLogFilter = AuditLogFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [audit_logs_service_1.AuditLogsService])
], AuditLogFilter);
//# sourceMappingURL=audit-log.filter.js.map