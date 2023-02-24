import type { SnakeCanvas } from "./SnakeCanvas.jsx";

export default class Snake extends Array<Coords> {
  private readonly canvas: SnakeCanvas;
  public direction!: "RIGHT" | "LEFT" | "UP" | "DOWN";

  constructor(snakeCanvas: SnakeCanvas) {
    super();
    this.canvas = snakeCanvas;
    this[0] = {
      x: (Math.ceil(snakeCanvas.squaresPerRow / 2) - 1) * snakeCanvas.squareSize,
      y: (Math.ceil(snakeCanvas.squaresPerCol / 2) - 1) * snakeCanvas.squareSize
    };
  }

  isCollision(newHead: Coords): boolean {
    return this.length >= 4
      && this.some(({ x, y }) => x === newHead.x && y === newHead.y);
  }

  getNewHead(): Coords {
    const newHead = { ...this[0] };

    switch (this.direction) {
      case "LEFT":
        newHead.x -= this.canvas.squareSize;
        if (newHead.x < 0)
          newHead.x = this.canvas.width - this.canvas.squareSize;
        break;
      case "RIGHT":
        newHead.x += this.canvas.squareSize;
        if (newHead.x + this.canvas.squareSize > this.canvas.width)
          newHead.x = 0;
        break;
      case "UP":
        newHead.y -= this.canvas.squareSize;
        if (newHead.y < 0)
          newHead.y = this.canvas.width - this.canvas.squareSize;
        break;
      case "DOWN":
        newHead.y += this.canvas.squareSize;
        if (newHead.y + this.canvas.squareSize > this.canvas.width)
          newHead.y = 0;
        break;
    }

    return newHead;
  }

  steer(key: string): void {
    switch (key) {
      case "ArrowLeft":
        if (this.direction !== "RIGHT")
          this.direction = "LEFT";
        return;
      case "ArrowRight":
        if (this.direction !== "LEFT")
          this.direction = "RIGHT";
        return;
      case "ArrowUp":
        if (this.direction !== "DOWN")
          this.direction = "UP";
        return;
      case "ArrowDown":
        if (this.direction !== "UP")
          this.direction = "DOWN";
        return;
    }
  }
}