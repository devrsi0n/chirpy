/* eslint-disable @typescript-eslint/no-unused-vars */
declare namespace NodeJS {
  interface ProcessEnv {
    // Additional environment variables
    NEXT_PUBLIC_APP_NAME: string;
    NEXT_PUBLIC_APP_URL: string;
    HASH_KEY: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
    NEXT_PUBLIC_HASURA_HTTP_ORIGIN: string;
    NEXT_PUBLIC_HASURA_WS_ORIGIN: string;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type $TsFixMe = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type $TsAny = any; // For valid any scenarios

declare module 'tailwindcss/defaultTheme' {
  export = any;
}

declare module 'tailwindcss/colors' {
  export = any;
}

declare module '*.svg' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any;
  export default content;
}

namespace Express {
  interface User {
    id: string;
  }
}

declare module 'mdx-prism' {
  const MDXPrism: $TsAny;
  export default MDXPrism;
}
