import { NextApiRequest } from 'next';

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
export type SessionRequestBody = {
  projectId: string;
  hostname: string;
  screen: string;
  language: string;
  token?: string;
};
