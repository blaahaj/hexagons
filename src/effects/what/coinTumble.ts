import { type CellTransformationFunction } from "./core";
import { Cell } from "../../core/cell";
import { randomElementFrom } from "../../lib/randomThings";

type F = CellTransformationFunction;

export const transformSingleRotateAll: F = () => {
  const degX = randomElementFrom([0, 180]);
  const degY = randomElementFrom([0, 180]);
  const degZ = randomElementFrom([0, 60, 120, 180, 240]);
  return item => {
    item.coin.rotateDegrees = { x: degX, y: degY, z: degZ };
  };
};

export const transformSingleRotateX: F = cells => {
  const seen: Record<string, number> = {};

  for (const cell of cells) {
    const key = cell.coin.rotateDegrees.x.toString();
    seen[key] = (seen[key] ?? 0) + 1;
  }

  const variants = Object.keys(seen);

  if (variants.length === 1) {
    // Currently all the same; to avoid a no-op, flip them all
    const to = 180 - cells[0].coin.rotateDegrees.x;

    return item => {
      item.coin.rotateDegrees = {
        ...item.coin.rotateDegrees,
        x: to,
      };
    };
  }

  // 2 variants: all 0 or 180. do one of: 0, 180, or flip
  // > 2 variants: wonky. Do one of: 0, 180, or flip (retaining wonkiness)
  // same code either way

  if (Math.random() < 1 / 3) {
    // Flip, retaining wonkiness (if any)
    return item => {
      item.coin.rotateDegrees = {
        ...item.coin.rotateDegrees,
        x: 180 - item.coin.rotateDegrees.x,
      };
    };
  } else {
    const degX = randomElementFrom([0, 180]);
    return item => {
      item.coin.rotateDegrees = {
        ...item.coin.rotateDegrees,
        x: degX,
      };
    };
  }
};

export const transformSingleRotateY: F = () => {
  const degY = randomElementFrom([0, 180]);
  return item => {
    item.coin.rotateDegrees = {
      ...item.coin.rotateDegrees,
      y: degY,
    };
  };
};

export const transformSingleRotateZ: F = () => {
  const degZ = randomElementFrom([0, 60, 120, 180, 240]);
  return item => {
    item.coin.rotateDegrees = {
      ...item.coin.rotateDegrees,
      z: degZ,
    };
  };
};

export const transformIndependentRotateAll: F = () => {
  return (item: Cell) => {
    const degX = randomElementFrom([0, 180]);
    const degY = randomElementFrom([0, 180]);
    const degZ = randomElementFrom([0, 60, 120, 180, 240]);
    item.coin.rotateDegrees = { x: degX, y: degY, z: degZ };
  };
};

export const transformIndependentMakeWonky: F = () => {
  return (item: Cell) => {
    const degX = Math.random() * 10 - 5;
    const degY = Math.random() * 10 - 5;
    const degZ = Math.random() * 10 - 5;
    item.coin.rotateDegrees = { x: degX, y: degY, z: degZ };
  };
};

export default [
  transformSingleRotateAll,
  transformSingleRotateAll,
  transformSingleRotateAll,
  transformSingleRotateX,
  transformSingleRotateY,
  transformSingleRotateZ,
  transformIndependentRotateAll,
  // transformIndependentMakeWonky,
] as const;
