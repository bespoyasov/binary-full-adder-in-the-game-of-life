import { composePatterns } from "../composition/composer.js";
import { withSettings } from "../composition/with-settings.js";

import { reflector } from "../life/population/patterns/reflector.js";
import { gliderGunP60 } from "../life/population/patterns/glider-gun-p60.js";

const gunA = withSettings(gliderGunP60, {
  rotate: 270,
  reflect: true,
  phase: 45,
});

const gunB = withSettings(gliderGunP60, {
  rotate: 270,
});

const clockGun = withSettings(gliderGunP60, {
  rotate: 270,
});

const outputGun = withSettings(gliderGunP60, {
  rotate: 270,
  reflect: true,
});

const redirection = withSettings(reflector, {
  reflect: true,
  phase: 21,
});

export function xor(a = 0, b = 0) {
  const signalA = a ? { pattern: gunA, offset: { x: 48, y: 2 } } : null;
  const signalB = b ? { pattern: gunB, offset: { x: 128, y: 1 } } : null;

  const clock = { pattern: clockGun, offset: { x: 168, y: 44 } };
  const router = { pattern: redirection, offset: { x: 56, y: 105 } };
  const output = { pattern: outputGun, offset: { x: 1, y: 87 } };
  return composePatterns([clock, router, signalA, signalB, output]);
}
