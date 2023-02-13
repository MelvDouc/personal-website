import SmallComponentWrapper from "../SmallComponentWrapper.jsx";
import MinesweeperCell from "./Cell.jsx";
import getMinesweeperHelpers from "./helpers.jsx";
import "./Minesweeper.scss";

export default function Minesweeper() {
  const ROWS = 10;
  const COLS = 10;
  const NUMBER_OF_MINES = 20;
  const cells: MinesweeperCell[][] = [];
  const { placeMines, uncover } = getMinesweeperHelpers({
    cells,
    numberOfRows: ROWS,
    numberOfCols: COLS,
    numberOfMines: NUMBER_OF_MINES
  });

  for (let x = 0; x < ROWS; x++) {
    cells[x] = [];
    for (let y = 0; y < COLS; y++) {
      cells[x][y] = (
        <MinesweeperCell x={x} y={y} placeMinesFn={placeMines} uncoverFn={uncover} />
      );
    }
  }

  return (
    <SmallComponentWrapper>
      <div className="minesweeper">{cells.flat(Infinity)}</div>
    </SmallComponentWrapper>
  );
}