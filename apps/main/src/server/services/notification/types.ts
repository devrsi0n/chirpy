import { NotificationType_Enum } from '@chirpy-dev/graphql';

export type NotificationPayload = {
  recipient: {
    id: string;
    name: string;
    email?: string | null;
  };
  type: NotificationType_Enum;
  triggeredBy: {
    id: string;
    name: string;
  };
  url: string;
  body: string;
};
