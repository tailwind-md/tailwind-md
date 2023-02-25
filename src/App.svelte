<script lang="ts">
  import "./app.postcss";
  export let name: string;
  const tones = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100];
  const colors = [
    "primary",
    "secondary",
    "tertiary",
    "success",
    "warning",
    "error",
    "neutral",
    "neutral-variant",
  ];
</script>

<div class="flex flex-row">
  {#each colors as color}
    <div>
      {#each tones as tone}
        <div
          style="background-color: var(--m3-ref-color-{color}{tone}); width: 200px; height: 100px"
          >{color}-{tone}</div
        >
      {/each}
    </div>
  {/each}
</div>
