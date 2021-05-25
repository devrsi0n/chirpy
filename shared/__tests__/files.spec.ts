import path from 'path';

import { getDirectories } from '../files';

jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn().mockImplementation((filename: string) => {
      if (filename.endsWith('meta.json')) {
        return Promise.resolve(
          JSON.stringify({
            directories: [
              'get-started.mdx',
              'features/theme.mdx',
              'features/third-party-integrating.mdx',
              'self-hosted.mdx',
            ],
          }),
        );
      }
      return Promise.resolve(`---\ntitle: '${filename}'\n---\n\n#${filename}\n\n${filename}.\n`);
    }),
  },
}));

describe('files', () => {
  it('should return correct directories', async () => {
    const directories = await getDirectories('docs', '/docs');
    console.log(JSON.stringify(directories, null, 2));
    const root = path.resolve(__dirname, '../../');
    expect(directories).toEqual([
      {
        title: `${root}/posts/docs/get-started.mdx`,
        route: '/docs/get-started',
      },
      {
        title: 'features',
        children: [
          {
            title: `${root}/posts/docs/features/theme.mdx`,
            route: '/docs/features/theme',
          },
          {
            title: `${root}/posts/docs/features/third-party-integrating.mdx`,
            route: '/docs/features/third-party-integrating',
          },
        ],
      },
      {
        title: `${root}/posts/docs/self-hosted.mdx`,
        route: '/docs/self-hosted',
      },
    ]);
  });
});
