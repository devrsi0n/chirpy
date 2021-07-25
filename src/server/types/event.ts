import { JsonObject } from 'type-fest';

import { AnonymousSessionRequest } from './anonymous-session';

export interface EventRequest extends AnonymousSessionRequest {
  body: AnonymousSessionRequest['body'] & {
    event: EventRequestBody;
  };
}

export type EventRequestBody = {
  type: string;
  url: string;
  params: JsonObject | null;
  referrer?: string;
};

export type EventResponseBody = {
  cache: string;
};
