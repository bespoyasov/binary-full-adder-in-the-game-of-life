import { handleRuntimeUpdates } from "./dom/runtime.js";
import { extractSignalValues } from "./dom/input.js";
import { updateFormValues } from "./dom/form.js";

import * as settings from "./config.js";
import { Drawer } from "./dom/drawer.js";
import { World } from "./life/world.js";

import { halfAdder } from "./circuit/half-adder.js";
import { fullAdder } from "./circuit/full-adder.js";

const { a, b, speed } = extractSignalValues();
updateFormValues(a, b, speed);
handleRuntimeUpdates();

const drawer = new Drawer(settings.GRID_KERNEL);
const world = new World(drawer.rows, drawer.columns, fullAdder(a, b));

function liveGeneration() {
  drawer.reset({ grid: false });
  drawer.drawWorld(world);
  world.evolve({ iterations: speed });
}

(function gameLoop() {
  liveGeneration();

  setTimeout(() => window.requestAnimationFrame(gameLoop), settings.REPRODUCTION_TIME);
})();
