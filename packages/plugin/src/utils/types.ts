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

export type DeepMerge<
  T1 extends Record<string, unknown>,
  T2 extends Record<string, unknown>
> = {
  [P in keyof T1 | keyof T2]: P extends Record<string, unknown>
    ? never
    : (T1 & T2)[P];
};
