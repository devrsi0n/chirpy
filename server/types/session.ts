import { NextApiRequest } from 'next';

import { SessionRequestBody } from '$shared/types/session';

export type SessionPayload = {
  sessionId: string;
  projectId: string;
};

export interface SessionRequest extends NextApiRequest {
  session?: SessionPayload;
  body: {
    session: SessionRequestBody;
  };
}
