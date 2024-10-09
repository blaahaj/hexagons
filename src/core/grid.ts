import { Cell } from "./cell";
import { Position } from "./position";
import {
  mapNeighbours,
  neighboursOfPosition,
  type Neighbours,
} from "./neighbours";

export class Grid {
  private readonly index: Record<string, Cell[] | undefined> = {};
  private _boundary: Position | undefined;

  public static from(cells: Iterable<Cell>): Grid {
    const array = new Grid();
    for (const cell of cells) {
      array.add(cell);
    }
    return array;
  }

  public set boundary(pos: Position) {
    this._boundary ||= pos;
  }

  public get boundary(): Position | undefined {
    return this._boundary;
  }

  // Push cell to its position's queue
  public add(cell: Cell): void {
    const key = cell.position.toKey();
    (this.index[key] ||= []).push(cell);
  }

  // Remove cell from the queue (usually but not always the bottom)
  public remove(cell: Cell): void {
    const pos = cell.position;
    const key = pos.toKey();
    const stack = (this.index[key] ||= []);

    const i = stack.indexOf(cell);
    if (i >= 0) stack.splice(i, 1);
  }

  // The cell at the head of the queue
  public cellAt(pos: Position): Cell | undefined {
    return (this.index[pos.toKey()] ||= [])[0];
  }

  // All cells in the queue
  public cellsAt(pos: Position): readonly Cell[] {
    return (this.index[pos.toKey()] ||= []);
  }

  public neighboursOf(pos: Position): Neighbours<Cell | undefined> {
    return mapNeighbours(neighboursOfPosition(pos), npos => this.cellAt(npos));
  }

  public cells(): readonly Cell[] {
    const out: Cell[] = [];

    for (const pos in this.index) {
      out.push(...(this.index[pos] ?? []));
    }

    return out;
  }
}
