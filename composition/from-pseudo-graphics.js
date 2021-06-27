import { exists } from "../utils.js";
import { createAgent } from "../life/agent.js";

import { LINE_BREAK, LIVE_AGENT, EMPTY_STRING } from "./const.js";

export function fromPseudoGraphics(source) {
  const population = {};
  const rows = source.split(LINE_BREAK).filter(exists);

  rows.forEach((row, j) => {
    const characters = row.split(EMPTY_STRING);

    characters.forEach((character, i) => {
      if (character !== LIVE_AGENT) return;

      population[`${i}:${j}`] = createAgent(i, j);
    });
  });

  return population;
}
