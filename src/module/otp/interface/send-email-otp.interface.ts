export interface ISendEmailOtpResponse {
  email: string;
  refCode: string;
  expiresAt: Date;
}
