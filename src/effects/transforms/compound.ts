import { Cell } from "../../core/cell";

import * as col from "./color";
import * as con from "./content";
import * as rot from "./rotations";
import { CellTransformationFunction } from "./index";

type F = CellTransformationFunction;

const compound =
  (...transformations: F[]): F =>
  (cells: ReadonlyArray<Cell>) => {
    const fns = transformations.map(t => t(cells));
    return item => {
      fns.forEach(fn => fn(item));
    };
  };

export default [
  compound(col.transformMakeSingleRandomColor, rot.transformSingleRotateAll),
  compound(con.transformSymbolsFromWord, rot.transformIndependentMakeWonky),
  compound(con.transformSymbolsFromWord, rot.transformSingleRotateX),
  compound(
    con.transformSymbolsFromWord,
    rot.transformSingleRotateAll,
    col.transformNRandomColors
  ),
] as const;
