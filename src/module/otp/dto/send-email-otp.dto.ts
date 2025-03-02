import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class BodySendEmailOtpDtoRequest {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class SendEmailOtpDtoResponse {
  email: string;
  refCode: string;
  expiresAt: Date;
}
