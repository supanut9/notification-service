import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailOtpTransactionEntity } from './email-otp-transaction/email-otp-transaction.entity';
import { EmailOtpTransactionDal } from './email-otp-transaction/email-otp-transaction.dal';

@Module({
  imports: [TypeOrmModule.forFeature([EmailOtpTransactionEntity])],
  providers: [EmailOtpTransactionDal],
  exports: [EmailOtpTransactionDal],
})
export class DataAccessLayerModule {}
