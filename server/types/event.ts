import { EventRequestBody } from '$shared/types/event';

import { SessionRequest } from './session';

export interface EventRequest extends SessionRequest {
  body: SessionRequest['body'] & {
    event: EventRequestBody;
  };
}
