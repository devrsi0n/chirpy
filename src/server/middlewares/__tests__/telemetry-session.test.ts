import { merge } from 'lodash';

import {
  defaultRequest,
  mockNext,
  mockRes,
  mockSend,
  mockStatus,
  projectId,
} from '$/__tests__/mocks/mockApi';
import * as sessionModule from '$/server/services/anonymous-session';
import * as projectModule from '$/server/services/project';
import * as tokenModule from '$/server/utilities/token';

import { telemetrySessionMiddleware } from '../telemetry-session';

describe('telemetry session middleware', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should mount session object to the request when has valid body', async () => {
    const mockGetProjectById = jest.spyOn(projectModule, 'getProjectById');
    mockGetProjectById.mockResolvedValue({
      id: 'random project id',
    });
    const mockGetSessionById = jest.spyOn(sessionModule, 'getAnonymousSessionById');
    mockGetSessionById.mockResolvedValue({
      id: 'random session id',
    });
    const req: $TsAny = merge({}, defaultRequest);
    await telemetrySessionMiddleware(req, mockRes, mockNext);
    expect(req.session.projectId).toEqual(projectId);
    expect(mockNext).toHaveBeenCalled();
  });

  it('should mount session object to the request when has valid cache', async () => {
    const mockSession = {
      sessionId: 'mock session',
      projectId: 'mock project',
    };
    jest.spyOn(tokenModule, 'parseToken').mockImplementation(() => mockSession);
    const req: $TsAny = merge({}, defaultRequest, {
      body: {
        session: {
          token: 'random token',
        },
      },
    });
    await telemetrySessionMiddleware(req, mockRes, mockNext);
    expect(req.session).toEqual(mockSession);
    expect(mockNext).toHaveBeenCalled();
  });

  describe('exceptions', () => {
    it('should send response with "bad request" with no user agent', async () => {
      const req = {
        headers: {},
      } as $TsAny;
      await telemetrySessionMiddleware(req, mockRes, mockNext);
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockSend.mock.calls[0][0].startsWith('Bad Request')).toBe(true);
    });

    it('should send response with "bad request" with no valid project id', async () => {
      const mockGetProjectById = jest.spyOn(projectModule, 'getProjectById');
      mockGetProjectById.mockResolvedValue(null as $TsAny);
      await expect(
        telemetrySessionMiddleware(defaultRequest as $TsAny, mockRes, mockNext),
      ).rejects.toMatchObject({
        httpStatus: 400,
        message: expect.stringContaining('Bad Request'),
      });
      expect(mockGetProjectById).toHaveBeenCalled();
    });

    it('should send response with ok with robot request', async () => {
      const req: $TsAny = merge({}, defaultRequest, {
        headers: {
          'user-agent':
            'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        },
      });
      await telemetrySessionMiddleware(req, mockRes, mockNext);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockSend.mock.calls[0][0].isbot).toBe(true);
    });
  });
});
