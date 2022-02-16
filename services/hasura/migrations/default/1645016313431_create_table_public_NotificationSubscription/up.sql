CREATE TABLE "public"."NotificationSubscription" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "createdAt" timestamptz NOT NULL, "userId" uuid NOT NULL, "subscription" jsonb NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON UPDATE cascade ON DELETE cascade, UNIQUE ("subscription"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
