import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  UseGuards,
  Version,
} from '@nestjs/common';
import {
  BodySendEmailOtpDtoRequest,
  SendEmailOtpDtoResponse,
} from './dto/send-email-otp.dto';
import { SendEmailOtpUsecase } from './usecase/send-email-otp.usecase';
import { VerifyEmailOtpUsecase } from './usecase/verify-email-otp.usecase';
import {
  BodyVerifyEmailOtpDtoRequest,
  VerifyEmailOtpDtoResponse,
} from './dto/verify-email-otp.dto';
import { BaseResponse } from 'src/type/response.type';
import { ApiKeyGuard } from 'src/guard/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('otp')
export class OtpController {
  private logger: Logger = new Logger(OtpController.name);

  constructor(
    private readonly sendEmailOtpUsecase: SendEmailOtpUsecase,
    private readonly verifyEmailOtpUsecase: VerifyEmailOtpUsecase,
  ) {}

  @Post('email/send-otp')
  @HttpCode(HttpStatus.OK)
  @Version('1')
  async sendEmailOTP(
    @Body() body: BodySendEmailOtpDtoRequest,
  ): Promise<BaseResponse<SendEmailOtpDtoResponse>> {
    return await this.sendEmailOtpUsecase.execute(body);
  }

  @Post('email/verify-otp')
  @HttpCode(HttpStatus.OK)
  @Version('1')
  async verifyEmailOTP(
    @Body() body: BodyVerifyEmailOtpDtoRequest,
  ): Promise<BaseResponse<VerifyEmailOtpDtoResponse>> {
    return await this.verifyEmailOtpUsecase.execute(body);
  }
}
