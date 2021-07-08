import { cleanup, render } from '@testing-library/react';

import { appName, comment } from '../comment';

describe('comment', () => {
  beforeEach(() => {
    render(
      <div>
        <div {...{ [`data-${appName}-pid`]: 'testing-project-id' }} />
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
