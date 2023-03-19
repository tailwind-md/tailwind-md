export function Shape() {
  return (
    <div class="flex flex-col gap-6 p-4">
      <h2 class="text-headline-medium text-on-background">Shape</h2>
      <h3 class="text-headline-small text-on-surface">Rounded</h3>
      <div class="flex flex-row gap-4">
        <div class="flex h-36 w-36 flex-col items-center justify-center rounded-extra-small bg-secondary text-on-secondary">
          Extra Small
        </div>
        <div class="flex h-36 w-36 flex-col items-center justify-center rounded-small bg-secondary text-on-secondary">
          Small
        </div>
        <div class="flex h-36 w-36 flex-col items-center justify-center rounded-medium bg-secondary text-on-secondary">
          Medium
        </div>
        <div class="flex h-36 w-36 flex-col items-center justify-center rounded-large bg-secondary text-on-secondary">
          Large
        </div>
        <div class="flex h-36 w-36 flex-col items-center justify-center rounded-extra-large bg-secondary text-on-secondary">
          Extra Large
        </div>
        <div class="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-secondary text-on-secondary">
          Full
        </div>
      </div>
    </div>
  );
}
