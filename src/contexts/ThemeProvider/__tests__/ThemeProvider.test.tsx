import { cleanup, render } from '@testing-library/react';

import { WidgetThemeProvider, useWidgetTheme, SiteThemeProvider } from '..';
import { siteDefaultTheme } from '../siteDefaultTheme';

describe('ThemeProvider', () => {
  afterEach(() => {
    jest.clearAllMocks();
    return cleanup();
  });

  it('should render the default theme', async () => {
    render(
      <WidgetThemeProvider>
        <MockChild />
      </WidgetThemeProvider>,
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
  const { theme } = useWidgetTheme();
  setTheme(theme);
  return <div>children</div>;
}

const setSiteTheme = jest.fn();
function MockSiteChild() {
  const { theme } = useWidgetTheme();
  setSiteTheme(theme);
  return <div>children</div>;
}
