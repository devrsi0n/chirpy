import { render, screen } from '@testing-library/react';

import Post, { getStaticPaths, getStaticProps } from '$/pages/blog/[...slug]';

describe('Blog post', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the title', async () => {
    const { paths } = await getStaticPaths({} as any);
    expect(Array.isArray(paths)).toBe(true);
    const staticProps = await getStaticProps({
      params: {
        slug: ['open-source'],
      },
    });
    render(<Post {...(staticProps as any).props} />);
    expect(screen.getByText(/\S+ open source/)).toBeTruthy();
  });
});
