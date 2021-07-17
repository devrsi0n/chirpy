import { NextApiRequest } from 'next';

export type TelemetrySessionPayload = {
  sessionId: string;
  projectId: string;
};

export interface TelemetrySessionRequest extends NextApiRequest {
  session?: TelemetrySessionPayload;
  body: {
    session: TelemetrySessionRequestBody;
  };
}

export type TelemetrySessionRequestBody = {
  projectId: string;
  hostname: string;
  screen: string;
  language: string;
  token?: string;
};
