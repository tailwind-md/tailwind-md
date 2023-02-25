<script lang="ts">
  import { createSystemColors } from "$plugin/utils";
  import "./app.postcss";
  const sys = Object.entries(createSystemColors("light"));
</script>

<div class="flex flex-row">
  <div>
    {#each sys as [name, color]}
      <div
        class="flex flex-row items-center justify-center">{name}</div
      >
    {/each}
  </div>
</div>
