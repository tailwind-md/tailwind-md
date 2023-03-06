<script lang="ts">
  import Color from "$components/Color.svelte";
  import Elevation from "$components/Elevation.svelte";
  import Shape from "$components/Shape.svelte";
  import Typography from "$components/Typography.svelte";
  import "./app.postcss";

  let dark = false;

  $: document.body.dataset.themeMode = dark ? "dark" : "light";
</script>

<div
  class="material selection:bg-black selection:text-white dark:selection:bg-black dark:selection:text-white"
>
  <header
    class="w-full sticky top-0 text-on-surface p-8 py-6 items-center flex flex-row gap-4 material container-surface 
    surface-overlay-surface-tint/elevation-surface-tint elevation-level5"
  >
    <h1 class="text-headline-small text-on-background font-medium uppercase"
      >Material Design 3</h1
    >

    <button
      class="
        material
        container-primary
        text-on-primary
        text-label-large 
        h-10
        px-6 
        rounded-full
        hover:state-hovered
        active:state-pressed
        focus:state-focused
        state-layer-on-primary/state-layer
      "
      on:click={() => (dark = !dark)}>Toggle dark mode</button
    >
  </header>

  <div class="flex flex-col gap-12 p-8">
    <Color />
    <Elevation />
    <Shape />
    <Typography />
  </div>

  <button
    class="material hover:state-hovered focus:state-focused container-secondary text-on-secondary active:state-pressed state-layer-on-secondary/state-layer w-72 h-72 elevation-level5"
  >
    Press Me
  </button>
</div>
