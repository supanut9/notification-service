import * as crypto from 'crypto';
import { v7 as uuid } from 'uuid';

export const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString(); // Secure 6-digit OTP
};

export const generateRefCode = (length = 6): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let refCode = '';
  for (let i = 0; i < length; i++) {
    refCode += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return refCode;
};

export const generateMsgId = () => {
  return uuid();
};
