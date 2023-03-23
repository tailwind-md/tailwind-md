/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@tailwind-md"],
  ignorePatterns: ["**/**.cjs"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
  },
};
