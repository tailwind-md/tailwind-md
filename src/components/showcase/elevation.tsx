export function Elevation() {
  return (
    <div class="flex flex-col gap-6 p-4">
      <h2 class="text-headline-medium text-on-background">Elevation</h2>
      <h3 class="text-headline-small text-on-surface">Surface Tone</h3>
      <div class="flex flex-row gap-4">
        <div class="flex h-36 w-36 flex-col items-center justify-center rounded-full text-on-surface material container-surface surface-overlay-surface-tint/level0-surface-tint">
          Level 0
        </div>
        <div class="flex h-36 w-36 flex-col items-center justify-center rounded-full text-on-surface material container-surface surface-overlay-surface-tint/level1-surface-tint">
          Level 1
        </div>
        <div class="flex h-36 w-36 flex-col items-center justify-center rounded-full text-on-surface material container-surface surface-overlay-surface-tint/level2-surface-tint">
          Level 2
        </div>
        <div class="flex h-36 w-36 flex-col items-center justify-center rounded-full text-on-surface material container-surface surface-overlay-surface-tint/level3-surface-tint">
          Level 3
        </div>
        <div class="flex h-36 w-36 flex-col items-center justify-center rounded-full text-on-surface material container-surface surface-overlay-surface-tint/level4-surface-tint">
          Level 4
        </div>
        <div class="flex h-36 w-36 flex-col items-center justify-center rounded-full text-on-surface material container-surface surface-overlay-surface-tint/level5-surface-tint">
          Level 5
        </div>
      </div>
      <h3 class="text-headline-small text-on-surface">Shadow</h3>
      <div class="flex flex-row gap-4">
        <div class="shadow-elevation-level0 flex h-36 w-36 flex-col items-center justify-center rounded-full bg-primary-container text-on-primary-container">
          Level 0
        </div>
        <div class="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-primary-container text-on-primary-container shadow-level1">
          Level 1
        </div>
        <div class="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-primary-container text-on-primary-container shadow-level2">
          Level 2
        </div>
        <div class="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-primary-container text-on-primary-container shadow-level3">
          Level 3
        </div>
        <div class="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-primary-container text-on-primary-container shadow-level4">
          Level 4
        </div>
        <div class="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-primary-container text-on-primary-container shadow-level5">
          Level 5
        </div>
      </div>
    </div>
  );
}
