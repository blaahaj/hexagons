import faceColourEffects from "./faceColours";
import faceContentEffects, {
  transformIndependentRandomSymbols,
} from "./faceContent";
import cellMoveEffects from "./cellMove";
import coinTumbleEffects, { transformIndependentRotateAll } from "./coinTumble";
import cellCompoundFunctions from "./compound";
import { compound, type CellTransformationFunction } from "./core";
import { suddenlyBees, suddenlyHarald } from "./special";

const effects: readonly CellTransformationFunction[] = [
  // ...faceColourEffects,
  // ...faceContentEffects,
  // ...coinTumbleEffects,
  // ...cellMoveEffects,
  // ...cellCompoundFunctions,
  // suddenlyBees,
  suddenlyHarald,
  compound(transformIndependentRandomSymbols, transformIndependentRotateAll),
];

export default effects;
