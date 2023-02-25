import type {
  BaseColors,
  BaseReferencePalette,
  BaseColorScheme,
} from "$plugin/types";
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
    seedReferencePalette?: Partial<Record<BaseColors, string>>;
    custom?: Record<string, string>;
    scheme?: Partial<BaseColorScheme>;
  };

  emitReferenceClasses?: boolean;
};

const defaultOptions = {
  color: {
    seed: "#6750a4",
    scheme: {},
    seedReferencePalette: {},
  },
  emitReferenceClasses: false,
} satisfies Required<MaterialDesignOptions>;

type MaterialDesignTheme = {
  ref: { palette: BaseReferencePalette };
  sys: { color: BaseColorScheme };
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
    defaultOptions as Required<MaterialDesignOptions>,
    opts ?? {},
  );

  _mdt = deepMerge(
    {
      ref: {
        palette: createReferencePalette(opts.color.seed),
      },
      sys: {
        color: createColorScheme(),
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
