import { getFrontMatters } from '../front-matter';

jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  promises: {
    readFile: jest
      .fn()
      .mockResolvedValue(`---\ntitle: 'Get started'\n---\n\n# Get started\n\nAccess api.\n`),
  },
}));

describe('front-matter', () => {
  it('should return correct title', async () => {
    const matter = await getFrontMatters('get-started.mdx');
    expect(matter.data.title).toBe('Get started');
  });
});
