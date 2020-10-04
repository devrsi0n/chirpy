import * as React from 'react';

import { ColorMode } from '../types/theme.type';

export const ThemeContext = React.createContext<ThemeContextType>({
  isDarkMode: false,
  colorMode: 'System',
  setColorMode: (colorMode: ColorMode) => {
    console.error(`Shouldn't exist setColorMode function`);
  },
});

export type ThemeContextType = {
  isDarkMode: boolean;
  colorMode: ColorMode;
  setColorMode: (colorMode: ColorMode) => void;
};
