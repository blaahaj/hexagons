import { Cell } from "./cell";
import { CellPosition } from "./cellPosition";
import {
  mapNeighbours,
  neighboursOfPosition,
  type Neighbours,
} from "./neighbours";

export class CellArray {
  private readonly index: Record<string, Cell[]> = {};

  public static from(cells: Iterable<Cell>): CellArray {
    const array = new CellArray();
    for (const cell of cells) {
      array.add(cell);
    }
    return array;
  }

  constructor() {}

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
  public cellAt(pos: CellPosition): Cell | undefined {
    return (this.index[pos.toKey()] ||= [])[0];
  }

  // All cells in the queue
  public cellsAt(pos: CellPosition): ReadonlyArray<Cell> {
    return (this.index[pos.toKey()] ||= []);
  }

  public neighboursOf(pos: CellPosition): Neighbours<Cell | undefined> {
    return mapNeighbours(neighboursOfPosition(pos), npos => this.cellAt(npos));
  }
}
