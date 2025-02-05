export function fillArr<T>(amount: number, fill?: T) {
  return Array(amount)
    .fill(fill)
    .map(() => fill ?? (null as unknown as T));
}
