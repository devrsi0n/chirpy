declare namespace NodeJS {
  interface ProcessEnv {
    // Additional environment variables
    NEXT_PUBLIC_APP_URL: string;
    NEXT_PUBLIC_HASURA_HTTP_ORIGIN: string;
    NEXT_PUBLIC_HASURA_WS_ORIGIN: string;
    NEXT_PUBLIC_ANALYTICS_DOMAIN: string;
    NEXT_PUBLIC_COMMENT_DOMAIN: string;

    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
    HASH_ALGORITHM: string;
    NEXT_PUBLIC_VAPID: string;
    PRIVATE_VAPID: string;
    PROXY: string;
    EMAIL_API_KEY: string;
    SW_CACHE_ID: string;

    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
    TWITTER_CONSUMER_KEY: string;
    TWITTER_CONSUMER_SECRET: string;
    FACEBOOK_APP_ID: string;
    FACEBOOK_APP_SECRET: string;

    TEST_USER_ID: string;
    DOCKER: string;

    STRIPE_SECRET_KEY: string;
    STRIPE_PRICE_ID: string;
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
  }
}
