alter table "public"."NotificationSubscription" alter column "createdAt" drop not null;
alter table "public"."NotificationSubscription" add column "createdAt" timestamptz;
