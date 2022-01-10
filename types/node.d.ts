declare namespace NodeJS {
  interface ProcessEnv {
    // Additional environment variables
    NEXT_PUBLIC_APP_URL: string;
    NEXT_PUBLIC_HASURA_HTTP_ORIGIN: string;
    NEXT_PUBLIC_HASURA_WS_ORIGIN: string;
    NEXT_PUBLIC_ANALYTICS_DOMAIN: string;
    NEXT_PUBLIC_COMMENT_DOMAIN: string;

    HASH_KEY: string;
    HASH_ALGORITHM: string;
    NEXTAUTH_URL: string;
    HASURA_ADMIN_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
    TWITTER_CONSUMER_KEY: string;
    TWITTER_CONSUMER_SECRET: string;
    FACEBOOK_APP_ID: string;
    FACEBOOK_APP_SECRET: string;
  }
}
