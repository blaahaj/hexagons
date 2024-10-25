import faceColourEffects from "./faceColours";
import faceContentEffects from "./faceContent";
import cellMoveEffects from "./cellMove";
import coinTumbleEffects from "./coinTumble";
import cellCompoundFunctions from "./compound";
import type { CellTransformationFunction } from "./core";
import { suddenlyBees } from "./special";

const effects: readonly CellTransformationFunction[] = [
  // ...faceColourEffects,
  // ...faceContentEffects,
  ...coinTumbleEffects,
  // ...cellMoveEffects,
  // ...cellCompoundFunctions,
  // suddenlyBees,
];

export default effects;
