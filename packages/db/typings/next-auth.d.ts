import { Plan as PlanUnion } from '@prisma/client';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */
  interface Session {
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

  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    username?: string | null;
  }
}

declare module 'next-auth/adapters' {
  export interface AdapterUser extends User {
    id: string;
    // Anonymous user doesn't have an email
    email?: string | null;
    emailVerified?: Date | null;
  }
}
