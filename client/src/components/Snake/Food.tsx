import { randomInt } from "../../utils/random.js";
import type { SnakeCanvas } from "./SnakeCanvas.jsx";

export default class Food {
  public readonly image: HTMLImageElement;
  public x: number;
  public y: number;
  public randomizeCoords: VoidFunction;

  constructor(canvas: SnakeCanvas) {
    this.image = <img src="/img/snake/food.png" />;
    this.x = canvas.width - canvas.squareSize * 2;
    this.y = canvas.squareSize;
    this.randomizeCoords = () => {
      do {
        this.x = randomInt(0, canvas.squaresPerRow - 1) * canvas.squareSize;
        this.y = randomInt(0, canvas.squaresPerCol - 1) * canvas.squareSize;
      } while (canvas.snake.some(({ x, y }) => x === this.x && y === this.y));
    };
  }
}