/**
 * @param duration seconds
 */
export function sleep(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration * 1000));
}
