import cellColourFunctions from "./cellColourFunctions";
import cellContentFunctions from "./cellContentFunctions";
import cellRotationFunctions from "./cellRotationFunctions";
import cellCompoundFunctions from "./cellCompoundFunctions";
import { Cell, CellPosition } from "./distractions";
import { randomElementFrom } from "./lib/randomThings";

export type CellTransformationFunction = (
  cells: ReadonlyArray<Cell>
) => (cell: Cell) => void;

const neighboursOf = (pos: CellPosition): Record<string, CellPosition> => ({
  kl00: { x: pos.x + 0, y: pos.y - 1 },
  kl02: { x: pos.x + 1, y: pos.y - 1 + (pos.x % 2) },
  kl04: { x: pos.x + 1, y: pos.y + 0 + (pos.x % 2) },
  kl06: { x: pos.x + 0, y: pos.y + 1 },
  kl08: { x: pos.x - 1, y: pos.y + 0 + (pos.x % 2) },
  kl10: { x: pos.x - 1, y: pos.y - 1 + (pos.x % 2) },
});

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

  const posToIndex = (position: CellPosition) =>
    position.x + cells.length * position.y;

  const indexByPosition = [] as Cell[];
  for (const cell of cells) {
    indexByPosition[posToIndex(cell.position)] = cell;
  }

  while (copy.length > cells.length * 0.9 && copy.length >= 2) {
    let n = Math.floor(Math.random() * copy.length);
    const c0 = copy.splice(n, 1)[0];

    const neighbourPositions = neighboursOf(c0.position);

    const neighbourCells: Record<string, Cell | undefined> = {};
    for (const [key, pos] of Object.entries(neighbourPositions)) {
      const cell = indexByPosition[posToIndex(pos)];
      neighbourCells[key] = cell;
    }

    const availableNeighbours = Object.values(neighbourCells).filter(Boolean);
    const c1 = randomElementFrom(availableNeighbours);

    copy.splice(copy.indexOf(c1), 1);
    delete indexByPosition[posToIndex(c0.position)];
    delete indexByPosition[posToIndex(c1.position)];

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

  const posToIndex = (position: CellPosition) =>
    position.x + cells.length * position.y;

  const indexByPosition = [] as Cell[];
  for (const cell of cells) {
    indexByPosition[posToIndex(cell.position)] = cell;
  }

  while (copy.length > 0) {
    let n = Math.floor(Math.random() * copy.length);
    const c0 = copy.splice(n, 1)[0];

    const neighbourPositions = neighboursOf(c0.position);

    const neighbourCells: Record<string, Cell | undefined> = {};
    for (const [key, pos] of Object.entries(neighbourPositions)) {
      const cell = indexByPosition[posToIndex(pos)];
      neighbourCells[key] = cell;
    }

    const [k1, k2] = randomElementFrom([
      ["kl00", "kl02"],
      ["kl00", "kl10"],
      ["kl06", "kl04"],
      ["kl06", "kl08"],
    ]);

    const c1 = neighbourCells[k1];
    const c2 = neighbourCells[k2];
    if (!c1 || !c2) break; // FIXME: maybe an infinite loop

    copy.splice(copy.indexOf(c1), 1);
    copy.splice(copy.indexOf(c2), 1);
    delete indexByPosition[posToIndex(c0.position)];
    delete indexByPosition[posToIndex(c1.position)];
    delete indexByPosition[posToIndex(c2.position)];

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
  ...cellColourFunctions,
  ...cellContentFunctions,
  ...cellRotationFunctions,
  ...cellCompoundFunctions,
  swapRandomPairsViaTranslate,
  swapNeighbourPairsViaTranslate,
  swapNeighbourTriosViaTranslate,
] as const;
