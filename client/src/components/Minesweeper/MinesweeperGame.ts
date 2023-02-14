import { Observable } from "reactfree-jsx";
import { randomInt } from "../../utils/random.js";
import displayAlterBox from "../AlertBox/AlertBox.jsx";
import MinesweeperCell from "./MinesweeperCell.jsx";

export default class MinesweeperGame {
  static readonly #xOffsets = [-1, -1, -1, 0, 0, 1, 1, 1];
  static readonly #yOffsets = [-1, 0, 1, -1, 1, -1, 0, 1];

  readonly #numberOfRows: number;
  readonly #numberOfCols: number;
  readonly #numberOfMines: number;
  readonly #cells: MinesweeperCell[][];
  readonly #flagCountObs: Observable<number>;
  #minedIndices!: Set<number>;
  #isOver = false;

  constructor({ numberOfRows, numberOfCols, numberOfMines }: {
    numberOfRows: number;
    numberOfCols: number;
    numberOfMines: number;
  }) {
    this.#numberOfRows = numberOfRows;
    this.#numberOfCols = numberOfCols;
    this.#numberOfMines = numberOfMines;
    this.#cells = Array.from({ length: numberOfRows }, (_, x) => {
      return Array.from({ length: numberOfCols }, (_, y) => {
        return new MinesweeperCell({ x, y, game: this });
      });
    });
    this.#flagCountObs = new Observable(numberOfMines);

    this.#flagCountObs.subscribe(() => {
      if (this.isWin())
        this.#setWin();
    });
  }

  get areMinesPlaced(): boolean {
    return this.#minedIndices?.size > 0;
  }

  get cells(): MinesweeperCell[][] {
    return this.#cells;
  }

  get flagCount(): number {
    return this.#flagCountObs.getValue();
  }

  set flagCount(value: number) {
    this.#flagCountObs.setValue(value);
  }

  get isOver(): boolean {
    return this.#isOver;
  }

  get numberOfRows(): number {
    return this.#numberOfRows;
  }

  *#adjacentCells(x: number, y: number): Generator<MinesweeperCell> {
    for (let i = 0; i < MinesweeperGame.#xOffsets.length; i++) {
      const nextX = x + MinesweeperGame.#xOffsets[i];
      const nextY = y + MinesweeperGame.#yOffsets[i];
      if (this.#isSafe(nextX, nextY))
        yield this.#cells[nextX][nextY];
    }
  }

  #isCellMined(cell: MinesweeperCell): boolean {
    return this.#minedIndices.has(cell.index);
  }

  #isSafe(x: number, y: number): boolean {
    return x >= 0 && x < this.#numberOfRows && y >= 0 && y < this.#numberOfCols;
  }

  #setLoss(): void {
    this.#cells.forEach((row) => {
      row.forEach((cell) => {
        cell.covered = false;
        cell.flagged = false;
        if (this.#isCellMined(cell))
          cell.revealMine();
      });
    });
    displayAlterBox({
      message: "Boom!"
    });
    this.#isOver = true;
  }

  #setWin(): void {
    displayAlterBox({
      message: "You win!"
    });
    this.#isOver = true;
  }

  countAdjacentMines(x: number, y: number): number {
    let count = 0;

    for (const cell of this.#adjacentCells(x, y))
      if (this.#isCellMined(cell))
        count++;

    return count;
  }

  isWin(): boolean {
    return this.flagCount === 0 && this.#cells.every((row) => {
      return row.every((cell) => {
        return this.#isCellMined(cell) ? cell.flagged : !cell.covered;
      });
    });
  }

  placeMines(excludedIndex: number): void {
    const minedIndices = new Set<number>([excludedIndex]);
    const numberOfCells = this.#numberOfRows * this.#numberOfCols;

    while (minedIndices.size < this.#numberOfMines + 1) {
      minedIndices.add(randomInt(0, numberOfCells - 1));
    }

    minedIndices.delete(excludedIndex);
    this.#minedIndices = minedIndices;
  }

  reset(): void {
    this.#flagCountObs.setValue(this.#numberOfMines);
    this.#minedIndices.clear();
    this.#cells.forEach((row) => {
      row.forEach((cell) => cell.reset());
    });
    this.#isOver = false;
  }

  toggleFlag(cell: MinesweeperCell): void {
    if (cell.flagged) {
      cell.flagged = false;
      this.flagCount++;
      return;
    }
    if (this.flagCount > 0) {
      cell.flagged = true;
      this.flagCount--;
    }
  }

  uncover(cell: MinesweeperCell, isFirstTime: boolean): void {
    cell.covered = false;

    if (this.#isCellMined(cell) && isFirstTime) {
      this.#setLoss();
      return;
    }

    const adjacentMineCount = this.countAdjacentMines(cell.x, cell.y);

    if (adjacentMineCount > 0)
      cell.innerText = String(adjacentMineCount);

    if (this.isWin()) {
      this.#setWin();
      return;
    }

    if (adjacentMineCount > 0 && !isFirstTime)
      return;

    for (const peer of this.#adjacentCells(cell.x, cell.y))
      if (peer.canBeUncovered() && !this.#isCellMined(peer))
        this.uncover(peer, false);
  }
}