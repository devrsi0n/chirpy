import { merge } from 'lodash';

import * as projectModule from '$server/services/project';
import * as sessionModule from '$server/services/session';
import * as tokenModule from '$server/utilities/token';

import { sessionMiddleware } from '../session';

const projectId = '2ba0f848-608e-488c-a483-f2e81c9d5e67';
const defaultRequest = {
  headers: {
    'user-agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
    'X-Client-IP': '46.82.174.69',
  },
  body: {
    session: {
      projectId,
      hostname: 'totalk.dev',
      screen: '2560x1440',
      language: 'en',
    },
  },
};

const mockRes: $TsAny = {};
const mockStatus = jest.fn().mockReturnValue(mockRes);
mockRes.status = mockStatus;
const mockSend = jest.fn().mockReturnValue(mockRes);
mockRes.send = mockSend;
const mockNext = jest.fn();

describe('session middleware', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should mount session object to the request when has valid body', async () => {
    const mockGetProjectById = jest.spyOn(projectModule, 'getProjectById');
    mockGetProjectById.mockResolvedValue({
      id: 'random project id',
    });
    const mockGetSessionById = jest.spyOn(sessionModule, 'getSessionById');
    mockGetSessionById.mockResolvedValue({
      id: 'random session id',
    });
    const req: $TsAny = merge({}, defaultRequest);
    await sessionMiddleware(req, mockRes, mockNext);
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
    await sessionMiddleware(req, mockRes, mockNext);
    expect(req.session).toEqual(mockSession);
    expect(mockNext).toHaveBeenCalled();
  });

  describe('exceptions', () => {
    it('should send response with "bad request" with no user agent', async () => {
      const req = {
        headers: {},
      } as $TsAny;
      await sessionMiddleware(req, mockRes, mockNext);
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockSend.mock.calls[0][0].startsWith('Bad Request')).toBe(true);
    });

    it('should send response with "bad request" with no valid project id', async () => {
      const mockGetProjectById = jest.spyOn(projectModule, 'getProjectById');
      mockGetProjectById.mockResolvedValue(null as $TsAny);
      await sessionMiddleware(defaultRequest as $TsAny, mockRes, mockNext);
      expect(mockGetProjectById).toHaveBeenCalled();
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockSend.mock.calls[0][0].startsWith('Bad Request')).toBe(true);
    });

    it('should send response with ok with robot request', async () => {
      const req: $TsAny = merge({}, defaultRequest, {
        headers: {
          'user-agent':
            'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        },
      });
      await sessionMiddleware(req, mockRes, mockNext);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockSend.mock.calls[0][0].isbot).toBe(true);
    });
  });
});
