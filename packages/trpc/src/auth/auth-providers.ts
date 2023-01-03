import { sendVerificationEmail } from '@chirpy-dev/emails';
import { SESSION_MAX_AGE, isENVProd } from '@chirpy-dev/utils';
import { Provider } from 'next-auth/providers';
import credentialsProvider from 'next-auth/providers/credentials';
import discordProvider from 'next-auth/providers/discord';
import emailProvider from 'next-auth/providers/email';
import facebookProvider from 'next-auth/providers/facebook';
import gitHubProvider from 'next-auth/providers/github';
import googleProvider from 'next-auth/providers/google';
import twitterProvider from 'next-auth/providers/twitter';

import { prisma } from '../db/client';
import { generateUsername } from './utilities';

const REQUEST_TIMEOUT = isENVProd ? 10_000 : 20_000;

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

  process.env.DISCORD_CLIENT_ID &&
    process.env.DISCORD_CLIENT_SECRET &&
    discordProvider({
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
  credentialsProvider({
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
        const user = await prisma.user.findUnique({
          where: {
            id: process.env.TEST_USER_ID,
          },
        });
        return user;
      }
      if (credentials?.name) {
        const name = credentials.name.trim();
        // Always create a new user with the provided name
        const user = await prisma.user.create({
          data: {
            username: generateUsername(name),
            name,
            kind: 'ANONYMOUS',
          },
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
