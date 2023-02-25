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

export type AccentColor = "primary" | "secondary" | "tertiary";

export type SemanticColor = "success" | "warning" | "error";

export type NeutralColor = "neutral" | "neutralVariant";

export type BaseColor = AccentColor | SemanticColor | NeutralColor;

export type SystemKeyColor<AccentColor extends string> = Record<
  | `${AccentColor}`
  | `on${Capitalize<AccentColor>}`
  | `${AccentColor}Container`
  | `on${Capitalize<AccentColor>}Container`,
  string
>;

export type SystemNeutralColors = {
  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;
  background: string;
  onBackground: string;
  outline: string;
  outlineVariant: string;
};

export type SystemKeyColors =
  | SystemKeyColor<"primary">
  | SystemKeyColor<"secondary">
  | SystemKeyColor<"tertiary">
  | SystemKeyColor<"success">
  | SystemKeyColor<"warning">
  | SystemKeyColor<"error">;

export type SystemExtraColors = {
  scrim: string;
  shadow: string;
  surfaceTint: string;
  inversePrimary: string;
  inverseSurface: string;
  inverseOnSurface: string;
  black: string;
  white: string;
};

export type ReferencePalette = Record<BaseColor, TonalPalette>;

export type SystemColorScheme = SystemKeyColors &
  SystemNeutralColors &
  SystemExtraColors;
