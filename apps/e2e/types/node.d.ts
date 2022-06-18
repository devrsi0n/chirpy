declare namespace NodeJS {
  interface ProcessEnv {
    TEST_USER_ID: string;
    HASURA_EVENT_SECRET: string;
  }
}
