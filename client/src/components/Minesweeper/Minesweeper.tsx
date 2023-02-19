import SmallComponentWrapper from "../SmallComponentWrapper.jsx";
import "./Minesweeper.scss";
import MinesweeperGame from "./MinesweeperGame.js";

export default function Minesweeper() {
  const game = new MinesweeperGame({
    numberOfRows: 10,
    numberOfCols: 10,
    numberOfMines: 20
  });

  return (
    <SmallComponentWrapper>
      <div className="d-flex flex-column justify-content-center align-items-center gap-2 w-100">
        <div className="minesweeper">{game.cells.flat()}</div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary" onclick={() => game.reset()}>New Game</button>
        </div>
      </div>
    </SmallComponentWrapper>
  );
}