import SmallComponentWrapper from "../SmallComponentWrapper.jsx";
import Food from "./Food.jsx";
import Snake from "./Snake.js";

export default function _SnakeCanvas() {
  return <SmallComponentWrapper>
    {new SnakeCanvas()}
  </SmallComponentWrapper>;
}

export class SnakeCanvas extends HTMLCanvasElement {
  public readonly squaresPerRow = 15;
  public readonly squaresPerCol = 15;
  public readonly squareSize = 40;
  public readonly snake: Snake;
  public readonly food: Food;
  public score = 0;
  private readonly steerSnake: (e: KeyboardEvent) => void;

  constructor() {
    super();
    this.width = this.squaresPerRow * this.squareSize;
    this.height = this.width;
    this.snake = new Snake(this);
    this.food = new Food(this);
    this.steerSnake = (e) => { console.log("steering"); this.snake.steer(e.key); };
  }

  connectedCallback() {
    document.addEventListener("keydown", this.steerSnake);
    this.playGame();
  }

  disconnectedCallback() {
    document.removeEventListener("keydown", this.steerSnake);
  }

  playGame() {
    const ctx = this.getContext("2d")!;
    const { width, squareSize, snake, food } = this;
    const abortController = new AbortController();

    setIntervalOnAnimationFrame(() => {
      ctx.fillStyle = "lightgreen";
      ctx.fillRect(0, 0, width, width);
      ctx.fillStyle = "white";
      ctx.font = "45px Verdana";
      ctx.fillText(`${this.score}`, width / 2 - squareSize / 2, width / 2);
      ctx.fillStyle = "purple";
      ctx.strokeStyle = "red";

      for (const { x, y } of snake) {
        ctx.fillRect(x, y, squareSize, squareSize);
        ctx.strokeRect(x, y, squareSize, squareSize);
      }

      ctx.drawImage(food.image, food.x, food.y, squareSize, squareSize);
      const newHead = snake.getNewHead();

      if (newHead.x === food.x && newHead.y === food.y) {
        this.score++;
        food.randomizeCoords();
      } else {
        snake.pop();
      }

      if (snake.isCollision(newHead))
        abortController.abort();

      snake.unshift(newHead);
    }, 100, abortController);
  }
}

customElements.define("snake-canvas", SnakeCanvas, { extends: "canvas" });





function setIntervalOnAnimationFrame(callback: VoidFunction, interval: number, abortController: AbortController): void {
  let prevTime = 0;
  let handle: number;
  abortController.signal.onabort = () => {
    cancelAnimationFrame(handle);
  };

  const animate = (time: number) => {
    handle = requestAnimationFrame(animate);

    if (time - prevTime < interval)
      return;

    prevTime = time;
    callback();
  };

  animate(interval);
}