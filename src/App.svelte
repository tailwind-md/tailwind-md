<script lang="ts">
  import Color from "$components/Color.svelte";
  import Elevation from "$components/Elevation.svelte";
  import "./app.postcss";

  let dark = false;

  $: document.body.dataset.themeMode = dark ? "dark" : "light";
</script>

<header
  class="w-full sticky top-0 bg-surface text-on-surface p-8 py-6 items-center flex flex-row gap-4"
>
  <h1 class="text-headline-large text-on-background">Material Design 3</h1>
  <button
    class="bg-primary text-on-primary text-label-large h-[40px] px-6 rounded-full"
    on:click={() => (dark = !dark)}>Toggle dark mode</button
  >
</header>

<div class="flex flex-col gap-12 p-8">
  <Color />
  <Elevation />
</div>
