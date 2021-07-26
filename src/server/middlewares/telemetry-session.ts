import isbot from 'isbot';
import { NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';

import { ApiError, HttpStatus } from '$/server/common/error';
import {
  createAnonymousSession,
  getAnonymousSessionById,
} from '$/server/services/anonymous-session';
import { getProjectById } from '$/server/services/project';
import { AnonymousSessionPayload, AnonymousSessionRequest } from '$/server/types/anonymous-session';
import { createUUID } from '$/server/utilities/crypto';
import { getClientInfo } from '$/server/utilities/parse-request';
import { parseToken } from '$/server/utilities/token';

export async function telemetrySessionMiddleware(
  req: AnonymousSessionRequest,
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
  const session = await getTelemetrySession(req);
  req.session = session;
  next();
}

async function getTelemetrySession(req: AnonymousSessionRequest): Promise<AnonymousSessionPayload> {
  const { projectId, hostname, screen, language, token } = req.body.session;
  if (token) {
    try {
      const { sessionId, projectId } = parseToken(token) as AnonymousSessionPayload;
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
  let session = await getAnonymousSessionById(sessionId);
  if (!session) {
    session = await createAnonymousSession({
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
