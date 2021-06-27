export function range(size) {
  return Array.from({ length: size }, (_, index) => index);
}

export function exists(entity) {
  return !!entity;
}

// -90 degrees => matrix[j][m - 1 - i]
// +90 degrees  => matrix[n - 1 - j][i]
export function rotateMatrix(matrix) {
  const n = matrix.length;
  const m = matrix[0].length;
  const rotated = [];

  range(n).forEach((j) => {
    range(m).forEach((i) => {
      rotated[i] = rotated[i] ?? [];
      rotated[i][j] = matrix[j][m - 1 - i];
    });
  });

  return rotated;
}

export function toBits(str) {
  return str.split("").map(Number).reverse();
}
