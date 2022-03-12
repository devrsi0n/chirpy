import NextAuth from 'next-auth';

type UserType = 'admin' | 'anonymous' | 'free' | 'pro';

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
      editableProjectIds: string[];
      type?: UserType | null;
    };
  }
}

declare module 'next-auth/jwt/types' {
  export interface JWT {
    name: string;
    email: string;
    picture: string;
    sub: string;
    type?: UserType | null;
    editableProjectIds: string[];
  }
}
