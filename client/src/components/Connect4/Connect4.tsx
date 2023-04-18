import SmallComponentWrapper from "@components/SmallComponentWrapper/SmallComponentWrapper.jsx";
import Board from "@components/Connect4/Board.js";
import PlayerDisplay from "@components/Connect4/PlayerDisplay.js";
import Game from "@components/Connect4/game/Game.js";

export default function Connect4() {
  const game = new Game();

  return (
    <SmallComponentWrapper>
      <PlayerDisplay
        player={game.activePlayer}
        playerChangeFn={(subscription) => game.onPlayerChange(subscription)}
      />
      <Board game={game} />
      <div>
        <button classNames={["btn", "btn-primary"]} onclick={() => game.undoLastMove()}>&larr;</button>
        <button classNames={["btn", "btn-primary"]} onclick={() => game.restart()}>New Game</button>
      </div>
    </SmallComponentWrapper>
  );
}