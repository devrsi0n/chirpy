alter table "public"."NotificationSubscription" drop constraint "NotificationSubscription_subscription_userId_key";
alter table "public"."NotificationSubscription" add constraint "NotificationSubscription_subscription_key" unique ("subscription");
