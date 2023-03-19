/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "prettier",
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: ["@typescript-eslint"],
  ignorePatterns: ["*.cjs"],
  settings: {},
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
};
