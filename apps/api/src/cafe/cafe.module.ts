import { Module } from '@nestjs/common';
import { CafeController } from './cafe.controller';
import { CafeService } from './cafe.service';
import { PrismaConnectorModule } from '../prisma/prisma.module';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [PrismaConnectorModule, UploadModule],
  controllers: [CafeController],
  providers: [CafeService],
})
export class CafeModule {}
