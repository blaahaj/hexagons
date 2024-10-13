import { CellTransformationFunction } from "./core";
import { maybeTransition } from "../../lib/maybeTransition";
import { type ColourFunction } from "./colourPicker";
import * as picker from "./colourPicker";

export type F = CellTransformationFunction;

export const setFaceAndContentColours =
  (colourFn: ColourFunction, visible = true, transition = true): F =>
  cells => {
    const cellColourMapper = colourFn(cells);

    const faceMap = new Map(
      cells.map(cell => [
        cell,
        visible ? cell.coin.visibleFace : cell.coin.hiddenFace,
      ])
    );

    return cell => {
      const face = faceMap.get(cell);
      const colorPair = cellColourMapper(cell);
      face!.setColor(colorPair.bg, transition);

      // FIXME: the foreground colour always transitions (never immediate)
      maybeTransition(
        transition,
        face!.parts.middle.element,
        () => (face!.parts.middle.color = colorPair.fg)
      );
    };
  };

const effects: readonly CellTransformationFunction[] = [
  setFaceAndContentColours(picker.singleRandomColor),
  setFaceAndContentColours(picker.independentRandomColors),
  setFaceAndContentColours(picker.nRandomColors),
  setFaceAndContentColours(picker.fromColorScheme),
];

export default effects;
