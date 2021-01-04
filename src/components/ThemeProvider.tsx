import * as React from 'react';
import { useTheme } from 'next-themes';
import * as CSS from 'csstype';

import { ITheme, Colors, ObjectOf } from '$/types/theme.type';

export type ThemeProviderProps = {
  children: React.ReactNode;
  colorModes: ITheme;
};

export function ThemeProvider(props: ThemeProviderProps): JSX.Element {
  // Set theme CSS variables
  React.useEffect(() => {
    const style = document.createElement('style');
    style.appendChild(
      document.createTextNode(`.light {
      ${getColorModeCSSVariable(props.colorModes.light)
        .map(([key, value]) => `--colors-${key}: ${value};`)
        .join('\n')}
      }\n`),
    );
    style.appendChild(
      document.createTextNode(`.dark {
      ${getColorModeCSSVariable(props.colorModes.dark)
        .map(([key, value]) => `--colors-${key}: ${value};`)
        .join('\n')}
      }\n`),
    );

    document.head.appendChild(style);
  }, [props.colorModes.light, props.colorModes.dark]);

  return <>{props.children}</>;
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
