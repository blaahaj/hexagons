import { Cell } from "./distractions";
import { randomElementFrom } from "./lib/randomThings";

export type CellTimingFunction = () => (cell: Cell) => number;

export const timingZero: CellTimingFunction = () => () => 0;

export const timingRandom: CellTimingFunction = () => () => Math.random();

export const timingRadial: CellTimingFunction = () => {
  const originX = Math.random() * document.body.clientWidth;
  const originY = Math.random() * document.body.clientHeight;
  const scale = randomElementFrom([+1, -1]);
  return (item) =>
    Math.sqrt(
      (originX - item.cell.offsetTop) ** 2 +
        (originY - item.cell.offsetLeft) ** 2
    ) * scale;
};

export default [timingZero, timingRandom, timingRadial];
