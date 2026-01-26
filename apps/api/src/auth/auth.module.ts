import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaConnectorModule } from '../prisma/prisma.module';

@Module({
  imports: [PassportModule, JwtModule.register({}), PrismaConnectorModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
