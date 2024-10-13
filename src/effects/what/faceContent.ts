import { CellTransformationFunction } from "./core";
import { Cell } from "../../core/cell";
import { randomElementFrom, randomSymbol } from "../../lib/randomThings";
import { generateRange } from "../../lib/generateRange";

type F = CellTransformationFunction;

export const transformSingleRandomSymbol: F = () => {
  const symbol = randomSymbol();
  return (item: Cell) => (item.coin.visibleFace.parts.middle.text = symbol);
};

export const transformIndependentRandomSymbols: F = () => item =>
  (item.coin.visibleFace.parts.middle.text = randomSymbol());

export const transformNRandomSymbols: F = () => {
  const symbols = [...generateRange(Math.random() * 6)].map(() =>
    randomSymbol()
  );
  return (item: Cell) => {
    item.coin.visibleFace.parts.middle.text = randomElementFrom(symbols);
  };
};

export const transformSymbolsFromWord: F = () => {
  const word = randomElementFrom([
    "BLÅHAJ",
    "BLåHAj",
    "BLAAHAJ",
    "BLaAHAj",
    "HEXAGON",
    "HeXAgON",
  ]);
  const symbols = word.split(/([A-Z][a-z]?)/g).filter(t => t !== "");
  return (item: Cell) =>
    (item.coin.visibleFace.parts.middle.text = randomElementFrom(symbols));
};

const effects: readonly CellTransformationFunction[] = [
  transformSingleRandomSymbol,
  transformIndependentRandomSymbols,
  transformNRandomSymbols,
  transformSymbolsFromWord,
];

export default effects;
