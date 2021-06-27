import { range } from "../utils.js";
import { rotatePattern } from "./rotate-pattern.js";
import { reflectPattern } from "./reflect-pattern.js";
import { fromPseudoGraphics } from "./from-pseudo-graphics.js";
import { jumpToPhase } from "./skip-phase.js";

export function withSettings(source, settings = {}) {
  const { rotate = 0, reflect = false, phase = 0 } = settings;

  if (rotate) {
    range(Math.floor(rotate / 90)).forEach(() => {
      source = rotatePattern(source);
    });
  }

  if (reflect) {
    source = reflectPattern(source);
  }

  let population = fromPseudoGraphics(source);

  if (phase) {
    population = jumpToPhase(population, phase);
  }

  return population;
}
