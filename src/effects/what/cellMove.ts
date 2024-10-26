import { Cell, type CellGeometry } from "../../core/cell";
import { Position } from "../../core/position";
import { randomElementFrom } from "../../lib/randomThings";
import {
  mapNeighbours,
  NeighbourDirections,
  neighboursOfPosition,
} from "../../core/neighbours";
import type { CellTransformationFunction } from "./core";

export const swapRandomPairsViaTranslate: CellTransformationFunction =
  cells => {
    const copy = [...cells];
    const moves: { cell: Cell; newPosition: Position }[] = [];

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

      move.cell.setPosition(move.newPosition, true);
    };
  };

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
  const direction = randomElementFrom(NeighbourDirections);
  const moves: { cell: Cell; newPosition: Position; visible: boolean }[] = [];
  const boundary = cells[0].grid.boundary;
  const homeless: Cell[] = [];
  const unfilled = cells.map(cell => cell.position);

  for (const cell of cells) {
    const to = neighboursOfPosition(cell.position)[direction];

    if (to.x >= 0 && to.y >= 0 && to.x <= boundary!.x && to.y <= boundary!.y) {
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
  const direction = NeighbourDirections[directionNumber];
  const moves: { cell: Cell; newPosition: Position; visible: boolean }[] = [];
  const boundary = cells[0].grid.boundary;
  const homeless: Cell[] = [];
  const unfilled = cells.map(cell => cell.position);

  for (const cell of cells) {
    const to = neighboursOfPosition(cell.position)[direction];

    if (to.x >= 0 && to.y >= 0 && to.x <= boundary!.x && to.y <= boundary!.y) {
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

  return cell => {
    const move = moves.find(m => m.cell === cell);
    if (!move) throw new Error("No move");

    const orig = move.cell.geometry;

    const tmpGeometry: CellGeometry = {
      ...orig,
      positionAndMovement: {
        position: move.newPosition,
        movement: {
          spin: undefined,
          flip: { around: directionNumber * 2 + 6 },
        },
      },
      instantOrientation: {
        zeroPosition:
          (0 +
            2 * (directionNumber * 2 + 3) -
            orig.instantOrientation.zeroPosition) %
          12,
        reversed: !orig.instantOrientation.reversed,
      },
    };

    move.cell.setGeometry(tmpGeometry, false);

    setTimeout(() => {
      move.cell.setGeometry(
        {
          ...tmpGeometry,
          positionAndMovement: {
            ...tmpGeometry.positionAndMovement,
            movement: {
              spin: undefined,
              flip: undefined,
            },
          },
        },
        true
      );
    }, 50);
  };
};

const effects: readonly CellTransformationFunction[] = [
  // swapRandomPairsViaTranslate,
  // swapNeighbourPairsViaTranslate,
  // swapNeighbourTriosViaTranslate,
  moveEverythingViaTranslate,
  moveEverythingViaFlip,
];

export default effects;
