import cellColourFunctions from "./cellColourFunctions";
import cellContentFunctions from "./cellContentFunctions";
import cellRotationFunctions from "./cellRotationFunctions";
import cellCompoundFunctions from "./cellCompoundFunctions";
import { Cell } from "./cell";
import { CellPosition } from "./cellPosition";
import { randomElementFrom } from "./lib/randomThings";
import {
  mapNeighbours,
  NeighbourDirections,
  neighboursOfPosition,
} from "./neighbours";

export type CellTransformationFunction = (
  cells: ReadonlyArray<Cell>
) => (cell: Cell) => void;

const swapRandomPairsViaTranslate: CellTransformationFunction = cells => {
  const copy = [...cells];
  const moves: { cell: Cell; newPosition: CellPosition }[] = [];

  while (copy.length > cells.length * 0.9 && copy.length >= 2) {
    let n = Math.floor(Math.random() * copy.length);
    const c0 = copy.splice(n, 1)[0];

    n = Math.floor(Math.random() * copy.length);
    const c1 = copy.splice(n, 1)[0];

    moves.push({ cell: c0, newPosition: c1.position });
    moves.push({ cell: c1, newPosition: c0.position });
  }

  return cell => {
    const move = moves.find(m => m.cell === cell);
    if (move === undefined) return;

    move.cell.position = move.newPosition;
  };
};

const swapNeighbourPairsViaTranslate: CellTransformationFunction = cells => {
  const copy = [...cells];
  const moves: { cell: Cell; newPosition: CellPosition }[] = [];

  while (copy.length > cells.length * 0.9 && copy.length >= 2) {
    let n = Math.floor(Math.random() * copy.length);
    const c0 = copy.splice(n, 1)[0];

    const neighbourCells = c0.neighbours();
    if (!neighbourCells) throw new Error("no array");

    const availableNeighbours = Object.values(neighbourCells).flatMap(c =>
      c ? [c] : []
    );
    if (availableNeighbours.length === 0) continue;

    const c1 = randomElementFrom(availableNeighbours);

    copy.splice(copy.indexOf(c1), 1);

    moves.push({ cell: c0, newPosition: c1.position });
    moves.push({ cell: c1, newPosition: c0.position });
  }

  return cell => {
    const move = moves.find(m => m.cell === cell);
    if (move === undefined) return;

    move.cell.position = move.newPosition;
  };
};

const swapNeighbourTriosViaTranslate: CellTransformationFunction = cells => {
  const copy = [...cells];
  const moves: { cell: Cell; newPosition: CellPosition }[] = [];

  while (copy.length > 0) {
    let n = Math.floor(Math.random() * copy.length);
    const c0 = copy.splice(n, 1)[0];

    const neighbourCells = c0.neighbours();
    if (!neighbourCells) throw new Error("no array");

    const availableNeighbours = mapNeighbours(neighbourCells, c =>
      c && copy.includes(c) ? c : undefined
    );

    const [k1, k2] = randomElementFrom([
      [NeighbourDirections[0], NeighbourDirections[1]],
      [NeighbourDirections[0], NeighbourDirections[5]],
      [NeighbourDirections[3], NeighbourDirections[2]],
      [NeighbourDirections[3], NeighbourDirections[4]],
    ]);

    const c1 = availableNeighbours[k1];
    const c2 = availableNeighbours[k2];
    if (!c1 || !c2) break; // FIXME: maybe an infinite loop

    copy.splice(copy.indexOf(c1), 1);
    copy.splice(copy.indexOf(c2), 1);

    moves.push({ cell: c0, newPosition: c1.position });
    moves.push({ cell: c1, newPosition: c2.position });
    moves.push({ cell: c2, newPosition: c0.position });
  }

  return cell => {
    const move = moves.find(m => m.cell === cell);
    if (move === undefined) return;

    move.cell.position = move.newPosition;
  };
};

export default [
  // ...cellColourFunctions,
  // ...cellContentFunctions,
  // ...cellRotationFunctions,
  // ...cellCompoundFunctions,
  swapRandomPairsViaTranslate,
  swapNeighbourPairsViaTranslate,
  swapNeighbourTriosViaTranslate,
] as const;
