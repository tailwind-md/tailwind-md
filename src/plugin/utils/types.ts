export type DeepRequired<T extends Record<string, unknown>> = {
  [P in keyof T]-?: T[P] extends Record<string, unknown>
    ? DeepRequired<T[P]>
    : T[P];
};

export type DeepPartial<T extends Record<string, unknown>> = {
  [P in keyof T]+?: T[P] extends Record<string, unknown>
    ? DeepPartial<T[P]>
    : T[P];
};

export type DeepReadOnly<T extends Record<string, unknown>> = {
  +readonly [P in keyof T]: T[P] extends Record<string, unknown>
    ? DeepPartial<T[P]>
    : T[P];
};
