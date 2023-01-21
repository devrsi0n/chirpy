import { sendVerificationEmail } from '@chirpy-dev/emails';
import { SESSION_MAX_AGE, isENVProd } from '@chirpy-dev/utils';
import { Provider } from 'next-auth/providers';
import credentialsProvider from 'next-auth/providers/credentials';
import discordProvider from 'next-auth/providers/discord';
import emailProvider from 'next-auth/providers/email';
import facebookProvider from 'next-auth/providers/facebook';
import gitHubProvider from 'next-auth/providers/github';
import googleProvider from 'next-auth/providers/google';
import twitterProvider, { TwitterProfile } from 'next-auth/providers/twitter';

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
      profile({ data }: TwitterProfile) {
        // https://github.com/nextauthjs/next-auth/blob/3539a356010b952fefcad2a02ae3d60e2cba992d/packages/core/src/providers/twitter.ts#L172
        return {
          id: data.id,
          name: data.name,
          username: data.username,
          // NOTE: E-mail is currently unsupported by OAuth 2 Twitter.
          email: null,
          image: data.profile_image_url,
        };
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
      async profile(profile) {
        let username: string = profile.login;
        const user = await prisma.user.findUnique({
          where: {
            username,
          },
        });
        if (user?.id) {
          // If the username is already taken, generate a new one
          username = generateUsername(username);
        }
        // Original profile: https://github.com/nextauthjs/next-auth/blob/39c78f27b590b0f33b50aa08a04138bfddd5290c/packages/core/src/providers/github.ts#L142
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          username: profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
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
