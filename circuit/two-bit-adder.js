import { toBits } from "../utils.js";

import { composePatterns } from "../composition/composer.js";
import { jumpToPhase } from "../composition/skip-phase.js";

import { halfAdder } from "./half-adder.js";
import { fullAdder } from "./full-adder.js";

const halfSum0 = (a, b) => jumpToPhase(halfAdder(a, b, { collectCarry: false }), 27);

export function adder(a = "11", b = "11") {
  // Represent input signals as 2 pairs of corresponding bits:
  const [a0, a1] = toBits(a);
  const [b0, b1] = toBits(b);

  const bit0 = { pattern: halfSum0(a0, b0), offset: { x: 514, y: 16 } };
  const bit1 = { pattern: fullAdder(a1, b1) };
  return composePatterns([bit0, bit1]);
}
