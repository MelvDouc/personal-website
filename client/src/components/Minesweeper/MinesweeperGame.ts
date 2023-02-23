import { Observable } from "reactfree-jsx";
import { adjacentCoords, coordsToIndex } from "../../utils/coords.js";
import { randomInt } from "../../utils/random.js";
import displayAlterBox from "../AlertBox/AlertBox.jsx";
import MinesweeperCell from "./MinesweeperCell.jsx";

export default class MinesweeperGame {
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

  #isMineAtIndex(index: number): boolean {
    return this.#minedIndices.has(index);
  }

  #setLoss(): void {
    this.#cells.forEach((row) => {
      row.forEach((cell) => {
        cell.covered = false;
        cell.flagged = false;
        if (this.#isMineAtIndex(cell.index))
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

    for (const coords of adjacentCoords(x, y, this.#numberOfRows, this.#numberOfCols))
      if (this.#isMineAtIndex(coordsToIndex(coords.x, coords.y, this.#numberOfRows)))
        count++;

    return count;
  }

  isWin(): boolean {
    return this.flagCount === 0 && this.#cells.every((row) => {
      return row.every((cell) => {
        return this.#isMineAtIndex(cell.index) ? cell.flagged : !cell.covered;
      });
    });
  }

  placeMines(excludedIndex: number): void {
    this.#minedIndices = new Set<number>([excludedIndex]);
    const numberOfCells = this.#numberOfRows * this.#numberOfCols;

    while (this.#minedIndices.size < this.#numberOfMines + 1) {
      this.#minedIndices.add(randomInt(0, numberOfCells - 1));
    }

    this.#minedIndices.delete(excludedIndex);
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

  uncover(cell: MinesweeperCell, isFirstTime = true, visitedIndices = new Set<number>()): void {
    cell.covered = false;

    if (this.#isMineAtIndex(cell.index)) {
      this.#setLoss();
      return;
    }

    visitedIndices.add(cell.index);
    const adjacentMineCount = this.countAdjacentMines(cell.x, cell.y);

    if (adjacentMineCount > 0)
      cell.innerText = String(adjacentMineCount);

    if (this.isWin()) {
      this.#setWin();
      return;
    }

    if (adjacentMineCount > 0 && !isFirstTime)
      return;

    for (const coords of adjacentCoords(cell.x, cell.y, this.#numberOfRows, this.#numberOfCols)) {
      const peer = this.#cells[coords.x][coords.y];
      if (!visitedIndices.has(peer.index) && peer.canBeUncovered() && !this.#isMineAtIndex(peer.index))
        this.uncover(peer, false, visitedIndices);
    }
  }
}