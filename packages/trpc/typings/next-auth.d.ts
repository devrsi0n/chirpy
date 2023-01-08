// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */
  interface Session {
    hasuraToken: string;
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
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
