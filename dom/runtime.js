export function handleRuntimeUpdates() {
  const showCircuitControl = document.querySelector('[name="circuit"]');
  const scaleControl = document.querySelector('[name="scale"]');
  const canvasWrapper = document.querySelector(".canvas");

  showCircuitControl.addEventListener("change", (e) => {
    canvasWrapper.querySelector("canvas").classList.toggle("mapped");
  });

  scaleControl.addEventListener("change", (e) => {
    canvasWrapper.style.setProperty("--scale", e.target.value);
  });
}
