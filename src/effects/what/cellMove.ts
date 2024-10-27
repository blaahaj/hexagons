import {
  Cell,
  type CellGeometry,
  type CellMovement,
  type Orientation,
} from "../../core/cell";
import { Position } from "../../core/position";
import { randomElementFrom } from "../../lib/randomThings";
import {
  mapNeighbours,
  NeighbourDirections,
  neighboursOfPosition,
} from "../../core/neighbours";
import type { CellTransformationFunction } from "./core";

export const swapNeighbourPairsViaTranslate: CellTransformationFunction =
  cells => {
    const copy = [...cells];
    const moves: { cell: Cell; newPosition: Position }[] = [];

    while (copy.length > cells.length * 0.9 && copy.length >= 2) {
      const n = Math.floor(Math.random() * copy.length);
      const c0 = copy.splice(n, 1)[0];

      const neighbourCells = c0.neighbours();

      const availableNeighbours = Object.values(neighbourCells)
        .flatMap(c => (c ? [c] : []))
        .filter(c => copy.includes(c));

      if (availableNeighbours.length === 0) {
        copy.push(c0);
        continue;
      }

      const c1 = randomElementFrom(availableNeighbours);

      copy.splice(copy.indexOf(c1), 1);

      moves.push({ cell: c0, newPosition: c1.position });
      moves.push({ cell: c1, newPosition: c0.position });
    }

    return cell => {
      const move = moves.find(m => m.cell === cell);
      if (move === undefined) return;

      move.cell.setGeometry(
        {
          ...move.cell.geometry,
          positionAndMovement: {
            ...cell.geometry.positionAndMovement,
            position: move.newPosition,
          },
        },
        true
      );
    };
  };

export const swapNeighbourTriosViaTranslate: CellTransformationFunction =
  cells => {
    const copy = [...cells];
    const moves: { cell: Cell; newPosition: Position }[] = [];

    while (copy.length > 0) {
      const n = Math.floor(Math.random() * copy.length);
      const c0 = copy.splice(n, 1)[0];

      const neighbourCells = c0.neighbours();

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

      move.cell.setGeometry(
        {
          ...move.cell.geometry,
          positionAndMovement: {
            ...cell.geometry.positionAndMovement,
            position: move.newPosition,
          },
        },
        true
      );
    };
  };

export const moveEverythingViaTranslate: CellTransformationFunction = cells => {
  const directionNumber = Math.floor(Math.random() * 6);
  const moves = prepareMoves(cells, NeighbourDirections[directionNumber]);

  return cell => {
    const move = moves.find(m => m.cell === cell);
    if (!move) throw new Error("No move");

    move.cell.setGeometry(
      {
        ...move.cell.geometry,
        positionAndMovement: {
          ...cell.geometry.positionAndMovement,
          position: move.newPosition,
        },
      },
      move.visible
    );
  };
};

export const moveEverythingViaFlip: CellTransformationFunction = cells => {
  const directionNumber = Math.floor(Math.random() * 6);
  const moves = prepareMoves(cells, NeighbourDirections[directionNumber]);

  return cell => {
    const move = moves.find(m => m.cell === cell);
    if (!move) throw new Error("No move");

    moveViaIntermediateGeometry2(
      cell,
      move.newPosition,
      {
        zeroPosition:
          (0 +
            2 * (directionNumber * 2 + 3) -
            cell.geometry.instantOrientation.zeroPosition) %
          12,
        reversed: !cell.geometry.instantOrientation.reversed,
      },
      {
        spin: undefined,
        flip: { around: directionNumber * 2 + 6 },
      },
      move.visible
    );
  };
};

export const moveEverythingViaSpin: CellTransformationFunction = cells => {
  const directionNumber = Math.floor(Math.random() * 6);
  const sign = randomElementFrom([-1, +1]);
  const moves = prepareMoves(cells, NeighbourDirections[directionNumber]);

  return cell => {
    const move = moves.find(m => m.cell === cell);
    if (!move) throw new Error("No move");

    moveViaIntermediateGeometry2(
      cell,
      move.newPosition,
      {
        ...cell.geometry.instantOrientation,
        zeroPosition:
          (cell.geometry.instantOrientation.zeroPosition + 12 + 4 * sign) % 12,
      },
      {
        spin: {
          around: (directionNumber * 2 + 6 - sign) % 12,
          degrees: -120 * sign,
        },
        flip: undefined,
      },
      move.visible
    );
  };
};

const moveViaIntermediateGeometry2 = (
  cell: Cell,
  newPosition: Position,
  newOrientation: Orientation,
  viaMovement: CellMovement,
  transition: boolean
) => {
  const [intermediate, final] = [
    viaMovement,
    { spin: undefined, flip: undefined },
  ].map(
    (movement: CellMovement): CellGeometry => ({
      ...cell.geometry,
      positionAndMovement: {
        position: newPosition,
        movement,
      },
      instantOrientation: newOrientation,
    })
  );

  if (transition) {
    cell.setGeometry(intermediate, false);

    setTimeout(() => {
      cell.setGeometry(final, true);
    }, 50);
  } else {
    cell.setGeometry(final, false);
  }
};

interface Move {
  cell: Cell;
  newPosition: Position;
  visible: boolean;
}

const prepareMoves = (
  cells: readonly Cell[],
  direction: NeighbourDirections
): Move[] => {
  const moves: Move[] = [];
  const boundary = cells[0].grid.boundary!;
  const homeless: Cell[] = [];
  const unfilled = cells.map(cell => cell.position);

  for (const cell of cells) {
    const to = neighboursOfPosition(cell.position)[direction];

    if (
      to.x >= boundary[0].x &&
      to.y >= boundary[0].y &&
      to.x <= boundary[1].x &&
      to.y <= boundary[1].y
    ) {
      moves.push({ cell, newPosition: to, visible: true });
      const idx = unfilled.findIndex(pos => pos.toKey() === to.toKey());
      if (idx >= 0) unfilled.splice(idx, 1);
    } else {
      homeless.push(cell);
    }
  }

  if (homeless.length != unfilled.length) throw new Error("Mismatch");

  for (const [idx, cell] of homeless.entries()) {
    const to = unfilled[idx];
    moves.push({ cell, newPosition: to, visible: false });
  }

  return moves;
};

const effects: readonly CellTransformationFunction[] = [
  // swapNeighbourPairsViaTranslate,
  // swapNeighbourTriosViaTranslate,
  moveEverythingViaTranslate,
  moveEverythingViaFlip,
  moveEverythingViaSpin,
];

export default effects;
