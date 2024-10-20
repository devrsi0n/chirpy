import { Theme } from '@chirpy-dev/types';
import { blackA, whiteA } from '@radix-ui/colors';
import * as React from 'react';

import { siteTheme } from './site-theme';
import { getThemeCSSVariablesString, translateRadixColor } from './utilities';

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
    // Ignore site background, default widget background is transparent
    const { bg: _, ...lightColors } = siteColors.light;
    const { bg: __, ...darkColors } = siteColors.dark;
    const lightTheme = {
      colors: {
        ...FIXED_COLORS,
        ...lightColors,
        ...theme?.colors.light,
      },
    };
    const darkTheme = {
      colors: {
        ...darkColors,
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
