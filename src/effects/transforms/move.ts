import { Cell } from "../../core/cell";
import { Position } from "../../core/position";
import { randomElementFrom } from "../../lib/randomThings";
import {
  mapNeighbours,
  NeighbourDirections,
  neighboursOfPosition,
} from "../../core/neighbours";
import type { CellTransformationFunction } from "./index";

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

      move.cell.position = move.newPosition;
    };
  };

export const swapNeighbourPairsViaTranslate: CellTransformationFunction =
  cells => {
    const copy = [...cells];
    const moves: { cell: Cell; newPosition: Position }[] = [];

    while (copy.length > cells.length * 0.9 && copy.length >= 2) {
      let n = Math.floor(Math.random() * copy.length);
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

      move.cell.position = move.newPosition;
    };
  };

export const swapNeighbourTriosViaTranslate: CellTransformationFunction =
  cells => {
    const copy = [...cells];
    const moves: { cell: Cell; newPosition: Position }[] = [];

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

export const moveEverythingViaTranslate: CellTransformationFunction = cells => {
  const direction = randomElementFrom(NeighbourDirections);
  const moves: { cell: Cell; newPosition: Position; visible: boolean }[] = [];
  const boundary = cells[0].grid.boundary;
  const homeless: Cell[] = [];
  const unfilled = cells.map(cell => cell.position);

  for (const cell of cells) {
    const to = neighboursOfPosition(cell.position)[direction];

    if (to.x >= 0 && to.y >= 0 && to.x <= boundary.x && to.y <= boundary.y) {
      moves.push({ cell, newPosition: to, visible: true });
      const idx = unfilled.findIndex(pos => pos.toKey() === to.toKey());
      if (idx !== undefined) unfilled.splice(idx, 1);
    } else {
      homeless.push(cell);
    }
  }

  if (homeless.length != unfilled.length) throw "Mismatch";

  for (const [idx, cell] of homeless.entries()) {
    const to = unfilled[idx];
    moves.push({ cell, newPosition: to, visible: false });
  }

  return cell => {
    const move = moves.find(m => m.cell === cell);
    if (!move) throw "No move";

    if (!move.visible) {
      cell.element.classList.add("no-animate");
      cell.position = move.newPosition;
      setTimeout(() => cell.element.classList.remove("no-animate"), 100);
    } else {
      cell.position = move.newPosition;
    }
  };
};

export default [
  // swapRandomPairsViaTranslate,
  // swapNeighbourPairsViaTranslate,
  // swapNeighbourTriosViaTranslate,
  moveEverythingViaTranslate,
] as const;
