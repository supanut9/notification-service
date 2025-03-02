import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfig } from './config/database.config';
import { MailerModule } from '@nestjs-modules/mailer';
import { SMTPConfig } from './config/smtp.config';
import { DataAccessLayerModule } from './module/data-access-layer/data-access-layer.module';
import { OtpModule } from './module/otp/otp.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SMTPConfig,
    }),
    DataAccessLayerModule,
    OtpModule,
  ],
})
export class AppModule {}
