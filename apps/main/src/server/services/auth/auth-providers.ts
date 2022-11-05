import { UserByPkDocument } from '@chirpy-dev/graphql';
import { SESSION_MAX_AGE, isENVProd } from '@chirpy-dev/utils';
import { Provider } from 'next-auth/providers';
import CredentialsProvider from 'next-auth/providers/credentials';
import EmailProvider from 'next-auth/providers/email';
import facebookProvider from 'next-auth/providers/facebook';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import twitterProvider from 'next-auth/providers/twitter';

import { query } from '$/server/common/gql';

import { sendVerificationEmail } from '../email/send-emails';
import { createUser } from './auth-adapter';
import { generateUsername } from './utilities';

const REQUEST_TIMEOUT = isENVProd ? 10_000 : 60_000;

export const authProviders: Provider[] = [
  process.env.GITHUB_CLIENT_ID &&
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      httpOptions: {
        timeout: REQUEST_TIMEOUT,
      },
    }),
  process.env.GOOGLE_CLIENT_ID &&
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      httpOptions: {
        timeout: REQUEST_TIMEOUT,
      },
    }),
  process.env.TWITTER_CONSUMER_KEY &&
    twitterProvider({
      clientId: process.env.TWITTER_CONSUMER_KEY,
      clientSecret: process.env.TWITTER_CONSUMER_SECRET,
      httpOptions: {
        timeout: REQUEST_TIMEOUT,
      },
    }),
  process.env.FACEBOOK_APP_ID &&
    facebookProvider({
      clientId: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      httpOptions: {
        timeout: REQUEST_TIMEOUT,
      },
    }),

  CredentialsProvider({
    name: 'Anonymous',
    credentials: {
      name: {
        label: 'Name',
        type: 'text',
        placeholder: 'Name',
      },
    },
    async authorize(credentials /*req*/) {
      if (
        credentials?.name ===
        process.env.TEST_USER_ID?.replace(/-/g, '').slice(0, 23)
      ) {
        // Sync with `services/hasura/seeds/default/1639909399233_user.sql`
        const user = await query(
          UserByPkDocument,
          {
            id: process.env.TEST_USER_ID,
          },
          'userByPk',
        );
        return user;
      }
      if (credentials?.name) {
        const name = credentials.name.trim();
        // Always create a new user with the provided name
        const user = await createUser({
          username: generateUsername(name),
          name,
          email: '',
          emailVerified: null,
        });

        return user;
      }
      return null;
    },
  }),
  EmailProvider({
    server: process.env.EMAIL_SERVER,
    from: process.env.EMAIL_FROM,
    maxAge: SESSION_MAX_AGE,
    async sendVerificationRequest({
      identifier: email,
      url /*provider: { server, from }*/,
    }) {
      await sendVerificationEmail({
        to: {
          email,
          name: email,
        },
        url,
      });
    },
  }),
].filter((p) => !!p) as Provider[];
