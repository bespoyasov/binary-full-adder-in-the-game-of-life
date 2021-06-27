import { composePatterns } from "../composition/composer.js";
import { withSettings } from "../composition/with-settings.js";

import { gliderGunP60 } from "../life/population/patterns/glider-gun-p60.js";
import { reflector } from "../life/population/patterns/reflector.js";
import { eater } from "../life/population/patterns/eater.js";

import { divide } from "../gates/split.js";
import { xor } from "../gates/xor.js";
import { and } from "../gates/and.js";

const gunA = withSettings(gliderGunP60, {
  rotate: 270,
  reflect: true,
});

const gunB = withSettings(gliderGunP60, {
  rotate: 270,
  reflect: true,
});

const redirectRight = withSettings(reflector, {
  phase: 4,
});

const redirectA = withSettings(reflector, {
  phase: 1,
  reflect: true,
});

const redirectB = withSettings(reflector, {
  phase: 29,
  reflect: true,
});

const sumEater = withSettings(eater);
const carryEater = withSettings(eater);

export function halfAdder(a = 0, b = 0, settings = {}) {
  const { collectCarry = true, collectSum = true } = settings;

  // Use two signals as bits to add together:
  const signalA = a ? { pattern: gunA, offset: { x: 328, y: 2 } } : null;
  const signalB = b ? { pattern: gunB, offset: { x: 329, y: 124 } } : null;

  // Split each in two signals:
  const splitA = a ? { pattern: divide(), offset: { x: 328, y: 2 } } : null;
  const splitB = b ? { pattern: divide(), offset: { x: 329, y: 124 } } : null;

  // XOR the first A/B pair to get the Sum bit:
  const rerouteRight = { pattern: redirectRight, offset: { x: 496, y: 189 } };
  const sumBit = { pattern: xor(), offset: { x: 318, y: 201 } };
  const sumCollector = collectSum
    ? { pattern: sumEater, offset: { x: 475, y: 460 } }
    : null;

  // AND the other A/B pair to get the Carry bit:
  const divertA = a ? { pattern: redirectA, offset: { x: 54, y: 370 } } : null;
  const divertB = b ? { pattern: redirectB, offset: { x: 182, y: 365 } } : null;

  const carryBit = { pattern: and(), offset: { x: 83, y: 353 } };
  const carryCollector = collectCarry
    ? { pattern: carryEater, offset: { x: 287, y: 600 } }
    : null;

  // Compose the circuit and create a world population:
  return composePatterns([
    signalA,
    splitA,
    signalB,
    splitB,

    rerouteRight,
    divertA,
    divertB,

    sumBit,
    sumCollector,

    carryBit,
    carryCollector,
  ]);
}
