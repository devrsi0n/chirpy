import { Theme } from '@chirpy-dev/types';
import {
  siteTheme,
  getThemeCSSVariablesString,
  translateRadixColor,
} from '@chirpy-dev/utils';
import { whiteA, blackA } from '@radix-ui/colors';
import * as React from 'react';

const siteColors = siteTheme.colors;
const FIXED_COLORS = {
  whitea: translateRadixColor(whiteA),
  blacka: translateRadixColor(blackA),
};

export type Selectors = {
  light: string;
  dark: string;
};

export function useThemeVariables(theme?: Theme, selectors?: Selectors) {
  const { light, dark } = {
    light: ':root',
    dark: ':root.dark',
    ...selectors,
  };
  const styles = React.useMemo(() => {
    const lightTheme = {
      colors: {
        ...FIXED_COLORS,
        ...siteColors.light,
        ...theme?.colors.light,
      },
    };
    const darkTheme = {
      colors: {
        ...siteColors.dark,
        ...theme?.colors.dark,
      },
    };
    return `${light}, ::before, ::after {
        ${getThemeCSSVariablesString(lightTheme)}
      }

       ${dark}, .dark ::before, .dark ::after {
        ${getThemeCSSVariablesString(darkTheme)}
      }
    `;
  }, [theme, light, dark]);
  return { styles };
}
