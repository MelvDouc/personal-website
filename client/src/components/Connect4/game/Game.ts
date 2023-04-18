import { Observable } from "reactfree-jsx";
import getWinningLine from "./get-winning-line.js";
import BoardDimensions from "./BoardDimensions.js";
import Player, { Checker } from "./Player.js";
import { Coords as Coordinates } from "@types";

export default class Game {
  private static readonly EMPTY_BOARD = Array.from({ length: BoardDimensions.HEIGHT }, () => {
    return Array(BoardDimensions.WIDTH).fill(0);
  }) as Checker[][];

  private readonly playerObs: Obs<Player>;
  private readonly boardObs: Obs<Checker[][]>;
  private readonly winningIndicesObs: Obs<Set<number> | null>;
  private readonly addedCoords: Coordinates[];

  constructor() {
    this.playerObs = new Observable();
    this.boardObs = new Observable();
    this.winningIndicesObs = new Observable();
    this.addedCoords = [];
    this.restart();
  }

  public get activePlayer(): Player {
    return this.playerObs.value;
  }

  public get board(): Checker[][] {
    return this.boardObs.value;
  }

  /**
   * @returns Whether the checker was added to the column.
   */
  private trySettingChecker(y: number): boolean {
    for (let x = BoardDimensions.HEIGHT - 1; x >= 0; x--) {
      if (this.boardObs.value[x][y] === 0) {
        this.boardObs.value[x][y] = this.playerObs.value;
        this.addedCoords.push({ x, y });
        this.boardObs.notify();
        return true;
      }
    }

    return false;
  }

  public setChecker(y: number): void {
    if (this.winningIndicesObs.value || !this.trySettingChecker(y))
      return;

    const winningLine = getWinningLine(this.board, this.activePlayer, this.addedCoords.at(-1)!);

    if (winningLine) {
      this.winningIndicesObs.value = winningLine;
      return;
    }

    this.playerObs.value = -this.playerObs.value;
  }

  public onPlayerChange(subscription: (player: Player) => void): void {
    this.playerObs.subscribe(subscription);
  }

  public onBoardChange(subscription: (board: Checker[][]) => void): void {
    this.boardObs.subscribe(subscription);
  }

  public onResultChange(subscription: (winningIndices: Set<number> | null) => void): void {
    this.winningIndicesObs.subscribe(subscription);
  }

  public undoLastMove(): void {
    const lastAddedCoords = this.addedCoords.pop();

    if (lastAddedCoords) {
      this.boardObs.value[lastAddedCoords.x][lastAddedCoords.y] = 0;
      this.boardObs.notify();
      if (this.winningIndicesObs.value)
        this.winningIndicesObs.value = null;
      else
        this.playerObs.value = -this.playerObs.value;
    }
  }

  public restart(): void {
    this.playerObs.value = Player.RED;
    this.boardObs.value = structuredClone(Game.EMPTY_BOARD);
    this.winningIndicesObs.value = null;
    this.addedCoords.length = 0;
  }
}