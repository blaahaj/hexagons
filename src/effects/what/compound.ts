import * as col from "./faceColours";
import * as con from "./faceContent";
import * as rot from "./coinTumble";
import { moveEverythingViaTranslate } from "./cellMove";
import { compound } from "./core";

export default [
  compound(col.transformMakeSingleRandomColor, rot.transformSingleRotateAll),
  // compound(con.transformSymbolsFromWord, rot.transformIndependentMakeWonky),
  compound(con.transformSymbolsFromWord, rot.transformSingleRotateX),
  compound(
    con.transformSymbolsFromWord,
    rot.transformSingleRotateAll,
    col.transformNRandomColors
  ),
  compound(moveEverythingViaTranslate, rot.transformSingleRotateZ),
  compound(moveEverythingViaTranslate, rot.transformSingleRotateAll),
  compound(moveEverythingViaTranslate, rot.transformIndependentRotateAll),
] as const;
