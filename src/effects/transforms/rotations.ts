import { type CellTransformationFunction } from "./index";
import { Cell } from "../../core/cell";
import { randomElementFrom } from "../../lib/randomThings";

type F = CellTransformationFunction;

export const transformSingleRotateAll: F = () => {
  const degX = randomElementFrom([0, 180]);
  const degY = randomElementFrom([0, 180]);
  const degZ = randomElementFrom([0, 60, 120, 180, 240]);
  return item => {
    item.hexagon.rX.style.transform = `rotateX(${degX}deg)`;
    item.hexagon.rY.style.transform = `rotateY(${degY}deg)`;
    item.hexagon.rZ.style.transform = `rotateZ(${degZ}deg)`;
  };
};

export const transformSingleRotateX: F = cells => {
  const seen: Record<string, number> = {};

  for (const cell of cells) {
    const m = cell.hexagon.rX.style.transform.match(/rotateX\((.*)deg\)/);
    const degrees = m?.[1] ?? "0";
    seen[degrees] = (seen[degrees] ?? 0) + 1;
  }

  const variants = Object.keys(seen);

  if (variants.length === 1) {
    // Currently all the same; to avoid a no-op, flip them all
    const degX = 180 - parseInt(variants[0]);
    return item => {
      item.hexagon.rX.style.transform = `rotateX(${degX}deg)`;
    };
  }

  // 2 variants: all 0 or 180. do one of: 0, 180, or flip
  // > 2 variants: wonky. Do one of: 0, 180, or flip (retaining wonkiness)
  // same code either way

  if (Math.random() < 1 / 3) {
    // Flip, retaining wonkiness (if any)
    return item => {
      const m = item.hexagon.rX.style.transform.match(/rotateX\((.*)deg\)/);
      const existing = parseFloat(m?.[1] ?? "0");
      let degX = 180 - existing;
      item.hexagon.rX.style.transform = `rotateX(${degX}deg)`;
    };
  } else {
    const degX = randomElementFrom([0, 180]);
    return item => {
      item.hexagon.rX.style.transform = `rotateX(${degX}deg)`;
    };
  }
};

export const transformSingleRotateY: F = () => {
  const degY = randomElementFrom([0, 180]);
  return item => {
    item.hexagon.rY.style.transform = `rotateY(${degY}deg)`;
  };
};

export const transformSingleRotateZ: F = () => {
  const degZ = randomElementFrom([0, 60, 120, 180, 240]);
  return item => {
    item.hexagon.rZ.style.transform = `rotateZ(${degZ}deg)`;
  };
};

export const transformIndependentRotateAll: F = () => {
  return (item: Cell) => {
    const degX = randomElementFrom([0, 180]);
    const degY = randomElementFrom([0, 180]);
    const degZ = randomElementFrom([0, 60, 120, 180, 240]);
    item.hexagon.rX.style.transform = `rotateX(${degX}deg)`;
    item.hexagon.rY.style.transform = `rotateY(${degY}deg)`;
    item.hexagon.rZ.style.transform = `rotateZ(${degZ}deg)`;
  };
};

export const transformIndependentMakeWonky: F = () => {
  return (item: Cell) => {
    const degX = Math.random() * 10 - 5;
    const degY = Math.random() * 10 - 5;
    const degZ = Math.random() * 10 - 5;
    item.hexagon.rX.style.transform = `rotateX(${degX}deg)`;
    item.hexagon.rY.style.transform = `rotateY(${degY}deg)`;
    item.hexagon.rZ.style.transform = `rotateZ(${degZ}deg)`;
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
