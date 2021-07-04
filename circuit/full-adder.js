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

const gunCarry0 = withSettings(gliderGunP60, {
  rotate: 270,
  reflect: true,
});

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

const halfSum = (a, b) =>
  jumpToPhase(halfAdder(a, b, { collectSum: false, collectCarry: false }), 56);

export function fullAdder(a = 0, b = 0, carry = 0) {
  const inputSum = { pattern: halfSum(a, b), offset: { x: -4, y: 118 } };
  const carry0 = carry ? { pattern: gunCarry0, offset: { x: 801, y: 600 } } : null;

  // Split each signal in 2:
  const splitCarry0 = { pattern: divide(), offset: { x: 801, y: 600 } };
  const splitCarry1 = { pattern: divide(), offset: { x: 464, y: 555 } };

  // XOR 1st bit sum with 0th bit carry to get the final 1st bit sum:
  const sumOut = { pattern: xor(), offset: { x: 596, y: 738 } };
  const collector1 = { pattern: collector, offset: { x: 753, y: 997 } };

  // Redirect signals to avoid crossings:
  const divertLeft = { pattern: redirectLeft, offset: { x: 385, y: 728 } };
  const divertBack = { pattern: redirectBack, offset: { x: 1027, y: 845 } };
  const divertForward = { pattern: redirectForward, offset: { x: 838, y: 1029 } };

  // AND 1st bit sum and 0th bit carry,
  // OR the result with 1st bit carry to get the final carry:
  const sumAndCarry = { pattern: and(), offset: { x: 778, y: 1101 } };
  const carryOut = { pattern: or(), offset: { x: 892, y: 1312 } };

  return composePatterns([
    carry0,
    inputSum,

    splitCarry0,
    splitCarry1,

    sumOut,
    collector1,

    divertLeft,
    divertBack,
    divertForward,

    sumAndCarry,
    carryOut,
  ]);
}
