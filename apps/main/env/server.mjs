// @ts-check
/**
 * This file is included in `/next.config.mjs` which ensures the app isn't built with invalid env vars.
 * It has to be a `.mjs`-file to be imported there.
 */
import { serverSchema } from "./schema.mjs";
import { env as clientEnv, formatErrors } from "./client.mjs";

const serverEnv = serverSchema.safeParse(process.env);

if (!serverEnv.success) {
  console.error(
    "❌ Invalid environment variables:\n",
    ...formatErrors(serverEnv.error.format()),
  );
  throw new Error("Invalid environment variables");
}

for (let key of Object.keys(serverEnv.data)) {
  if (key.startsWith("NEXT_PUBLIC_")) {
    console.warn("❌ You are exposing a server-side env-variable:", key);

    throw new Error("You are exposing a server-side env-variable");
  }
}

export const env = { ...serverEnv.data, ...clientEnv };
