import * as CSS from 'csstype';

export type ObjectOf<T> = { [K: string]: T | ObjectOf<T> };

export type Colors = {
  [k: string]: CSS.Property.Color | ObjectOf<CSS.Property.Color>;
};

export interface ITheme {
  light: Colors;
  dark: Colors;
}

export type ColorMode = 'dark' | 'light' | 'system';
