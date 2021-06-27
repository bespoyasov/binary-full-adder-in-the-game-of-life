import { createAgent } from "../life/agent.js";

export function composePatterns(composites) {
  return composites.reduce((population, composite) => {
    if (!composite) return population;

    const { pattern, offset = {} } = composite;
    const { x: offsetX = 0, y: offsetY = 0 } = offset;

    Object.entries(pattern).forEach(([key, value]) => {
      const coords = key.split(":").map(Number);
      const [x, y] = coords;

      const nextCoords = [x + offsetX, y + offsetY];
      const nextKey = nextCoords.join(":");
      const nextValue = createAgent(...nextCoords);

      population[nextKey] = nextValue;
    });

    return population;
  }, {});
}
