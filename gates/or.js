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

const outputGun = withSettings(gliderGunP60, {
  rotate: 270,
  reflect: true,
});

const collectorEater = withSettings(eater);

export function or(a = 0, b = 0) {
  const signalA = a ? { pattern: gunA } : null;
  const signalB = b ? { pattern: gunB, offset: { x: 128 } } : null;

  const clock = { pattern: clockGun, offset: { x: 208, y: 1 } };
  const output = { pattern: outputGun, offset: { x: 1, y: 45 } };

  const signalCollector = { pattern: collectorEater, offset: { x: 145, y: 161 } };
  const outputCollector = { pattern: collectorEater, offset: { x: 146, y: 206 } };
  return composePatterns([clock, output, signalA, signalB, signalCollector, outputCollector]);
}
