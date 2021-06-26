import { JsonObject } from 'type-fest';

import { SessionRequest } from './session';

export interface EventRequest extends SessionRequest {
  body: SessionRequest['body'] & {
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
