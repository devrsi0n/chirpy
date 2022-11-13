export function getColorFromCssVariable(variable: string): string {
  if (typeof getComputedStyle !== 'function') {
    return '';
  }
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();
}
