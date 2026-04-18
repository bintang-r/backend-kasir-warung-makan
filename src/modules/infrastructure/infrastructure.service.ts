import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class InfrastructureService {
  private readonly logger = new Logger(InfrastructureService.name);

  constructor(private prisma: PrismaService) {}

  async getBranding() {
    const logo = await this.prisma.systemSetting.findUnique({ where: { key: 'branding_logo' } });
    const name = await this.prisma.systemSetting.findUnique({ where: { key: 'branding_name' } });

    return {
      logo: logo?.value || null,
      name: name?.value || 'RM Siantar Minang',
    };
  }

  async updateBrandingName(name: string) {
    return this.prisma.systemSetting.upsert({
      where: { key: 'branding_name' },
      update: { value: name },
      create: { key: 'branding_name', value: name },
    });
  }

  async updateLogo(file: Express.Multer.File) {
    const relativePath = `/uploads/branding/${file.filename}`;
    
    // Cleanup old logo if exists
    const oldLogo = await this.prisma.systemSetting.findUnique({ where: { key: 'branding_logo' } });
    if (oldLogo?.value && oldLogo.value.startsWith('/uploads/')) {
        const oldAbsolutePath = path.join(process.cwd(), oldLogo.value);
        if (fs.existsSync(oldAbsolutePath)) {
            try {
                fs.unlinkSync(oldAbsolutePath);
            } catch (err) {
                this.logger.error(`Failed to delete old logo: ${oldAbsolutePath}`, err);
            }
        }
    }

    // Save new logo path
    return this.prisma.systemSetting.upsert({
      where: { key: 'branding_logo' },
      update: { value: relativePath },
      create: { key: 'branding_logo', value: relativePath },
    });
  }
}
