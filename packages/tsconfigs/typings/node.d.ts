declare namespace NodeJS {
  interface ProcessEnv {
    // Additional environment variables
    NEXT_PUBLIC_APP_URL: string;
    NEXT_PUBLIC_ANALYTICS_DOMAIN: string;

    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
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

    STRIPE_SECRET_KEY: string;
    VERCEL_ENV: string;
    STRIPE_SIGN_SECRET: string;
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
  }
}
