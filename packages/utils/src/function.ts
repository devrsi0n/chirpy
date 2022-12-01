export function noop() {
  return;
}

export type Noop = typeof noop;

export async function asyncNoop(): Promise<void> {
  return;
}

export type AsyncNoop = typeof asyncNoop;
