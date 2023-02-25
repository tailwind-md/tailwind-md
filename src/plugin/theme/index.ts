import type {
  BaseColor,
  ReferencePalette as ReferencePalette,
  SystemColorScheme as SystemColorScheme,
  SystemStates,
} from "$plugin/types";
import type { Shape } from "$plugin/types/shape";
import {
  createReferencePalette,
  createColorScheme,
  deepEqual,
  deepMerge,
  objectHexToRGBSpaceSeparated,
  createCustomReferencePalatte,
  createCustomColors,
} from "$plugin/utils";

export type MaterialDesignOptions = {
  color?: {
    seed?: string;
    seedReferencePalette?: Partial<Record<BaseColor, string>>;
    custom?: Record<string, string>;
    scheme?: Partial<SystemColorScheme>;
  };

  state?: Partial<SystemStates>;

  shape?: Partial<Shape>;

  emitReferenceClasses?: boolean;
};

export const materialDefaultOptions = {
  color: {
    seed: "#6750a4",
    scheme: {},
    seedReferencePalette: {},
  },
  state: {
    hover: {
      contentOpacity: "100%",
      stateLayerOpacity: "8%",
      containerOpacity: "100%",
    },
    focus: {
      contentOpacity: "100%",
      stateLayerOpacity: "12%",
      containerOpacity: "100%",
    },
    pressed: {
      contentOpacity: "100%",
      stateLayerOpacity: "12%",
      containerOpacity: "100%",
    },
    dragged: {
      contentOpacity: "100%",
      stateLayerOpacity: "16%",
      containerOpacity: "100%",
    },
    disabled: {
      contentOpacity: "38%",
      stateLayerOpacity: "100%",
      containerOpacity: "12%",
    },
  },
  shape: {
    corner: {
      none: "0px",
      extraSmall: "4px",
      small: "8px",
      medium: "12px",
      large: "16px",
      extraLarge: "28px",
      full: "9999px",
    },
  },
  emitReferenceClasses: false,
} satisfies Required<MaterialDesignOptions>;

type MaterialDesignTheme = {
  ref: { palette: ReferencePalette };
  sys: { color: SystemColorScheme; state: SystemStates; shape: Shape };
};

let _mdt: MaterialDesignTheme | undefined;
let _lastOpts: MaterialDesignOptions | undefined;

export function materialDesignTheme(
  opts: MaterialDesignOptions,
): MaterialDesignTheme {
  if (_mdt && deepEqual(_lastOpts, opts ?? {})) {
    return _mdt;
  }

  _lastOpts = opts;

  opts = deepMerge(
    materialDefaultOptions as Required<MaterialDesignOptions>,
    opts ?? {},
  );

  _mdt = deepMerge(
    {
      ref: {
        palette: createReferencePalette(opts.color.seed),
      },
      sys: {
        color: createColorScheme(),
        state: opts.state,
        shape: opts.shape,
      },
    },
    {
      ref: {
        palette: createCustomReferencePalatte(
          opts.color?.seedReferencePalette ?? {},
        ),
      },
    },
    { sys: { color: objectHexToRGBSpaceSeparated(opts.color.scheme) } },
    { ...createCustomColors(opts.color.custom) },
  ) as unknown as MaterialDesignTheme;

  return _mdt;
}
