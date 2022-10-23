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
      username: string;
      email: string;
      image: string;
      editableProjectIds: string[];
    };
  }
}
