export enum Metrics {
  "kiloMeters" = "в километрах",
  "lunar" = "в лунных орбитах",
}

export type MetricsKey = keyof typeof Metrics;

export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
