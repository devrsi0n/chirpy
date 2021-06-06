/* eslint-disable @typescript-eslint/no-unused-vars */
declare namespace NodeJS {
  interface ProcessEnv {
    // Additional environment variables
    NEXT_PUBLIC_APP_NAME: string;
    NEXT_PUBLIC_APP_URL: string;
    NEXT_PUBLIC_HASURA_HTTP_ORIGIN: string;
    NEXT_PUBLIC_HASURA_WS_ORIGIN: string;
    NEXT_PUBLIC_COMMENT_PROJECT: string;

    HASH_KEY: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type $TsFixMe = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type $TsAny = any; // For valid any scenarios

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

declare module 'geoip-database' {
  const database: {
    country: string;
  };
  export default database;
}
