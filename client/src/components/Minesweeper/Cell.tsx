export default function Cell({ state: cellState }: { state: Obs<MinesweeperCellState> }) {
  return (
    <div
      className="minesweeper-cell"
      $init={element => {
        element.dataset.covered = "1";
        cellState.subscribe(({ covered, flagged }) => {
          if (!covered) element.dataset.covered = "0";
          element.dataset.flagged = String(Number(flagged));
        });
      }}
      onclick={() => {
        cellState.updateValue(prev => ((prev.covered = false), prev));
      }}
      oncontextmenu={e => {
        e.preventDefault();
        cellState.updateValue(prev => {
          if (prev.covered && (prev.canFlag() || prev.flagged)) {
            prev.flagged = !prev.flagged;
          }
          return prev;
        });
      }}
    ></div>
  );
}
