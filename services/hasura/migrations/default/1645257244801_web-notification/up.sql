

CREATE TABLE "public"."NotificationType" ("value" text NOT NULL, "comment" text NOT NULL, PRIMARY KEY ("value") );

CREATE TABLE "public"."NotificationMessage" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "createdAt" timestamptz NOT NULL DEFAULT now(), "type" text NOT NULL, "recipientId" uuid NOT NULL, "url" text NOT NULL, "read" boolean NOT NULL, "deletedAt" timestamptz, "triggeredById" uuid NOT NULL, "contextId" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("recipientId") REFERENCES "public"."User"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("type") REFERENCES "public"."NotificationType"("value") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("triggeredById") REFERENCES "public"."User"("id") ON UPDATE cascade ON DELETE cascade, UNIQUE ("type", "triggeredById", "contextId", "recipientId"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "public"."NotificationSubscription" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "createdAt" timestamptz NOT NULL DEFAULT now(), "userId" uuid NOT NULL, "subscription" jsonb NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON UPDATE cascade ON DELETE cascade, UNIQUE ("subscription"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;

comment on column "public"."NotificationMessage"."contextId" is E'Triggered entity\'s id, e.g. CommentId or LikeId';
