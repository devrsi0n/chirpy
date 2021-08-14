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
        slug: ['totalk-1-0-released'],
      },
    });
    render(<Post {...(staticProps as any).props} />);
    expect(screen.getByText('Totalk 1.0 released')).toBeTruthy();
  });
});
