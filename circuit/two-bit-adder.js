import { toBits } from "../utils.js";

import { composePatterns } from "../composition/composer.js";
import { withSettings } from "../composition/with-settings.js";
import { jumpToPhase } from "../composition/skip-phase.js";

import { gliderGunP60 } from "../life/population/patterns/glider-gun-p60.js";
import { reflector } from "../life/population/patterns/reflector.js";
import { eater } from "../life/population/patterns/eater.js";

import { or } from "../gates/or.js";
import { and } from "../gates/and.js";
import { xor } from "../gates/xor.js";
import { divide } from "../gates/split.js";

import { halfAdder } from "./half-adder.js";

const collector = withSettings(eater);

const redirectLeft = withSettings(reflector, {
  reflect: true,
  phase: 1,
});

const redirectBack = withSettings(reflector, {
  phase: 12,
});

const redirectForward = withSettings(reflector, {
  reflect: true,
  phase: 1,
});

const halfSum0 = (a, b) =>
  jumpToPhase(halfAdder(a, b, { collectCarry: false }), 27);

const halfSum1 = (a, b) =>
  jumpToPhase(halfAdder(a, b, { collectSum: false, collectCarry: false }), 56);

export function adder(a = "11", b = "11") {
  const [a0, a1] = toBits(a);
  const [b0, b1] = toBits(b);

  // Represent input signals as 2 pairs of corresponding bits:
  const bit0 = { pattern: halfSum0(a0, b0), offset: { x: 514, y: 16 } };
  const bit1 = { pattern: halfSum1(a1, b1), offset: { x: -4, y: 118 } };

  // Split each signal in 2:
  const splitCarry0 = { pattern: divide(), offset: { x: 801, y: 600 } };
  const splitCarry1 = { pattern: divide(), offset: { x: 464, y: 555 } };

  // XOR 1st bit sum with 0th bit carry to get the final 1st bit sum:
  const sum1 = { pattern: xor(), offset: { x: 596, y: 738 } };
  const collector1 = { pattern: collector, offset: { x: 753, y: 997 } };

  // Redirect signals to avoid crossings:
  const divertLeft = { pattern: redirectLeft, offset: { x: 385, y: 728 } };
  const divertBack = { pattern: redirectBack, offset: { x: 1027, y: 845 } };
  const divertForward = {
    pattern: redirectForward,
    offset: { x: 838, y: 1029 },
  };

  // AND 1st bit sum and 0th bit carry,
  // OR the result with 1st bit carry to get the final carry:
  const sumAndCarry = { pattern: and(), offset: { x: 778, y: 1101 } };
  const carryOut = { pattern: or(), offset: { x: 892, y: 1312 } };

  return composePatterns([
    bit0,
    bit1,

    splitCarry0,
    splitCarry1,

    sum1,
    collector1,

    divertLeft,
    divertBack,
    divertForward,

    sumAndCarry,
    carryOut,
  ]);
}
