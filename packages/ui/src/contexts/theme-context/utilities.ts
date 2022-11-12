import { ColorSeriesKey } from '@chirpy-dev/types';

export type CSSVariables = Array<[string, string]>;

type NestedObject = { [key: string]: string | NestedObject };

export function getThemeCSSVariablesString(theme: NestedObject): string {
  return getThemeCSSVariables(theme)
    .map(([key, value]) => `${key}: ${value};`)
    .join('\n');
}

/**
 * Support any depth level of nesting objects
 */
function getThemeCSSVariables(
  theme: NestedObject,
  prefix = '--tw',
): CSSVariables {
  const cssVariables: Array<[string, string]> = [];
  for (const [key, value] of Object.entries(theme)) {
    const cssVariableKey =
      prefix && key ? [prefix, key].join('-') : prefix || key;
    if (typeof value === 'string') {
      cssVariables.push([cssVariableKey, translateColor(value)]);
    } else if (typeof value === 'object' && value) {
      cssVariables.push(...getThemeCSSVariables(value, cssVariableKey));
    } else {
      throw new Error(`Unexpected theme value: ${value}`);
    }
  }
  return cssVariables;
}

/**
 * Unwrap hsl color to numbers, e.g. hsl(252 56.0% 57.5%) -> 252deg 56.0% 57.5%
 * Used by css variables
 * @param color
 */
function translateColor(color: string) {
  const [, hsl] = /hsl\((.+)\)/.exec(color) || [];
  if (hsl) {
    return hsl.replace(/,/g, '');
  }
  const [, hsla] = /hsla\((.+)\)/.exec(color) || [];
  // legacy color format, e.g. hsla(252, 56.0%, 57.5%, 0.75)
  return hsla;
}

/**
 * Get number to color map without key, for example
 * ```js
 * getColorMap({ red1: 'hsl(359, 100%, 99.4%)', }) == {
 * 1: 'hsl(359, 100%, 99.4%)',}
 * ```
 * @param color
 * @returns
 */
export function translateRadixColor(
  color: Record<string, string>,
): Record<ColorSeriesKey, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(color)) {
    const [, num] = /\w(\d+)/.exec(key) || [];
    result[100 * +num] = value;
  }
  return result;
}
