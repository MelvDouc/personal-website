import Player from "./game/Player.js";

export default function PlayerDisplay({ player, playerChangeFn }: {
  player: Player;
  playerChangeFn: (subscription: (player: Player) => void) => void;
}) {
  return (
    <div
      $init={(element) => {
        playerChangeFn((player) => element.innerText = getText(player));
      }}
    >{getText(player)}</div>
  );
}

const playerDiscs = {
  [Player.RED]: "🔴",
  [Player.YELLOW]: "🟡"
} as const;

function getText(player: Player) {
  return `${playerDiscs[player]} to move`;
}