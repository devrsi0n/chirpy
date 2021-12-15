import { cleanup, render } from '@testing-library/react';

import { appName, comment } from '../comment-bootstrapper';

describe('comment', () => {
  beforeEach(() => {
    render(
      <div>
        <div {...{ [`data-${appName}-domain`]: 'test.com' }} />
        <div {...{ [`data-${appName}-comment`]: 'true' }} />
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
