import * as CSS from 'csstype';

export type ObjectOf<T> = { [K: string]: T | ObjectOf<T> };
export type ColorSeriesKey =
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | '1000'
  | '1100'
  | '1200';

export type ColorSeries = {
  [k in ColorSeriesKey]: CSS.Property.Color;
};
export type Colors = {
  primary?: ColorSeries;
  bg?: CSS.Property.Color;
  gray?: ColorSeries;
  pink?: ColorSeries;
};

export type Theme = {
  colors: {
    light: Colors;
    dark: Colors;
  };
};

export type ResolvedColorMode = 'dark' | 'light';
export type ColorMode = ResolvedColorMode | 'system';
