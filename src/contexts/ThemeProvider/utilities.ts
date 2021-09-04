export type CSSVariables = Array<[string, string]>;

type NestedObject = { [key: string]: string | NestedObject };

/**
 * Support any depth level of nesting objects
 */
export function getThemeCSSVariables(theme: NestedObject, prefix: string): CSSVariables {
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
