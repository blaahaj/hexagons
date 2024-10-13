import { Grid } from "./grid";
import { Position } from "./position";
import { Coin } from "./coin";
import type { Neighbours } from "./neighbours";

export class Cell {
  public readonly element: HTMLDivElement;

  constructor(
    private pos: Position,
    public readonly coin: Coin,
    public readonly grid: Grid
  ) {
    const element = document.createElement("div");
    element.className = "cell";
    element.appendChild(coin.element);

    this.element = element;
    grid.add(this);
    this.position = pos;
  }

  get position(): Position {
    return this.pos;
  }

  set position(pos: Position) {
    this.grid.remove(this);

    this.pos = pos;
    this.element.setAttribute(
      "style",
      `--cell-y: ${pos.y}; --cell-x: ${pos.x}; --cell-x-mod-2: ${pos.x % 2};`
    );

    this.grid.add(this);
  }

  public neighbours(): Neighbours<Cell | undefined> {
    return this.grid.neighboursOf(this.pos);
  }
}
