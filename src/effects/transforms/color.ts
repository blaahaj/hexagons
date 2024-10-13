import { randomColorPair, randomElementFrom } from "../../lib/randomThings";
import { schemes } from "../../lib/colorSchemes";
import { generateRange } from "../../lib/generateRange";
import { CellTransformationFunction } from "./index";

type F = CellTransformationFunction;

export const transformMakeSingleRandomColor: F = () => {
  const colorPair = randomColorPair();
  return item => {
    item.coin.visibleFace.color = colorPair.bg;
    item.coin.visibleFace.parts.middle.color = colorPair.fg;
  };
};

export const transformIndependentRandomColors: F = () => item => {
  const colorPair = randomColorPair();
  item.coin.visibleFace.color = colorPair.bg;
  item.coin.visibleFace.parts.middle.color = colorPair.fg;
};

export const transformNRandomColors: F = () => {
  const colorPairs = [...generateRange(Math.random() * 6)].map(() =>
    randomColorPair()
  );
  return item => {
    const colorPair = randomElementFrom(colorPairs);
    item.coin.visibleFace.color = colorPair.bg;
    item.coin.visibleFace.parts.middle.color = colorPair.fg;
  };
};

export const transformToRandomColorScheme: F = () => {
  const scheme = randomElementFrom(Object.values(schemes));

  const { out: entries, next: totalWeight } = Object.entries(
    scheme.weightedColors
  ).reduce(
    (prev, [color, weight]) => ({
      out: [
        ...prev.out,
        {
          color,
          weight,
          start: prev.next,
          end: prev.next + weight,
        },
      ],
      next: prev.next + weight,
    }),
    {
      out: [] as {
        color: string;
        weight: number;
        start: number;
        end: number;
      }[],
      next: 0,
    }
  );

  return item => {
    const n = Math.random() * totalWeight;
    const entry = entries.find(e => n >= e.start && n < e.end);
    item.coin.visibleFace.color = entry!.color;
  };
};

export default [
  transformMakeSingleRandomColor,
  transformIndependentRandomColors,
  transformNRandomColors,
  transformToRandomColorScheme,
] as const;
