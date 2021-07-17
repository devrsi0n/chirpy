import { JsonObject } from 'type-fest';

import { TelemetrySessionRequest } from './telemetry-session';

export interface EventRequest extends TelemetrySessionRequest {
  body: TelemetrySessionRequest['body'] & {
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
