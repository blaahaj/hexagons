import { CellArray } from "./cellArray";
import { CellPosition } from "./cellPosition";
import { Hexagon } from "./hexagon";
import type { Neighbours } from "./neighbours";

export class Cell {
  constructor(
    private pos: CellPosition,
    public readonly hexagon: Hexagon,
    public readonly cell: HTMLDivElement,
    public readonly cellArray: CellArray
  ) {
    cellArray.add(this);
    this.position = pos;
  }

  get position(): CellPosition {
    return this.pos;
  }

  set position(pos: CellPosition) {
    this.cellArray.remove(this);

    this.pos = pos;
    this.cell.setAttribute(
      "style",
      `--cell-y: ${pos.y}; --cell-x: ${pos.x}; --cell-x-mod-2: ${pos.x % 2};`
    );

    this.cellArray.add(this);
  }

  public neighbours(): Neighbours<Cell | undefined> {
    return this.cellArray.neighboursOf(this.pos);
  }
}
