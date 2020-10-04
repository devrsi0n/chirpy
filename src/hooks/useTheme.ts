import * as React from 'react';
import { ThemeContext, ThemeContextType } from '../context/ThemeContext';

export function useTheme(): ThemeContextType {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error(`'useTheme' must be used within a ThemeContext`);
  }
  return context;
}
