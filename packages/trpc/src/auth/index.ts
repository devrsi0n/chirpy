import NextAuth from 'next-auth';

import { nextAuthOptions } from './auth-options';

export const nextAuth = NextAuth(nextAuthOptions);
