import { CellTransformationFunction } from "./cellTransformationFunctions";
import { Cell } from "./cell";
import { randomElementFrom, randomSymbol } from "./lib/randomThings";

type F = CellTransformationFunction;

export const transformSingleRandomSymbol: F = () => {
  const symbol = randomSymbol();
  return (item: Cell) => (item.hexagon.parts.middle.text = symbol);
};

export const transformIndependentRandomSymbols: F = () => item =>
  (item.hexagon.parts.middle.text = randomSymbol());

export const transformNRandomSymbols: F = () => {
  const symbols = [...Array(1 + Math.floor(Math.random() * 6))].map(() =>
    randomSymbol()
  );
  return (item: Cell) => {
    item.hexagon.parts.middle.text = randomElementFrom(symbols);
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
    (item.hexagon.parts.middle.text = randomElementFrom(symbols));
};

export default [
  transformSingleRandomSymbol,
  transformIndependentRandomSymbols,
  transformNRandomSymbols,
  transformSymbolsFromWord,
] as const;
