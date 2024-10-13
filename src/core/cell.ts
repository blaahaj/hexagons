import { Grid } from "./grid";
import { Position } from "./position";
import { Coin } from "./coin";
import type { Neighbours } from "./neighbours";
import { maybeTransition } from "../lib/maybeTransition";

export class Cell {
  protected readonly element: HTMLDivElement;

  public static create(pos: Position, coin: Coin, grid: Grid) {
    const cell = new Cell(pos, coin, grid);
    return { cell, element: cell.element };
  }

  protected constructor(
    private pos: Position,
    public readonly coin: Coin,
    public readonly grid: Grid
  ) {
    const element = document.createElement("div");
    element.className = "cell";
    element.appendChild(coin.element);

    this.element = element;
    grid.add(this);
    this.setPosition(pos, false);
  }

  get position(): Position {
    return this.pos;
  }

  public setPosition(pos: Position, transition: boolean): void {
    this.grid.remove(this);

    this.pos = pos;

    maybeTransition(transition, this.element, () => {
      this.element.setAttribute(
        "style",
        `--cell-y: ${pos.y}; --cell-x: ${pos.x}; --cell-x-mod-2: ${pos.x % 2};`
      );
    });

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
