import { exists, rotateMatrix } from "../utils.js";
import { LINE_BREAK, EMPTY_STRING } from "./const.js";

export function rotatePattern(source) {
  const pattern = source.split(LINE_BREAK).filter(exists);

  pattern.forEach((row, i) => {
    pattern[i] = row.split(EMPTY_STRING);
  });

  const rotated = rotateMatrix(pattern);

  rotated.forEach((row, i) => {
    rotated[i] = row.join(EMPTY_STRING);
  });

  return rotated.join(LINE_BREAK);
}
