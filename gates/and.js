import { composePatterns } from "../composition/composer.js";
import { withSettings } from "../composition/with-settings.js";

import { eater } from "../life/population/patterns/eater.js";
import { gliderGunP60 } from "../life/population/patterns/glider-gun-p60.js";

const gunA = withSettings(gliderGunP60, {
  rotate: 270,
  reflect: true,
});

const gunB = withSettings(gliderGunP60, {
  rotate: 270,
  reflect: true,
});

const clockGun = withSettings(gliderGunP60, {
  rotate: 270,
});

const collectorEater = withSettings(eater, {
  rotate: 270,
});

export function and(a = 0, b = 0) {
  const signalA = a ? { pattern: gunA } : null;
  const signalB = b ? { pattern: gunB, offset: { x: 128 } } : null;

  const clock = { pattern: clockGun, offset: { x: 208, y: 1 } };
  const collector = { pattern: collectorEater, offset: { x: 76, y: 173 } };
  return composePatterns([clock, collector, signalA, signalB]);
}
