import SmallComponentWrapper from "@components/SmallComponentWrapper/SmallComponentWrapper.jsx";
import Board from "@components/Connect4/Board.js";
import PlayerDisplay from "@components/Connect4/PlayerDisplay.js";
import Game from "@components/Connect4/game/Game.js";
import cssClasses from "@components/Connect4/Connect4.module.scss";

export default function Connect4() {
  const game = new Game();

  return (
    <SmallComponentWrapper>
      <div className={cssClasses.connect4}>
        <PlayerDisplay
          player={game.activePlayer}
          playerChangeFn={(subscription) => game.onPlayerChange(subscription)}
        />
        <Board game={game} />
        <div className={cssClasses.connect4Buttons}>
          <button classNames={["btn", "btn-primary"]} onclick={() => game.undoLastMove()}>&larr;</button>
          <button classNames={["btn", "btn-primary"]} onclick={() => game.restart()}>New Game</button>
        </div>
      </div>
    </SmallComponentWrapper>
  );
}