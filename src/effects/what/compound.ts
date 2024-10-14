import * as col from "./faceColours";
import * as con from "./faceContent";
import * as rot from "./coinTumble";
import { moveEverythingViaTranslate } from "./cellMove";
import { compound, type CellTransformationFunction } from "./core";
import { nRandomColors, singleRandomColor } from "./colourPicker";

const effects: readonly CellTransformationFunction[] = [
  compound(
    col.setFaceAndContentColours(singleRandomColor),
    rot.transformSingleRotateAll
  ),
  compound(con.transformSymbolsFromWord, rot.transformSingleRotateX),
  compound(
    con.transformSymbolsFromWord,
    rot.transformSingleRotateAll,
    col.setFaceAndContentColours(nRandomColors)
  ),
  compound(moveEverythingViaTranslate, rot.transformSingleRotateZ),
  compound(moveEverythingViaTranslate, rot.transformSingleRotateAll),
  compound(moveEverythingViaTranslate, rot.transformIndependentRotateAll),
];

export default effects;
