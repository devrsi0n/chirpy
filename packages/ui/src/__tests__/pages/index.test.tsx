import { cleanup, screen } from '@testing-library/react';

import { HomePage, strings } from '../../pages/home';
import { pageRender } from '../fixtures/page-render';

describe('Index page', () => {
  beforeEach(() => {
    pageRender(<HomePage buildDate={new Date().toISOString()} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
    return cleanup();
  });

  it('should render the hero text and call to actions', () => {
    expect(screen.queryByText(strings.heroTitle)).toBeInTheDocument();
  });

  it('should render the pricing', () => {
    expect(screen.getByText('Simple, usage based pricing')).toBeInTheDocument();
  });
});
