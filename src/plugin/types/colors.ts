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

export type SystemKeyColor<AccentColor extends string> = Record<
  | `${AccentColor}`
  | `on${Capitalize<AccentColor>}`
  | `${AccentColor}Container`
  | `on${Capitalize<AccentColor>}Container`,
  string
>;

export type BaseSystemNeutralColors = {
  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;
  background: string;
  onBackground: string;
  outline: string;
  outlineVariant: string;
};

export type BaseSystemKeyColors =
  | SystemKeyColor<"primary">
  | SystemKeyColor<"secondary">
  | SystemKeyColor<"tertiary">
  | SystemKeyColor<"success">
  | SystemKeyColor<"warning">
  | SystemKeyColor<"error">;

export type BaseSystemExtraColors = {
  scrim: string;
  shadow: string;
  surfaceTint: string;
  inversePrimary: string;
  inverseSurface: string;
  inverseOnSurface: string;
  black: string;
  white: string;
};

export type BaseReferencePalette = Record<BaseColors, TonalPalette>;

export type BaseColorScheme = BaseSystemKeyColors &
  BaseSystemNeutralColors &
  BaseSystemExtraColors;
