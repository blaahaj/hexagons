import { Cell } from "../../core/cell";
import { randomElementFrom } from "../../lib/randomThings";

export type CellTimingFunction = (
  cells: ReadonlyArray<Cell>
) => (cell: Cell) => number;

export const timingZero: CellTimingFunction = () => () => 0;

export const timingRandom: CellTimingFunction = () => () => Math.random();

export const timingRadial: CellTimingFunction = () => {
  const originX = Math.random() * document.body.clientWidth;
  const originY = Math.random() * document.body.clientHeight;
  const scale = randomElementFrom([+1, -1]);
  return item =>
    Math.sqrt(
      (originX - item.element.offsetLeft) ** 2 +
        (originY - item.element.offsetTop) ** 2
    ) * scale;
};

export const timingClock: CellTimingFunction = () => {
  const originX = Math.random() * document.body.clientWidth;
  const originY = Math.random() * document.body.clientHeight;
  const scale = randomElementFrom([+1, -1]);
  const start = Math.random() * 2;
  return item => {
    const dx = originX - item.element.offsetLeft;
    const dy = originY - item.element.offsetTop;
    let angle = Math.atan2(dy, dx) / Math.PI + 1; // range: (0, 2)
    if (angle < start) angle += 2;

    return angle * scale;
  };
};

export const wipeCentreLine: CellTimingFunction = cells => {
  const isUpAndDown = randomElementFrom([true, false]);
  const direction = randomElementFrom([+1, -1]);

  const half =
    cells[0].element.parentElement![
      isUpAndDown ? "clientHeight" : "clientWidth"
    ] / 2;

  return item =>
    Math.abs(
      item.element[isUpAndDown ? "offsetTop" : "offsetLeft"] +
        item.element[isUpAndDown ? "offsetHeight" : "offsetWidth"] / 2 -
        half
    ) * direction;
};

export default [
  timingZero,
  timingRandom,
  timingRadial,
  wipeCentreLine,
] as const;
