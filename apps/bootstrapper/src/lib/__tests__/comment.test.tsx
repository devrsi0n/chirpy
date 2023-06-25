import { cleanup, render } from '@testing-library/react';

import { initCommentWidget } from '../comment';

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
    await initCommentWidget();
    const iframe = document.querySelector('iframe');
    expect(iframe).toBeTruthy();
  });
});
