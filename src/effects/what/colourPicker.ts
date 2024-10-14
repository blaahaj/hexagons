import { schemes } from "../../lib/colorSchemes";
import { generateRange } from "../../lib/generateRange";
import { randomElementFrom, randomColorPair } from "../../lib/randomThings";
import type { CellMapper } from "./core";

export type ColourFunction = CellMapper<ReturnType<typeof randomColorPair>>;

export const singleRandomColor: ColourFunction = () => {
  const pair = randomColorPair();
  return () => pair;
};

export const independentRandomColors: ColourFunction = () => () =>
  randomColorPair();

export const nRandomColors: ColourFunction = () => {
  const colorPairs = [...generateRange(Math.random() * 4 + 2)].map(() =>
    randomColorPair()
  );
  return () => randomElementFrom(colorPairs);
};

export const fromColorScheme: ColourFunction = () => {
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

  return cell => {
    const n = Math.random() * totalWeight;
    const entry = entries.find(e => n >= e.start && n < e.end);

    return {
      fg: cell.coin.visibleFace.parts.middle.color,
      bg: entry!.color,
    };
  };
};

export const pickers = [
  singleRandomColor,
  independentRandomColors,
  nRandomColors,
  fromColorScheme,
];
