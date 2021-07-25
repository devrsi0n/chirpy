import { NextApiRequest } from 'next';

export type AnonymousSessionPayload = {
  sessionId: string;
  projectId: string;
};

export interface AnonymousSessionRequest extends NextApiRequest {
  session?: AnonymousSessionPayload;
  body: {
    session: AnonymousSessionRequestBody;
  };
}

export type AnonymousSessionRequestBody = {
  projectId: string;
  hostname: string;
  screen: string;
  language: string;
  token?: string;
};
