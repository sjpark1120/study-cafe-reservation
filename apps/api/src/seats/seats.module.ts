import { Module } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { SeatsController } from './seats.controller';
import { PrismaConnectorModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaConnectorModule],
  controllers: [SeatsController],
  providers: [SeatsService],
})
export class SeatsModule {}
