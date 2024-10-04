import cellColourFunctions from "./cellColourFunctions";
import cellContentFunctions from "./cellContentFunctions";
import cellRotationFunctions from "./cellRotationFunctions";
import cellCompoundFunctions from "./cellCompoundFunctions";
import { Cell } from "./distractions";

export type CellTransformationFunction = (
  cells: ReadonlyArray<Cell>
) => (cell: Cell) => void;

export default [
  ...cellColourFunctions,
  ...cellContentFunctions,
  ...cellRotationFunctions,
  ...cellCompoundFunctions,
] as const;
