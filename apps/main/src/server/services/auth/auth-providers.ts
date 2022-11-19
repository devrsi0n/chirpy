import { UserByPkDocument } from '@chirpy-dev/graphql';
import { SESSION_MAX_AGE, isENVProd } from '@chirpy-dev/utils';
import { Provider } from 'next-auth/providers';
import CredentialsProvider from 'next-auth/providers/credentials';
import DiscordProvider from 'next-auth/providers/discord';
import emailProvider from 'next-auth/providers/email';
import facebookProvider from 'next-auth/providers/facebook';
import gitHubProvider from 'next-auth/providers/github';
import googleProvider from 'next-auth/providers/google';
import redditProvider from 'next-auth/providers/reddit';
import twitterProvider from 'next-auth/providers/twitter';

import { query } from '$/server/common/gql';

import { sendVerificationEmail } from '../email/send-emails';
import { createUser } from './auth-adapter';
import { generateUsername } from './utilities';

const REQUEST_TIMEOUT = isENVProd ? 10_000 : 60_000;

export const authProviders: Provider[] = [
  process.env.GOOGLE_CLIENT_ID &&
    googleProvider({
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
  process.env.REDDIT_CLIENT_ID &&
    redditProvider({
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
      authorization: {
        params: {
          duration: 'permanent',
        },
      },
    }),
  process.env.DISCORD_CLIENT_ID &&
    process.env.DISCORD_CLIENT_SECRET &&
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  process.env.GITHUB_CLIENT_ID &&
    gitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
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
        });

        return user;
      }
      return null;
    },
  }),
  emailProvider({
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
