<script lang="ts">
  import "./app.postcss";

  let dark = false;

  $: document.body.dataset.themeMode = dark ? "dark" : "light";
</script>

<button on:click={() => (dark = !dark)}>Toggle dark mode</button>

<div class="flex flex-col gap-4">
  <h2 class="text-on-background text-headline-medium">Elevation</h2>
  <div class="flex flex-row gap-4">
    <div
      class="h-36 w-36 rounded-full bg-primary-container shadow-elevation-level0 flex flex-col items-center justify-center text-on-primary-container"
    >
      Level 0
    </div>
    <div
      class="h-36 w-36 rounded-full bg-primary-container shadow-red-400 shadow-elevation-level1 flex flex-col items-center justify-center text-on-primary-container"
    >
      Level 1
    </div>
    <div
      class="h-36 w-36 rounded-full bg-primary-container shadow-elevation-level2 flex flex-col items-center justify-center text-on-primary-container"
    >
      Level 2
    </div>
    <div
      class="h-36 w-36 rounded-full bg-primary-container shadow-elevation-level3 flex flex-col items-center justify-center text-on-primary-container"
    >
      Level 3
    </div>
    <div
      class="h-36 w-36 rounded-full bg-primary-container shadow-elevation-level4 flex flex-col items-center justify-center text-on-primary-container"
    >
      Level 4
    </div>
    <div
      class="h-36 w-36 rounded-full bg-primary-container shadow-elevation-level5 flex flex-col items-center justify-center text-on-primary-container"
    >
      Level 5
    </div>
  </div>
</div>
