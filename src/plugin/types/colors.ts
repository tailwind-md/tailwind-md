export type Tones =
  | 0
  | 10
  | 20
  | 30
  | 40
  | 50
  | 60
  | 70
  | 80
  | 90
  | 95
  | 99
  | 100;

export type TonalPalette = Record<Tones, string>;

export type BaseAccentColors = "primary" | "secondary" | "tertiary";

export type BaseSemanticColors = "success" | "warning" | "error";

export type BaseNeutralColors = "neutral" | "neutralVariant";

export type BaseColors =
  | BaseAccentColors
  | BaseSemanticColors
  | BaseNeutralColors;

export type AccentColor<AccentColor extends string> = Record<
  | `${AccentColor}`
  | `on${Capitalize<AccentColor>}`
  | `${AccentColor}Container`
  | `on${Capitalize<AccentColor>}Container`,
  string
>;

export type BaseReferenceColorPalatte = Record<BaseColors, TonalPalette>;

export type BaseSystemColorPalatte = AccentColor<
  "primary" | "secondary" | "tertiary" | "success" | "warning" | "error"
>;
