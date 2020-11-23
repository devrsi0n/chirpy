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
