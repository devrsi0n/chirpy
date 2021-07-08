import { cleanup, screen } from '@testing-library/react';

import Index, { strings } from '../../pages/index';
import { pageRender } from '../fixtures/render';

describe('Index page', () => {
  beforeEach(() => {
    pageRender(<Index />);
  });

  afterEach(() => {
    jest.clearAllMocks();
    return cleanup();
  });

  it('should render the hero text and call to actions', () => {
    expect(screen.queryByText(strings.heroTitle)).toBeInTheDocument();
    // TODO: expect some click actions
    const mainCallToAction = screen.getByText(strings.callToAction.main);
    expect(mainCallToAction).toBeInTheDocument();
  });
});
