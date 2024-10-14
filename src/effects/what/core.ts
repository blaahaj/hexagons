import type { Cell } from "../../core/cell";

export type CellMapper<T> = (cells: readonly Cell[]) => (cell: Cell) => T;

export type CellTransformationFunction = CellMapper<void>;

export const compound =
  (
    ...transformations: CellTransformationFunction[]
  ): CellTransformationFunction =>
  (cells: readonly Cell[]) => {
    const fns = transformations.map(t => t(cells));

    return cell => {
      fns.forEach(fn => {
        fn(cell);
      });
    };
  };
