import isbot from 'isbot';
import { NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';

import { ApiError, HttpStatus } from '$/server/common/error';
import { getProjectById } from '$/server/services/project';
import { createSession, getSessionById } from '$/server/services/session';
import { SessionPayload, SessionRequest } from '$/server/types/session';
import { createUUID } from '$/server/utilities/crypto';
import { getClientInfo } from '$/server/utilities/parse-request';
import { parseToken } from '$/server/utilities/token';

export async function sessionMiddleware(
  req: SessionRequest,
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
    const session = await getSession(req);

    req.session = session;
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.httpStatus).send(error.message);
    }
    return res.status(500).send(error.message);
  }

  next();
}

async function getSession(req: SessionRequest): Promise<SessionPayload> {
  const { projectId, hostname, screen, language, token } = req.body.session;
  if (token) {
    try {
      const { sessionId, projectId } = parseToken(token) as SessionPayload;
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
  let session = await getSessionById(sessionId);
  if (!session) {
    session = await createSession({
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
