export const sleep = (duration: number) =>
  new Promise((resolve) => setTimeout(resolve, duration * 1000));
