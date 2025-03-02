import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  EntityManager,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { EmailOtpTransactionEntity } from './email-otp-transaction.entity';
import { EmailOtpTransactionDL } from './email-otp-transaction.dl';

@Injectable()
export class EmailOtpTransactionDal {
  private readonly logger = new Logger(EmailOtpTransactionDal.name);

  constructor(
    @InjectRepository(EmailOtpTransactionEntity)
    private readonly emailOtpTransactionRepository: Repository<EmailOtpTransactionEntity>,
  ) {}

  async findOne(
    options: FindOneOptions<EmailOtpTransactionEntity>,
  ): Promise<EmailOtpTransactionDL | null> {
    const result = await this.emailOtpTransactionRepository.findOne(options);
    return result ? this.toData(result) : null;
  }

  async create(
    data: Partial<EmailOtpTransactionDL>,
    entityManager?: EntityManager,
  ): Promise<EmailOtpTransactionDL> {
    if (entityManager) {
      const result = await entityManager.save(EmailOtpTransactionEntity, data);
      return this.toData(result);
    }
    const result = await this.emailOtpTransactionRepository.save(data);
    return this.toData(result);
  }

  async update(
    criteria: FindOptionsWhere<EmailOtpTransactionEntity>,
    emailOtpTransactionDL: Partial<EmailOtpTransactionDL>,
    entityManager?: EntityManager,
  ): Promise<boolean> {
    if (entityManager) {
      const result = await entityManager.update(
        EmailOtpTransactionEntity,
        criteria,
        emailOtpTransactionDL,
      );
      return !!result.affected && result.affected > 0;
    }
    const result = await this.emailOtpTransactionRepository.update(
      criteria,
      emailOtpTransactionDL,
    );
    return !!result.affected && result.affected > 0;
  }

  async softDelete(
    condition: FindOptionsWhere<EmailOtpTransactionEntity>,
    entityManager?: EntityManager,
  ): Promise<boolean> {
    if (entityManager) {
      const result = await entityManager.softDelete(EmailOtpTransactionEntity, condition);
      return !!result.affected && result.affected > 0;
    }
    const result = await this.emailOtpTransactionRepository.softDelete(condition);
    return !!result.affected && result.affected > 0;
  }

  private toData(entity: EmailOtpTransactionEntity): EmailOtpTransactionDL {
    return {
      id: entity.id,
      email: entity.email,
      refCode: entity.refCode,
      otp: entity.otp,
      msgId: entity.msgId,
      isVerified: entity.isVerified,
      expiresAt: entity.expiresAt,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    };
  }
}
