export type CSSVariables = Array<[string, string]>;

type NestedObject = { [key: string]: string | NestedObject };

/**
 * Support any depth level of nesting objects
 */
function getThemeCSSVariables(theme: NestedObject, prefix = '--tw'): CSSVariables {
  const cssVariables: Array<[string, string]> = [];
  for (const [key, value] of Object.entries(theme)) {
    const cssVariableKey = prefix && key ? [prefix, key].join('-') : prefix || key;
    if (typeof value === 'string') {
      cssVariables.push([cssVariableKey, value]);
    } else if (typeof value === 'object' && value) {
      cssVariables.push(...getThemeCSSVariables(value, cssVariableKey));
    } else {
      throw new Error(`Unexpected theme value: ${value}`);
    }
  }
  return cssVariables;
}

export function getThemeCSSVariablesString(theme: NestedObject): string {
  return getThemeCSSVariables(theme)
    .map(([key, value]) => `${key}: ${value};`)
    .join('\n');
}

export function translateRadixColor(color: Record<string, string>) {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(color)) {
    const [, num] = /\w(\d+)/.exec(key)!;
    result[100 * +num] = value;
  }
  return result;
}
