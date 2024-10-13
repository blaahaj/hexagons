import faceColourEffects from "./faceColours";
import faceContentEffects from "./faceContent";
import cellMoveEffects from "./cellMove";
import coinTumbleEffects from "./coinTumble";
import cellCompoundFunctions from "./compound";

export default [
  ...faceColourEffects,
  ...faceContentEffects,
  ...coinTumbleEffects,
  ...cellMoveEffects,
  ...cellCompoundFunctions,
] as const;
