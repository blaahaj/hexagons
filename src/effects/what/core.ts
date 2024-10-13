import type { Cell } from "../../core/cell";

export type CellTransformationFunction = (
  cells: readonly Cell[]
) => (cell: Cell) => void;

export const compound =
  (
    ...transformations: CellTransformationFunction[]
  ): CellTransformationFunction =>
  (cells: readonly Cell[]) => {
    const fns = transformations.map(t => t(cells));
    return item => {
      fns.forEach(fn => {
        fn(item);
      });
    };
  };
