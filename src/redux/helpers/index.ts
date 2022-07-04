export function sleep(timeout: number) {
  return new Promise<void>((resolve) => setTimeout(() => resolve(), timeout));
}

export type ValueOf<T> = T[keyof T];

export interface Action<T, P> {
  readonly type: T;
  readonly payload?: P;
}
