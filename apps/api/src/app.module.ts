import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaConnectorModule } from './prisma/prisma.module';
import { LoggerModule } from 'nestjs-pino';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { JwtAuthGuard } from './auth/guard/jwt.guard';
import { CafeModule } from './cafe/cafe.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UPLOADS_CAFE_PATH } from './upload/upload.service';
import { SeatsModule } from './seats/seats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaConnectorModule,
    LoggerModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: UPLOADS_CAFE_PATH,
      serveRoot: '/cafe-images',
    }),
    AuthModule,
    AccountModule,
    CafeModule,
    SeatsModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
