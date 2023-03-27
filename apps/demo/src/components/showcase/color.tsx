export function Color() {
  return (
    <div class="flex flex-col gap-6 p-4">
      <h2 class="text-headline-medium text-on-background">Color</h2>
      <h3 class="text-headline-small text-on-surface">Light</h3>
      <div
        class="flex w-max flex-col gap-2 rounded-small bg-background p-8"
        data-theme-mode="light"
      >
        <div class="flex flex-row gap-2">
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-primary text-on-primary">
            Primary
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-primary text-primary">
            On Primary
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-primary-container text-on-primary-container">
            Primary Container
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-primary-container text-primary-container">
            On Primary Container
          </div>
        </div>
        <div class="flex flex-row gap-2">
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-primary-fixed text-on-primary-fixed">
            Primary Fixed
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-primary-fixed-dim text-on-primary-fixed">
            Primary Fixed Dim
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-primary-fixed text-primary-fixed">
            On Primary Fixed
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-primary-fixed-variant text-primary-fixed-dim">
            On Primary Fixed Variant
          </div>
        </div>
        <div class="flex flex-row gap-2">
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-secondary text-on-secondary">
            Secondary
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-secondary text-secondary">
            On Secondary
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-secondary-container text-on-secondary-container">
            Secondary Container
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-secondary-container text-secondary-container">
            On Secondary Container
          </div>
        </div>
        <div class="flex flex-row gap-2">
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-secondary-fixed text-on-secondary-fixed">
            Secondary Fixed
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-secondary-fixed-dim text-on-secondary-fixed">
            Secondary Fixed Dim
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-secondary-fixed text-secondary-fixed">
            On Secondary Fixed
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-secondary-fixed-variant text-secondary-fixed-dim">
            On Secondary Fixed Variant
          </div>
        </div>
        <div class="flex flex-row gap-2">
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-tertiary text-on-tertiary">
            Tertiary
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-tertiary text-tertiary">
            On Tertiary
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-tertiary-container text-on-tertiary-container">
            Tertiary Container
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-tertiary-container text-tertiary-container">
            On Tertiary Container
          </div>
        </div>
        <div class="flex flex-row gap-2">
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-tertiary-fixed text-on-tertiary-fixed">
            Tertiary Fixed
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-tertiary-fixed-dim text-on-tertiary-fixed">
            Tertiary Fixed Dim
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-tertiary-fixed text-tertiary-fixed">
            On Tertiary Fixed
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-tertiary-fixed-variant text-tertiary-fixed-dim">
            On Tertiary Fixed Variant
          </div>
        </div>
        <div class="flex flex-row gap-2">
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-success text-on-success">
            Success
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-success text-success">
            On Success
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-success-container text-on-success-container">
            Success Container
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-success-container text-success-container">
            On Success Container
          </div>
        </div>
        <div class="flex flex-row gap-2">
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-warning text-on-warning">
            Warning
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-warning text-warning">
            On Warning
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-warning-container text-on-warning-container">
            Warning Container
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-warning-container text-warning-container">
            On Warning Container
          </div>
        </div>
        <div class="flex flex-row gap-2">
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-error text-on-error">
            Error
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-error text-error">
            On Error
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-error-container text-on-error-container">
            Error Container
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-error-container text-error-container">
            On Error Container
          </div>
        </div>
        <div class="flex flex-row gap-2">
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-background text-on-background">
            Background
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-background text-background">
            On Background
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-surface text-on-surface">
            Surface
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-surface text-surface">
            On Surface
          </div>
        </div>
        <div class="flex flex-row gap-2">
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-surface-variant text-on-surface-variant">
            Surface Variant
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-surface-variant text-surface-variant">
            On Surface Variant
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-outline text-on-surface">
            Outline
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-outline-variant text-on-surface">
            Outline Variant
          </div>
        </div>
        <div class="flex flex-row gap-2">
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-surface-dim text-on-surface">
            Surface Dim
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-surface-bright text-on-surface">
            Surface Bright
          </div>
        </div>
        <div class="flex flex-row gap-2">
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-surface-container-highest text-on-surface">
            Surface Container Highest
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-surface-container-high text-on-surface">
            Surface Container High
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-surface-container text-on-surface">
            Surface Container
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-surface-container-low text-on-surface">
            Surface Container Low
          </div>
        </div>
        <div class="flex flex-row gap-2">
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-surface-container-lowest text-on-surface">
            Surface Container Lowest
          </div>
        </div>
        <div class="flex flex-row gap-2">
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-inverse-primary text-on-primary-container">
            Inverse Primary
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-inverse-surface text-inverse-on-surface">
            Inverse Surface
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-inverse-on-surface text-inverse-surface">
            Inverse On Surface
          </div>
        </div>
      </div>
      <h3 class="text-headline-small text-on-surface">Dark</h3>
      <div
        class="flex w-max flex-col gap-2 rounded-small bg-background p-8"
        data-theme-mode="dark"
      >
        <div class="flex flex-row gap-2">
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-primary text-on-primary">
            Primary
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-primary text-primary">
            On Primary
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-primary-container text-on-primary-container">
            Primary Container
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-primary-container text-primary-container">
            On Primary Container
          </div>
        </div>
        <div class="flex flex-row gap-2">
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-primary-fixed text-on-primary-fixed">
            Primary Fixed
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-primary-fixed-dim text-on-primary-fixed">
            Primary Fixed Dim
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-primary-fixed text-primary-fixed">
            On Primary Fixed
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-primary-fixed-variant text-primary-fixed-dim">
            On Primary Fixed Variant
          </div>
        </div>
        <div class="flex flex-row gap-2">
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-secondary text-on-secondary">
            Secondary
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-secondary text-secondary">
            On Secondary
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-secondary-container text-on-secondary-container">
            Secondary Container
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-secondary-container text-secondary-container">
            On Secondary Container
          </div>
        </div>
        <div class="flex flex-row gap-2">
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-secondary-fixed text-on-secondary-fixed">
            Secondary Fixed
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-secondary-fixed-dim text-on-secondary-fixed">
            Secondary Fixed Dim
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-secondary-fixed text-secondary-fixed">
            On Secondary Fixed
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-secondary-fixed-variant text-secondary-fixed-dim">
            On Secondary Fixed Variant
          </div>
        </div>
        <div class="flex flex-row gap-2">
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-tertiary text-on-tertiary">
            Tertiary
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-tertiary text-tertiary">
            On Tertiary
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-tertiary-container text-on-tertiary-container">
            Tertiary Container
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-tertiary-container text-tertiary-container">
            On Tertiary Container
          </div>
        </div>
        <div class="flex flex-row gap-2">
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-tertiary-fixed text-on-tertiary-fixed">
            Tertiary Fixed
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-tertiary-fixed-dim text-on-tertiary-fixed">
            Tertiary Fixed Dim
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-tertiary-fixed text-tertiary-fixed">
            On Tertiary Fixed
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-tertiary-fixed-variant text-tertiary-fixed-dim">
            On Tertiary Fixed Variant
          </div>
        </div>
        <div class="flex flex-row gap-2">
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-success text-on-success">
            Success
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-success text-success">
            On Success
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-success-container text-on-success-container">
            Success Container
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-success-container text-success-container">
            On Success Container
          </div>
        </div>
        <div class="flex flex-row gap-2">
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-warning text-on-warning">
            Warning
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-warning text-warning">
            On Warning
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-warning-container text-on-warning-container">
            Warning Container
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-warning-container text-warning-container">
            On Warning Container
          </div>
        </div>
        <div class="flex flex-row gap-2">
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-error text-on-error">
            Error
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-error text-error">
            On Error
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-error-container text-on-error-container">
            Error Container
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-error-container text-error-container">
            On Error Container
          </div>
        </div>
        <div class="flex flex-row gap-2">
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-background text-on-background">
            Background
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-background text-background">
            On Background
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-surface text-on-surface">
            Surface
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-surface text-surface">
            On Surface
          </div>
        </div>
        <div class="flex flex-row gap-2">
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-surface-variant text-on-surface-variant">
            Surface Variant
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-on-surface-variant text-surface-variant">
            On Surface Variant
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-outline text-on-surface">
            Outline
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-outline-variant text-on-surface">
            Outline Variant
          </div>
        </div>
        <div class="flex flex-row gap-2">
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-surface-dim text-on-surface">
            Surface Dim
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-surface-bright text-on-surface">
            Surface Bright
          </div>
        </div>
        <div class="flex flex-row gap-2">
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-surface-container-highest text-on-surface">
            Surface Container Highest
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-surface-container-high text-on-surface">
            Surface Container High
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-surface-container text-on-surface">
            Surface Container
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-surface-container-low text-on-surface">
            Surface Container Low
          </div>
        </div>
        <div class="flex flex-row gap-2">
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-surface-container-lowest text-on-surface">
            Surface Container Lowest
          </div>
        </div>
        <div class="flex flex-row gap-2">
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-inverse-primary text-on-primary-container">
            Inverse Primary
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-inverse-surface text-inverse-on-surface">
            Inverse Surface
          </div>
          <div class="flex h-36 w-72 flex-col items-center justify-center rounded-large bg-inverse-on-surface text-inverse-surface">
            Inverse On Surface
          </div>
        </div>
      </div>
    </div>
  );
}
