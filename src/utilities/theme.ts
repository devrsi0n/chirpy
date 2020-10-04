import * as CSS from 'csstype';

import { ColorMode, ITheme, Colors, ObjectOf } from '$/types/theme.type';

const THEME_KEY = 'ThemeColorMode';

export function getThemeColorMode(isOnMount: boolean): ColorMode {
  const savedMode: ColorMode = localStorage?.getItem(THEME_KEY) as ColorMode;
  if (['Dark', 'Light', 'System'].includes(savedMode)) {
    return savedMode;
  }
  if (isOnMount) {
    return 'System';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'Dark' : 'Light';
}

export function saveThemeColorMode(mode: ColorMode): void {
  window.localStorage.setItem(THEME_KEY, mode);
}

export type ThemeCSSVariables = {
  light: CSSVariables;
  dark: CSSVariables;
};

export function getThemeCSSVariables(theme: ITheme): ThemeCSSVariables {
  const { light, dark } = theme;
  return {
    light: getColorModeCSSVariable(light),
    dark: getColorModeCSSVariable(dark),
  };
}

export type CSSVariables = Array<[string, string]>;

function getColorModeCSSVariable(colors: Colors, prefix = ''): CSSVariables {
  const cssVariables: Array<[string, string]> = [];
  for (const [key, value] of Object.entries(colors)) {
    if (typeof value === 'string') {
      // Handle { primary: { '': '#123' } }
      const cssVariableKey = prefix && key ? [prefix, key].join('-') : prefix || key;
      cssVariables.push([cssVariableKey, value]);
    } else if (typeof value === 'object' && value) {
      cssVariables.push(...getColorModeCSSVariable(value as ObjectOf<CSS.Property.Color>, key));
    } else {
      throw new Error(`Unexpected color mode value: ${value}`);
    }
  }
  return cssVariables;
}
