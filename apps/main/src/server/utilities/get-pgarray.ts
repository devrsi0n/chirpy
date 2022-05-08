export function getPGArray(array: string[]): string {
  return `{${array.join(',')}}`;
}
