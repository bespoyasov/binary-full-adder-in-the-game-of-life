import { composePatterns } from "../composition/composer.js";
import { withSettings } from "../composition/with-settings.js";

import { gliderGunP60 } from "../life/population/patterns/glider-gun-p60.js";
import { fanout } from "../life/population/patterns/fanout.js";

const signalGun = withSettings(gliderGunP60, {
  rotate: 270,
  reflect: true,
});

const split = withSettings(fanout, {
  phase: 11,
});

export function divide(input = 0) {
  const signal = input ? { pattern: signalGun } : null;
  const splitter = { pattern: split, offset: { x: 28, y: 39 } };
  return composePatterns([signal, splitter]);
}
