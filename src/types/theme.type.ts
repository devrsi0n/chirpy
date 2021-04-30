import * as CSS from 'csstype';

export type ObjectOf<T> = { [K: string]: T | ObjectOf<T> };

export type Colors = {
  primary: {
    [k: string]: CSS.Property.Color;
  };
};

export type Theme = {
  colors: Colors;
};

export type ColorMode = 'dark' | 'light' | 'system';
