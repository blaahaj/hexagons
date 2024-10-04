import { Cell } from "./distractions";
import { randomElementFrom } from "./lib/randomThings";

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
      (originX - item.cell.offsetLeft) ** 2 +
        (originY - item.cell.offsetTop) ** 2
    ) * scale;
};

export const timingClock: CellTimingFunction = () => {
  const originX = Math.random() * document.body.clientWidth;
  const originY = Math.random() * document.body.clientHeight;
  const scale = randomElementFrom([+1, -1]);
  const start = Math.random() * 2;
  return item => {
    const dx = originX - item.cell.offsetLeft;
    const dy = originY - item.cell.offsetTop;
    let angle = Math.atan2(dy, dx) / Math.PI + 1; // range: (0, 2)
    if (angle < start) angle += 2;

    return angle * scale;
  };
};

export default [timingZero, timingRandom, timingRadial, timingClock];
