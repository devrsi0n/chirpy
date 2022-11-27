export { default as NextAuth } from 'next-auth';

export { nextAuthOptions } from './auth-options';
export type { Profile as AuthProfile } from 'next-auth';
export { withAuth } from 'next-auth/middleware';
