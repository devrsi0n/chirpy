// @ts-check
import { z } from 'zod';

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(['development', 'test', 'production']),
  NEXTAUTH_SECRET: z.string().min(16),
  NEXTAUTH_URL: z.preprocess(
    // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
    // Since NextAuth.js automatically uses the VERCEL_URL if present.
    (str) => process.env.VERCEL_URL ?? str,
    // VERCEL_URL doesn't include `https` so it cant be validated as a URL
    process.env.VERCEL ? z.string() : z.string().url(),
  ),

  PRIVATE_VAPID: z.string().min(16),
  EMAIL_API_KEY: z.string().min(16),
  TEST_USER_ID: z.string().min(16),
  PROJECT_ID_VERCEL: z.string().startsWith('prj_'),
  AUTH_BEARER_TOKEN: z.string().min(16),

  GITHUB_CLIENT_ID: z.string().min(10).optional(),
  GITHUB_CLIENT_SECRET: z.string().min(10).optional(),
});

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
  NEXT_PUBLIC_HOME_ORIGIN: z.string().url(),
  NEXT_PUBLIC_VAPID: z.string().min(32),
  NEXT_PUBLIC_MAINTENANCE_MODE: z.enum(['true', 'false']).optional(),
  NEXT_PUBLIC_ANALYTICS_DOMAIN: z.string().url(),
});

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {
  // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  NEXT_PUBLIC_HOME_ORIGIN: process.env.NEXT_PUBLIC_HOME_ORIGIN,
  NEXT_PUBLIC_VAPID: process.env.NEXT_PUBLIC_VAPID,
  // @ts-expect-error
  NEXT_PUBLIC_MAINTENANCE_MODE: process.env.NEXT_PUBLIC_MAINTENANCE_MODE,
  NEXT_PUBLIC_ANALYTICS_DOMAIN: process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN,
};
