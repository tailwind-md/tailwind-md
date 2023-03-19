import { createEffect, createSignal } from "solid-js";
import { Color } from "./color";
import { Elevation } from "./elevation";
import { Shape } from "./shape";
import { Typography } from "./typography";

export default function Showcase() {
  const [dark, setDark] = createSignal(false);

  createEffect(() => {
    document.body.dataset["themeMode"] = dark() ? "dark" : "light";
  });

  return (
    <div
      class="
        dark:selection:bg-white 
        dark:selection:text-black 
        material
        selection:bg-black
        selection:text-white
      "
    >
      <header
        class="
          sticky 
          top-0 
          flex 
          w-full 
          flex-row 
          items-center 
          gap-4 
          p-8 
          py-6 
          text-on-surface 
          material 
          elevation-level5 
          container-surface 
          surface-overlay-surface-tint/elevation-surface-tint
        "
      >
        <h1
          class="
            text-headline-small 
            font-medium 
            uppercase 
            text-on-background
          "
        >
          Material Design 3
        </h1>

        <button
          class="
            h-10
            rounded-full
            px-6
            text-label-large 
            text-on-primary
            material 
            container-primary
            state-layer-on-primary/state-layer
            hover:state-hovered
            focus:state-focused
            active:state-pressed
          "
          onClick={() => setDark((prev) => !prev)}
        >
          Toggle dark mode
        </button>
      </header>

      <div class="flex flex-col gap-12 p-8">
        <Color />
        <Elevation />
        <Shape />
        <Typography />
      </div>
    </div>
  );
}
