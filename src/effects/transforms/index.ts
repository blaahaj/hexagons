import cellColourFunctions from "./color";
import cellContentFunctions from "./content";
import cellMoveFunctions from "./move";
import cellRotationFunctions from "./rotations";
import cellCompoundFunctions from "./compound";
import { Cell } from "../../core/cell";

export type CellTransformationFunction = (
  cells: readonly Cell[]
) => (cell: Cell) => void;

export default [
  ...cellColourFunctions,
  ...cellContentFunctions,
  ...cellRotationFunctions,
  ...cellMoveFunctions,
  ...cellCompoundFunctions,
] as const;
