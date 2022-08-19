export enum Metrics {
  "kiloMeters" = "в километрах",
  "lunar" = "в лунных орбитах",
}

export type MetricsKey = keyof typeof Metrics;
