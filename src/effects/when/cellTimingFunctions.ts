import { Cell } from "../../core/cell";
import { Position } from "../../core/position";
import { randomElementFrom } from "../../lib/randomThings";

export type CellTimingFunction = (
  cells: readonly Cell[]
) => (cell: Cell) => number;

export const timingZero: CellTimingFunction = () => () => 0;

export const timingRandom: CellTimingFunction = () => () => Math.random();

export const timingRadial: CellTimingFunction = () => {
  const originX = Math.random() * document.body.clientWidth;
  const originY = Math.random() * document.body.clientHeight;
  const scale = randomElementFrom([+1, -1]);
  return item => {
    const pos = item.screenPosition;
    return (
      Math.sqrt((originX - pos.left) ** 2 + (originY - pos.top) ** 2) * scale
    );
  };
};

export const timingClock: CellTimingFunction = () => {
  const originX = Math.random() * document.body.clientWidth;
  const originY = Math.random() * document.body.clientHeight;
  const scale = randomElementFrom([+1, -1]);
  const start = Math.random() * 2;
  return item => {
    const pos = item.screenPosition;
    const dx = originX - pos.left;
    const dy = originY - pos.top;
    let angle = Math.atan2(dy, dx) / Math.PI + 1; // range: (0, 2)
    if (angle < start) angle += 2;

    return angle * scale;
  };
};

export const timingWipeCentreLine: CellTimingFunction = () => {
  const isUpAndDown = randomElementFrom([true, false]);
  const direction = randomElementFrom([+1, -1]);

  const container = document.getElementById("hexagon-container")!;
  const half = container[isUpAndDown ? "clientHeight" : "clientWidth"] / 2;

  return item => {
    const pos = item.screenPosition;
    return (
      Math.abs(
        (isUpAndDown ? pos.top : pos.left) +
          (isUpAndDown ? pos.height : pos.width) / 2 -
          half
      ) * direction
    );
  };
};

export const timingSpiral: CellTimingFunction = () => {
  const center = Position.at(0, 0);
  const euclideanCenter = center.toEuclidean();

  // Imperfect. Not sure why.
  return cell => {
    const e = cell.position.toEuclidean().offsetFrom(euclideanCenter);
    const angle = e.angle();
    let distance = e.distance();
    distance = Math.max(distance - 1.5, 0);
    return distance + (angle + Math.PI) / (Math.PI * 2);
  };
};

export default [
  timingZero,
  timingRandom,
  timingRadial,
  timingWipeCentreLine,
  timingSpiral,
] as const;
