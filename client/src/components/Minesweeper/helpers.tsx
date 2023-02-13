import { randomInt } from "../../utils/random.js";
import type MinesweeperCell from "./Cell.jsx";

const xOffsets = [-1, -1, -1, 0, 0, 1, 1, 1];
const yOffsets = [-1, 0, 1, -1, 1, -1, 0, 1];

function getMineIndices(numberOfCells: number, numberOfMines: number, excludedIndex: number): Set<number> {
  const mineIndices = new Set<number>([excludedIndex]);

  while (mineIndices.size < numberOfMines + 1) {
    mineIndices.add(randomInt(0, numberOfCells - 1));
  }

  mineIndices.delete(excludedIndex);
  return mineIndices;
}

function countAdjacentMines(cells: MinesweeperCell[][], numberOfRows: number, numberOfCols: number, x: number, y: number) {
  let adjacentMineCount = 0;

  for (let i = 0; i < xOffsets.length; i++) {
    const nextX = x + xOffsets[i];
    const nextY = y + yOffsets[i];
    if (nextX >= 0 && nextX < numberOfRows && nextY >= 0 && nextY < numberOfCols)
      if (cells[nextX][nextY].mined)
        adjacentMineCount++;
  }

  return adjacentMineCount;
}

function getPlaceMinesFn({ cells, numberOfRows, numberOfCols, numberOfMines }: {
  cells: MinesweeperCell[][];
  numberOfRows: number;
  numberOfCols: number;
  numberOfMines: number;
}) {
  return function placeMines(this: MinesweeperCell) {
    getMineIndices(numberOfRows * numberOfCols, numberOfMines, this.x * numberOfRows + this.y).forEach((i) => {
      cells[Math.floor(i / numberOfRows)][i % numberOfRows].mined = true;
    });
    cells.forEach((row) => {
      row.forEach((cell) => cell.removeEventListener("click", placeMines));
    });
  };
}

function getUncoverFn({ cells, numberOfRows, numberOfCols }: {
  cells: MinesweeperCell[][];
  numberOfRows: number;
  numberOfCols: number;
}) {
  return function uncover(this: MinesweeperCell, isFirstTime = true) {
    if (!this.covered || this.flagged || this.mined)
      return;

    this.covered = false;
    const adjacentMineCount = countAdjacentMines(cells, numberOfRows, numberOfCols, this.x, this.y);

    if (adjacentMineCount > 0) {
      this.innerText = String(adjacentMineCount);
      if (!isFirstTime)
        return;
    }

    for (let i = 0; i < xOffsets.length; i++) {
      const nextX = this.x + xOffsets[i];
      const nextY = this.y + yOffsets[i];
      if (nextX >= 0 && nextX < numberOfRows && nextY >= 0 && nextY < numberOfCols)
        uncover.apply(cells[nextX][nextY], [false]);
    }
  };
}

export default function getMinesweeperHelpers(gridInfo: Parameters<typeof getPlaceMinesFn>[0]) {
  return {
    placeMines: getPlaceMinesFn(gridInfo),
    uncover: getUncoverFn(gridInfo)
  };
}