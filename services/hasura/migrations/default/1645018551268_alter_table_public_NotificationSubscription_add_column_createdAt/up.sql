alter table "public"."NotificationSubscription" add column "createdAt" timestamptz
 null default now();
