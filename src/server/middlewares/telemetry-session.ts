import isbot from 'isbot';
import { NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';

import { ApiError, HttpStatus } from '$/server/common/error';
import { getProjectById } from '$/server/services/project';
import {
  createTelemetrySession,
  getTelemetrySessionById,
} from '$/server/services/telemetry-session';
import { TelemetrySessionPayload, TelemetrySessionRequest } from '$/server/types/telemetry-session';
import { createUUID } from '$/server/utilities/crypto';
import { getClientInfo } from '$/server/utilities/parse-request';
import { parseToken } from '$/server/utilities/token';

export async function telemetrySessionMiddleware(
  req: TelemetrySessionRequest,
  res: NextApiResponse,
  next: NextHandler,
): Promise<void> {
  const userAgent = req.headers['user-agent'];
  if (!userAgent) {
    return res.status(400).send('Bad Request, no user agent');
  }
  if (isbot(userAgent)) {
    return res.status(200).send({ isbot: true });
  }
  try {
    const session = await getTelemetrySession(req);

    req.session = session;
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.httpStatus).send(error.message);
    }
    return res.status(500).send(error.message);
  }

  next();
}

async function getTelemetrySession(req: TelemetrySessionRequest): Promise<TelemetrySessionPayload> {
  const { projectId, hostname, screen, language, token } = req.body.session;
  if (token) {
    try {
      const { sessionId, projectId } = parseToken(token) as TelemetrySessionPayload;
      if (sessionId && projectId) {
        return { sessionId, projectId };
      }
    } catch (error) {
      console.warn(`invalid token`, error);
    }
  }
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(HttpStatus.BAD_REQUEST, `Bad Request, invalid project id: ${projectId}`);
  }
  const { userAgent, browser, os, ip, country, device } = await getClientInfo(req, { screen });
  const sessionId = createUUID(projectId, hostname, ip, userAgent, os);
  let session = await getTelemetrySessionById(sessionId);
  if (!session) {
    session = await createTelemetrySession({
      id: sessionId,
      projectId,
      hostname,
      language,
      os,
      screen,
      device,
      country,
      browser,
    });
  }

  return {
    sessionId,
    projectId,
  };
}
