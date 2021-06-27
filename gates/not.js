import { composePatterns } from "../composition/composer.js";
import { withSettings } from "../composition/with-settings.js";

import { gliderGunP60 } from "../life/population/patterns/glider-gun-p60.js";
import { reflector } from "../life/population/patterns/reflector.js";

const clockGun = withSettings(gliderGunP60, {
  rotate: 270,
});

const signalGun = withSettings(gliderGunP60, {
  rotate: 270,
  reflect: true,
});

const redirection = withSettings(reflector, {
  reflect: true,
  phase: 13,
});

export function not(input = 0) {
  const signal = input ? { pattern: signalGun } : null;
  const clock = { pattern: clockGun, offset: { x: 38, y: 1 } };
  const router = { pattern: redirection, offset: { x: 9, y: 62 } };
  return composePatterns([clock, signal, router]);
}
