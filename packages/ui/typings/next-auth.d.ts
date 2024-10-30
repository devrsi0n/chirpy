// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';
import { Plan as PlanUnion } from '@prisma/client';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */
  interface Session {
    hasuraToken: string;
    user: {
      id: string;
      name: string;
      username: string;
      email: string;
      image: string;
      plan: PlanUnion;
      editableProjectIds: string[];
    };
  }
}
