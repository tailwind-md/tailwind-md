export type DeepRequired<T extends Record<string, unknown>> = {
  [P in keyof T]-?: T[P] extends Record<string, unknown>
    ? DeepRequired<T[P]>
    : T[P];
};
