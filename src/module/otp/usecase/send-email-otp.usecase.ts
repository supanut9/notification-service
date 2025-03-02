import { Injectable, Logger } from '@nestjs/common';
import { OtpService } from '../otp.service';
import {
  BodySendEmailOtpDtoRequest,
  SendEmailOtpDtoResponse,
} from '../dto/send-email-otp.dto';
import { BaseResponse } from 'src/type/response.type';

@Injectable()
export class SendEmailOtpUsecase {
  private logger: Logger = new Logger(SendEmailOtpUsecase.name);

  constructor(private readonly otpService: OtpService) {}

  async execute(
    body: BodySendEmailOtpDtoRequest,
  ): Promise<BaseResponse<SendEmailOtpDtoResponse>> {
    const sentOtp = await this.otpService.sendEmailOtp(body.email);

    return {
      success: true,
      message: 'OTP sent successfully.',
      data: sentOtp,
    };
  }
}
