import { Cell } from "./distractions";

import * as col from "./cellColourFunctions";
import * as con from "./cellContentFunctions";
import * as rot from "./cellRotationFunctions";
import { CellTransformationFunction } from "./cellTransformationFunctions";

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
