export class Drawer {
  constructor(kernelSize) {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const [width, height] = [canvas.offsetWidth, canvas.offsetHeight];

    this.context = context;
    this.kernel = kernelSize;

    this.width = width;
    this.height = height;

    this.rows = Math.floor(height / this.kernel);
    this.columns = Math.floor(width / this.kernel);
    this.normalizeScale();
  }

  normalizeScale = () => {
    const { devicePixelRatio: pixelRatio } = window;

    if (pixelRatio > 1) {
      canvas.width = this.width * pixelRatio;
      canvas.height = this.height * pixelRatio;
      canvas.style.width = `${this.width}px`;
      canvas.style.height = `${this.height}px`;
      this.context.scale(pixelRatio, pixelRatio);
    }
  };

  drawGrid = () => {
    this.context.strokeStyle = "rgba(0,0,0, 0.3)";

    for (let i = 0; i < this.width; i += this.kernel) {
      this.context.beginPath();
      this.context.moveTo(i, 0);
      this.context.lineTo(i, this.height);
      this.context.stroke();
    }

    for (let j = 0; j < this.height; j += this.kernel) {
      this.context.beginPath();
      this.context.moveTo(0, j);
      this.context.lineTo(this.width, j);
      this.context.stroke();
    }
  };

  drawWorld = (world) => {
    this.context.fillStyle = "#000000";

    world.agents.forEach((agent) => {
      this.context.fillRect(
        agent.x * this.kernel,
        agent.y * this.kernel,
        this.kernel,
        this.kernel
      );
    });
  };

  reset = (settings = {}) => {
    const { grid = true } = settings;

    this.context.clearRect(0, 0, this.width, this.height);
    if (grid) this.drawGrid();
  };
}
