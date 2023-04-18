import Player from "./game/Player.js";

export default function PlayerDisplay({ player, playerChangeFn }: {
  player: Player;
  playerChangeFn: (subscription: (player: Player) => void) => void;
}) {
  return (
    <div>
      <span $init={(e) => playerChangeFn((player) => e.innerText = playerDiscs[player])}>{playerDiscs[player]}</span>
      &nbsp;
      <span>to move</span>
    </div>
  );
}

const playerDiscs = {
  [Player.RED]: "🔴",
  [Player.YELLOW]: "🟡"
} as const;