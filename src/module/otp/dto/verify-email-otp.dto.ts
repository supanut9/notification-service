import { IsEmail, IsNotEmpty } from 'class-validator';

export class BodyVerifyEmailOtpDtoRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  otp: string;
}

export class VerifyEmailOtpDtoResponse {
  email: string;
  refCode: string;
}
