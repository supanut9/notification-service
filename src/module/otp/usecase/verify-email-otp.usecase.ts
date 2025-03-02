import { Injectable, Logger } from '@nestjs/common';
import { OtpService } from '../otp.service';
import { BodySendEmailOtpDtoRequest } from '../dto/send-email-otp.dto';
import {
  BodyVerifyEmailOtpDtoRequest,
  VerifyEmailOtpDtoResponse,
} from '../dto/verify-email-otp.dto';
import { BaseResponse } from 'src/type/response.type';

@Injectable()
export class VerifyEmailOtpUsecase {
  private logger: Logger = new Logger(VerifyEmailOtpUsecase.name);

  constructor(private readonly otpService: OtpService) {}

  async execute(
    body: BodyVerifyEmailOtpDtoRequest,
  ): Promise<BaseResponse<VerifyEmailOtpDtoResponse>> {
    const verifiedOtp = await this.otpService.verifyEmailOtp(
      body.email,
      body.otp,
    );

    return {
      success: true,
      message: 'OTP verified successfully.',
      data: verifiedOtp,
    };
  }
}
