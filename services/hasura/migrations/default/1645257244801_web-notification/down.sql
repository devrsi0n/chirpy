
comment on column "public"."NotificationMessage"."contextId" is NULL;


-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."NotificationSubscription" add column "createdAt" timestamptz
--  null default now();

alter table "public"."NotificationSubscription" alter column "createdAt" drop not null;
alter table "public"."NotificationSubscription" add column "createdAt" timestamptz;

DROP TABLE "public"."NotificationSubscription";

DROP TABLE "public"."NotificationMessage";

DROP TABLE "public"."NotificationType";
