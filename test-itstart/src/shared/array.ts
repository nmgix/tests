export function replaceRange<T>(array: T[], from: number, limit: number, newItems: T[]): T[] {
  return [...array.slice(0, from), ...newItems, ...array.slice(from + limit)];
}
