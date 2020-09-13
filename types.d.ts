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

declare module '@theme-ui/presets' {
  import { Theme } from 'theme-ui';

  const presets: {
    base: Theme;
    funk: Theme;
    dark: Theme;
  };

  export = presets;
}

// declare module 'react' {
//   import { SxStyleProp } from 'theme-ui';
//   interface HTMLAttributes {
//     sx?: SxStyleProp;
//   }
// }
