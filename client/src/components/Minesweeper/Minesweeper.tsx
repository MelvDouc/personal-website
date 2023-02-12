import { Observable } from "reactfree-jsx";
import { randomInt } from "../../utils/random.js";
import Cell from "./Cell.jsx";
import "./Minesweeper.scss";

const ROWS = 10;
const COLS = 10;
const NUMBER_OF_MINES = 3;

export default function Minesweeper() {
  const numberOfCells = ROWS * COLS;
  const numberOfMines = NUMBER_OF_MINES;
  const mineIndices = getMineIndices(numberOfCells, numberOfMines);
  const gameState = new Observable({
    coveredMinesCount: numberOfCells,
    flagIndices: new Set<number>()
  });
  const canFlag = () => gameState.getValue().flagIndices.size < numberOfMines;

  return (
    <div className="minesweeper">
      {Array.from({ length: ROWS * COLS }, (_, index) => (
        <Cell
          state={(() => {
            const cellState = new Observable<MinesweeperCellState>({
              index,
              covered: true,
              flagged: false,
              canFlag,
              mined: mineIndices.has(index)
            });
            cellState.subscribe(({ covered, flagged }) => {
              gameState.updateValue(prev => {
                if (!covered) prev.coveredMinesCount--;
                flagged ? prev.flagIndices.add(index) : prev.flagIndices.delete(index);
                return prev;
              });
            });
            return cellState;
          })()}
        />
      ))}
    </div>
  );
}

function getMineIndices(numberOfCells: number, numberOfMines: number): Set<number> {
  const mineIndices = new Set<number>();

  while (mineIndices.size < numberOfMines) {
    mineIndices.add(randomInt(0, numberOfCells - 1));
  }

  return mineIndices;
}
