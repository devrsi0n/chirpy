import { getFrontMatters } from '../front-matter';

const title = 'Get started';
jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  promises: {
    readFile: jest
      .fn()
      .mockResolvedValue(`---\ntitle: '${title}'\n---\n\n# Get started\n\nAccess totalk api.\n`),
  },
}));

describe('front-matter', () => {
  it('should return correct title', async () => {
    const matter = await getFrontMatters('get-started.mdx');
    expect(matter.data.title).toBe(title);
  });
});
