import { Provider } from 'next-auth/providers';
import CredentialsProvider from 'next-auth/providers/credentials';
import EmailProvider from 'next-auth/providers/email';
import facebookProvider from 'next-auth/providers/facebook';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import twitterProvider from 'next-auth/providers/twitter';

import { getHostEnv } from '$/utilities/env';

import { isENVProd } from '../../utilities/env';
import { sendVerificationRequest } from '../email/send-emails';

const REQUEST_TIMEOUT = isENVProd ? 10_000 : 60_000;

export const authProviders: Provider[] = [
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
  // Only allow the credential provider if not in production
  ...(['staging', 'preview', 'localhost'].includes(getHostEnv(process.env.NEXTAUTH_URL))
    ? [
        CredentialsProvider({
          name: 'Credentials for test only',
          credentials: {
            username: { label: 'Username', type: 'text', placeholder: 'User name' },
            password: { label: 'Password', type: 'password' },
          },
          async authorize(credentials /*req*/) {
            if (
              credentials?.username === process.env.TEST_USER_ID &&
              credentials?.password === process.env.HASURA_EVENT_SECRET
            ) {
              // Sync with `services/hasura/seeds/default/1639909399233_user.sql`
              return {
                id: '6c0a23ae-885a-4630-946f-e694dff6f446',
                name: 'cypresstest',
                email: 'cypress.test@localhost',
                image: 'https://www.cypress.io/icons/icon-72x72.png',
              };
            }
            return null;
          },
        }),
        EmailProvider({
          server: process.env.EMAIL_SERVER,
          from: process.env.EMAIL_FROM,
          async sendVerificationRequest({ identifier: email, url /*provider: { server, from }*/ }) {
            await sendVerificationRequest({
              to: {
                email,
                name: email,
              },
              url,
            });
          },
        }),
      ]
    : []),
];
