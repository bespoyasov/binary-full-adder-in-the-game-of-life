import { World } from "../life/world.js";

export function jumpToPhase(pattern, iterations) {
  const world = new World(1000, 1000, pattern);
  world.evolve({ iterations });
  return world.population;
}
