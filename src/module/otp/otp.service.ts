import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { generateOtp, generateRefCode } from 'src/util/otp.util';
import { EmailOtpTransactionDal } from '../data-access-layer/email-otp-transaction/email-otp-transaction.dal';
import * as dayjs from 'dayjs';
import { OtpErrorCode } from 'src/enum/otp.enum';
import { IVerifyEmailOtpResponse } from './interface/verify-email-otp.interface';
import { ISendEmailOtpResponse } from './interface/send-email-otp.interface';

@Injectable()
export class OtpService {
  private readonly logger = new Logger(OtpService.name);

  constructor(
    private readonly mailerService: MailerService,
    private readonly emailOtpTransactionDal: EmailOtpTransactionDal,
  ) {}

  async sendEmailOtp(email: string): Promise<ISendEmailOtpResponse> {
    const otp = generateOtp();
    const refCode = generateRefCode();

    const result = await this.mailerService.sendMail({
      to: email,
      subject: 'Your OTP Code & Referral Code',
      text: `Your OTP code is: ${otp}\nYour Referral Code is: ${refCode}\nThis OTP will expire in 5 minutes.`,
      html: `<p>Your OTP code is: <strong>${otp}</strong></p>
             <p>Your Referral Code is: <strong>${refCode}</strong></p>
             <p>This OTP will expire in <strong>5 minutes</strong>.</p>`,
    });

    const messageId = result.messageId?.replace(/[<>]/g, '');
    const expiresAt = dayjs().add(5, 'minute').toDate();

    await this.emailOtpTransactionDal.create({
      email,
      otp,
      msgId: messageId,
      refCode,
      expiresAt,
    });

    return {
      refCode,
      email,
      expiresAt,
    };
  }

  async verifyEmailOtp(
    email: string,
    otp: string,
  ): Promise<IVerifyEmailOtpResponse> {
    const otpTransaction = await this.emailOtpTransactionDal.findOne({
      where: { email },
      order: { updatedAt: 'DESC' },
    });

    if (!otpTransaction) {
      throw new BadRequestException({
        success: false,
        errorCode: OtpErrorCode.OTP_NOT_FOUND,
        message: 'OTP not found.',
      });
    }

    const isMatch = otpTransaction.otp === otp;
    if (!isMatch) {
      throw new BadRequestException({
        success: false,
        errorCode: OtpErrorCode.OTP_INVALID,
        message: 'Invalid OTP.',
      });
    }

    if (otpTransaction.isVerified) {
      throw new BadRequestException({
        success: false,
        errorCode: OtpErrorCode.OTP_ALREADY_USED,
        message: 'OTP has been verified.',
      });
    }

    if (dayjs().isAfter(dayjs(otpTransaction.expiresAt))) {
      await this.emailOtpTransactionDal.softDelete({ id: otpTransaction.id });
      throw new BadRequestException({
        success: false,
        errorCode: OtpErrorCode.OTP_EXPIRED,
        message: 'OTP has expired.',
      });
    }

    await this.emailOtpTransactionDal.update(
      { id: otpTransaction.id },
      {
        isVerified: true,
      },
    );

    return {
      email: otpTransaction.email,
      refCode: otpTransaction.refCode,
    };
  }
}
