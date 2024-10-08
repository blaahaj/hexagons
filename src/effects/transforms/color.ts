import { randomColorPair, randomElementFrom } from "../../lib/randomThings";
import { schemes } from "../../lib/colorSchemes";
import { CellTransformationFunction } from "./index";

type F = CellTransformationFunction;

export const transformMakeSingleRandomColor: F = () => {
  const colorPair = randomColorPair();
  return item => {
    item.hexagon.color = colorPair.bg;
    item.hexagon.parts.middle.color = colorPair.fg;
  };
};

export const transformIndependentRandomColors: F = () => item => {
  const colorPair = randomColorPair();
  item.hexagon.color = colorPair.bg;
  item.hexagon.parts.middle.color = colorPair.fg;
};

export const transformNRandomColors: F = () => {
  const colorPairs = [...Array(1 + Math.floor(Math.random() * 6))].map(() =>
    randomColorPair()
  );
  return item => {
    const colorPair = randomElementFrom(colorPairs);
    item.hexagon.color = colorPair.bg;
    item.hexagon.parts.middle.color = colorPair.fg;
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
    const entry = entries.filter(e => n >= e.start && n < e.end)[0];
    item.hexagon.color = entry.color;
  };
};

export default [
  transformMakeSingleRandomColor,
  transformIndependentRandomColors,
  transformNRandomColors,
  transformToRandomColorScheme,
] as const;
