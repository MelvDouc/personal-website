export default class MinesweeperCell extends HTMLElement {
  readonly #x: number;
  readonly #y: number;
  #mined = false;

  constructor({ x, y, placeMinesFn, uncoverFn }: {
    x: number;
    y: number;
    placeMinesFn(this: MinesweeperCell): void;
    uncoverFn(this: MinesweeperCell): void;
  }) {
    super();
    this.#x = x;
    this.#y = y;
    this.covered = true;

    this.addEventListener("click", placeMinesFn);
    this.addEventListener("click", uncoverFn);
    this.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  }

  get x(): number {
    return this.#x;
  }

  get y(): number {
    return this.#y;
  }

  get covered(): boolean {
    return this.dataset.covered === "1";
  }

  set covered(covered: boolean) {
    this.dataset.covered = covered ? "1" : "0";
  }

  get flagged(): boolean {
    return this.dataset.flagged === "1";
  }

  set flagged(flagged: boolean) {
    this.dataset.flagged = flagged ? "1" : "0";
  }

  get mined(): boolean {
    return this.#mined;
  }

  set mined(mined: boolean) {
    this.#mined = mined;
  }
}

customElements.define("minesweeper-cell", MinesweeperCell);
