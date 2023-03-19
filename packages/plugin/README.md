# Tailwind Material Design

## Plugin for Tailwind CSS

This plugin provides a set of utility and component classes for that is mostly compliant to the latest [Material Design Spec](https://m3.material.io) in your Tailwind CSS projects.

## Installation

- npm

  ```bash
  npm install -D @tailwind-md/plugin
  ```

- yarn

  ```bash
  yarn add -D @tailwind-md/plugin
  ```

- pnpm

  ```bash
  pnpm add -D @tailwind-md/plugin
  ```

Plug into your Tailwind CSS config file.

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,tsx,js,jsx,svelte,md,php,mdx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwind-md/plugin")({})],
};
```

## Configuration

This plugin accepts configuration to customize the generated tailwind classes.

TODO: Add configuration options docs

## Utilities and Components

TODO: Add utilities and components docs
