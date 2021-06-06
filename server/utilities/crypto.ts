import crypto from 'crypto';
import dayjs from 'dayjs';
import UTC from 'dayjs/plugin/utc';
import { v4, v5 } from 'uuid';

dayjs.extend(UTC);

const ROTATING_SALT = hash(dayjs().startOf('month').utc().format());

export function hash(...args: string[]): string {
  return crypto.createHash('sha512').update(args.join('')).digest('hex');
}

export function secret() {
  return hash(process.env.HASH_KEY);
}

export function salt() {
  return v5([secret(), ROTATING_SALT].join(''), v5.DNS);
}

export function createUUID(...args: string[]): string {
  if (args.length === 0) return v4();

  return v5(args.join(''), salt());
}
