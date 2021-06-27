import { LINE_BREAK, EMPTY_STRING } from "./const.js";

export function reflectPattern(source) {
  const rows = source.split(LINE_BREAK);

  rows.forEach((row, i) => {
    rows[i] = row.split(EMPTY_STRING).reverse().join(EMPTY_STRING);
  });

  return rows.join(LINE_BREAK);
}
