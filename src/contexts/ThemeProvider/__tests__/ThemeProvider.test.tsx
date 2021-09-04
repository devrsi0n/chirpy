import { cleanup, render } from '@testing-library/react';

import { ThemeProvider, useTheme, SiteThemeProvider } from '..';
import { siteDefaultTheme } from '../siteDefaultTheme';

describe('ThemeProvider', () => {
  afterEach(() => {
    jest.clearAllMocks();
    return cleanup();
  });

  it('should render the default theme', async () => {
    render(
      <ThemeProvider>
        <MockChild />
      </ThemeProvider>,
    );
    expect(setTheme).toHaveBeenCalledWith(siteDefaultTheme);
  });

  it('should render the default site theme', async () => {
    render(
      <SiteThemeProvider>
        <MockSiteChild />
      </SiteThemeProvider>,
    );
    expect(setSiteTheme).toHaveBeenCalledWith(
      expect.objectContaining({
        colors: expect.any(Object),
      }),
    );
  });
});

const setTheme = jest.fn();

function MockChild() {
  const { theme } = useTheme();
  setTheme(theme);
  return <div>children</div>;
}

const setSiteTheme = jest.fn();
function MockSiteChild() {
  const { theme } = useTheme();
  setSiteTheme(theme);
  return <div>children</div>;
}
