import * as radixColors from '@radix-ui/colors';
import * as React from 'react';

import { siteDefaultTheme } from './siteDefaultTheme';
import { getThemeCSSVariablesString, translateRadixColor } from './utilities';

const colors = siteDefaultTheme.colors;
const FIXED_COLORS = {
  whitea: translateRadixColor(radixColors.whiteA),
  blacka: translateRadixColor(radixColors.blackA),
};

export function useSiteTheme() {
  const styles = React.useMemo(() => {
    const lightTheme = {
      colors: {
        ...FIXED_COLORS,
        ...colors.light,
      },
    };
    const darkTheme = {
      colors: {
        ...FIXED_COLORS,
        ...colors.dark,
      },
    };
    return `body {
        ${getThemeCSSVariablesString(lightTheme)}
      }
    
       .dark body {
        ${getThemeCSSVariablesString(darkTheme)}
      }
    `;
  }, []);
  return { styles };
}
