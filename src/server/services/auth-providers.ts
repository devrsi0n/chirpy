import facebookProvider from 'next-auth/providers/facebook';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import twitterProvider from 'next-auth/providers/twitter';

const REQUEST_TIMEOUT = 300_000;

export const authProviders = [
  GitHubProvider({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    httpOptions: {
      timeout: REQUEST_TIMEOUT,
    },
  }),
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    httpOptions: {
      timeout: REQUEST_TIMEOUT,
    },
  }),
  twitterProvider({
    clientId: process.env.TWITTER_CONSUMER_KEY,
    clientSecret: process.env.TWITTER_CONSUMER_SECRET,
    httpOptions: {
      timeout: REQUEST_TIMEOUT,
    },
  }),
  facebookProvider({
    clientId: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    httpOptions: {
      timeout: REQUEST_TIMEOUT,
    },
  }),
];
