import { JsonObject } from 'type-fest';

export type EventRequestBody = {
  type: string;
  url: string;
  params: JsonObject | null;
  referrer?: string;
};

export type EventResponseBody = {
  cache: string;
};
