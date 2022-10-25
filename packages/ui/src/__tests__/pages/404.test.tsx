import { cleanup, screen } from '@testing-library/react';

import { Custom404 } from '../../pages/404';
import { pageRender } from '../fixtures/page-render';

describe('Index page', () => {
  beforeEach(() => {
    pageRender(<Custom404 />);
  });

  afterEach(() => {
    jest.clearAllMocks();
    return cleanup();
  });

  it('should render the title', () => {
    expect(screen.queryByText(/page not found/i)).toBeInTheDocument();
  });
});
