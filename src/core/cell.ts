import { Grid } from "./grid";
import { Position } from "./position";
import { Coin } from "./coin";
import type { Neighbours } from "./neighbours";

export class Cell {
  public readonly coin: Coin;
  private readonly element: HTMLDivElement;

  public static create(pos: Position, grid: Grid) {
    const cell = new Cell(pos, grid);
    return { cell, element: cell.element };
  }

  protected constructor(
    private pos: Position,
    public readonly grid: Grid
  ) {
    this.element = document.createElement("div");
    this.element.className = "cell";

    this.coin = new Coin(this.element);

    grid.add(this);
    this.setPosition(pos, false);
  }

  get position(): Position {
    return this.pos;
  }

  public setPosition(pos: Position, transition: boolean): void {
    this.grid.remove(this);

    const transitionDuration = transition ? "var(--duration)" : "0s";
    this.pos = pos;

    this.element.setAttribute(
      "style",
      `--cell-y: ${pos.y}; --cell-x: ${pos.x}; --cell-x-mod-2: ${pos.x % 2}; transition-duration: ${transitionDuration};`
    );

    this.grid.add(this);
  }

  public get screenPosition() {
    return {
      top: this.element.offsetTop,
      left: this.element.offsetLeft,
      height: this.element.offsetHeight,
      width: this.element.offsetWidth,
    };
  }

  public neighbours(): Neighbours<Cell | undefined> {
    return this.grid.neighboursOf(this.pos);
  }
}
