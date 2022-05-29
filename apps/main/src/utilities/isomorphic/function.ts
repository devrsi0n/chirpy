export function noop() {
  //
}

export function asyncNoop(): Promise<void> {
  return Promise.resolve();
}
