import { cleanup, render, screen } from '@testing-library/react';

import { SiteThemeProvider, useWidgetTheme, WidgetThemeProvider } from '..';
import { siteTheme } from '../site-theme';
import { translateHslColor } from '../utilities';

it('converts Radix hex colors to the HSL components used by themes', () => {
  expect(translateHslColor('#ff0000')).toBe('0 100% 50%');
  const alphaColor = translateHslColor('#ffffff80')!
    .split(',')
    .map((value) => Number.parseFloat(value));
  expect(alphaColor.slice(0, 3)).toEqual([0, 0, 100]);
  expect(alphaColor[3]).toBeCloseTo(128 / 255);
});

it('keeps saved HSL themes compatible', () => {
  expect(translateHslColor('hsl(252, 56%, 57.5%)')).toBe('252 56% 57.5%');
});

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
    expect(setTheme).toHaveBeenCalledWith(siteTheme);
  });

  it('should render the default site theme', async () => {
    render(
      <SiteThemeProvider>
        <MockSiteChild />
      </SiteThemeProvider>,
    );
    expect(screen.getByLabelText(siteLabel)).toBeInTheDocument();
  });
});

const setTheme = jest.fn();

function MockChild() {
  const { siteTheme: defaultTheme } = useWidgetTheme();
  setTheme(defaultTheme);
  return <div>children</div>;
}
const siteLabel = 'site-theme-child';
function MockSiteChild() {
  return <div aria-label={siteLabel}>site them child</div>;
}
