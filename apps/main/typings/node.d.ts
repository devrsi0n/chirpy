declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_HOME_ORIGIN: string;
    NEXT_PUBLIC_ANALYTICS_DOMAIN: string;
    NEXT_PUBLIC_COMMENT_DOMAIN: string;
    NEXT_PUBLIC_TINYBIRD_FLOCK_TOKEN: string;

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
  }
}
