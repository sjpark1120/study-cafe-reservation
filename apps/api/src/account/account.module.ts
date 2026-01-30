import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { PrismaConnectorModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaConnectorModule],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
