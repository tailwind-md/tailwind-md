export function camelToSnake(snake: string): string {
  return snake;
}

export function toCSSVariables(o: Record<string, string>) {
  const vars: Record<`--${string}`, string> = {};
  for (const [key, value] of Object.entries(o)) {
    vars[`--${camelToSnake(key)}`] = value;
  }
  return vars;
}
