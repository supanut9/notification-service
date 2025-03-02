export class EmailOtpTransactionDL {
  id: number;
  email: string;
  refCode: string;
  otp: string;
  msgId: string;
  expiresAt: Date;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
