/**
 * Creates an object composed of the picked `object` properties.
 * @example
 *
 * const object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * pick(object, ['a', 'c']);
 * // => { 'a': 1, 'c': 3 }
 */
export function pick<T extends Record<string, unknown>, U extends keyof T>(
  obj: T,
  ...keys: Array<U>
): Pick<T, U> {
  return keys.reduce((acc, key) => {
    acc[key] = obj[key];
    return acc;
  }, {} as Pick<T, U>);
}
