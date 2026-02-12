import { Module } from '@nestjs/common';
import { CafeService } from './cafe.service';
import { CafeController } from './cafe.controller';
import { PrismaConnectorModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaConnectorModule],
  controllers: [CafeController],
  providers: [CafeService],
})
export class CafeModule {}
