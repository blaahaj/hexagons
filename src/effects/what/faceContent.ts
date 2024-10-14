import { CellTransformationFunction } from "./core";
import { Cell } from "../../core/cell";
import { randomElementFrom, randomSymbol } from "../../lib/randomThings";
import { generateRange } from "../../lib/generateRange";

type F = CellTransformationFunction;

export const transformSingleRandomSymbol: F = () => {
  const symbol = randomSymbol();
  return (item: Cell) => {
    const texts = typeof symbol === "string" ? ["", symbol, ""] : symbol;
    item.coin.visibleFace.parts.top.setText(texts[0], true);
    item.coin.visibleFace.parts.middle.setText(texts[1], true);
    item.coin.visibleFace.parts.bottom.setText(texts[2], true);
  };
};

export const transformIndependentRandomSymbols: F = () => item => {
  const symbol = randomSymbol();
  const texts = typeof symbol === "string" ? ["", symbol, ""] : symbol;
  item.coin.visibleFace.parts.top.setText(texts[0], true);
  item.coin.visibleFace.parts.middle.setText(texts[1], true);
  item.coin.visibleFace.parts.bottom.setText(texts[2], true);
};

export const transformNRandomSymbols: F = () => {
  const symbols = [...generateRange(Math.random() * 6)].map(() =>
    randomSymbol()
  );
  return (item: Cell) => {
    const symbol = randomElementFrom(symbols);
    const texts = typeof symbol === "string" ? ["", symbol, ""] : symbol;
    item.coin.visibleFace.parts.top.setText(texts[0], true);
    item.coin.visibleFace.parts.middle.setText(texts[1], true);
    item.coin.visibleFace.parts.bottom.setText(texts[2], true);
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
  return (item: Cell) => {
    item.coin.visibleFace.parts.top.setText("", true);
    item.coin.visibleFace.parts.middle.setText(
      randomElementFrom(symbols),
      true
    );
    item.coin.visibleFace.parts.bottom.setText("", true);
  };
};

const effects: readonly CellTransformationFunction[] = [
  transformSingleRandomSymbol,
  transformIndependentRandomSymbols,
  transformNRandomSymbols,
  transformSymbolsFromWord,
];

export default effects;
