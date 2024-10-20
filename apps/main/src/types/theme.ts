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
  | '900';

export type Colors = {
  primary?: {
    [k in ColorSeriesKey]: CSS.Property.Color;
  };
  bg?: CSS.Property.Color;
};

export type Theme = {
  colors: {
    light: Colors;
    dark: Colors;
  };
};

export type ResolvedColorMode = 'dark' | 'light';
export type ColorMode = ResolvedColorMode | 'system';
