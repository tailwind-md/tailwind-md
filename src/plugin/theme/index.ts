import { argbFromHex, CorePalette } from "$plugin/material-color";
import type {
  BaseColors,
  BaseReferencePalette,
  BaseSystemColors,
} from "$plugin/types";
import {
  corePaletteToReferencePalette,
  createSystemColors,
  deepEqual,
  deepMerge,
  objectHexToRGBSpaceSeparated,
} from "$plugin/utils";

export type MaterialDesignOptions = {
  systemColors?: Partial<BaseSystemColors>;

  seedReferencePalette?: { extended?: Record<string, string> } & Partial<
    Record<BaseColors, string>
  >;

  seedColor?: string;
  emitReferenceClasses?: boolean;
};

const defaultOptions: Required<MaterialDesignOptions> = {
  seedColor: "#6750a4",
  systemColors: {},
  seedReferencePalette: {},
  emitReferenceClasses: false,
};

type MaterialDesignTheme = {
  ref: { palette: BaseReferencePalette };
  sys: { color: BaseSystemColors };
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

  opts = deepMerge(defaultOptions, opts ?? {});
  const corePalette = CorePalette.of(argbFromHex(opts.seedColor));

  _mdt = deepMerge(
    {
      ref: {
        palette: corePaletteToReferencePalette(corePalette),
      },
      sys: {
        color: createSystemColors(),
      },
    },
    { sys: { color: objectHexToRGBSpaceSeparated(opts.systemColors) } },
  ) as unknown as MaterialDesignTheme;

  return _mdt;
}
