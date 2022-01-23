import { NextApiRequest, NextApiResponse } from 'next';

export const projectId = '2ba0f848-608e-488c-a483-f2e81c9d5e67';

export const defaultRequest = {
  headers: {
    'user-agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
    'X-Client-IP': '46.82.174.69',
  },
  body: {
    session: {
      projectId,
      hostname: 'localhost',
      screen: '2560x1440',
      language: 'en',
    },
  },
  query: {
    url: 'https://testing.com',
    projectId: 'testing-project-id',
    title: 'Page titlt',
  },
  env: {},
};

// function getMockApiReq(req: NextApiRequest) {
//   return merge({}, defaultRequest, );
// }

export const mockReq: NextApiRequest = {
  ...defaultRequest,
} as unknown as NextApiRequest;

export const mockRes: NextApiResponse = {} as unknown as NextApiResponse;

export const mockStatus = jest.fn().mockReturnValue(mockRes);
mockRes.status = mockStatus;
export const mockSend = jest.fn().mockReturnValue(mockRes);
mockRes.send = mockSend;
export const mockNext = jest.fn();
