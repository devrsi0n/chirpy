import { cleanup, render } from '@testing-library/react';

import { comment } from '../bootstrapper/comment/comment-bootstrapper';

describe('comment', () => {
  beforeEach(() => {
    render(
      <div>
        <div {...{ [`data-chirpy-domain`]: 'test.com' }} />
        <div {...{ [`data-chirpy-comment`]: 'true' }} />
      </div>,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    return cleanup();
  });

  it('should render a iframe', async () => {
    await comment();
    const iframe = document.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
  });
});
