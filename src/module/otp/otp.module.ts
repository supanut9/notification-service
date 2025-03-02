import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { DataAccessLayerModule } from '../data-access-layer/data-access-layer.module';
import { SendEmailOtpUsecase } from './usecase/send-email-otp.usecase';
import { VerifyEmailOtpUsecase } from './usecase/verify-email-otp.usecase';

@Module({
  imports: [DataAccessLayerModule],
  controllers: [OtpController],
  providers: [OtpService, SendEmailOtpUsecase, VerifyEmailOtpUsecase],
})
export class OtpModule {}
