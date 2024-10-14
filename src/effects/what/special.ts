import { CellTransformationFunction, compound } from "./core";
import { flipAll } from "./coinTumble";

const fillWithBees: CellTransformationFunction = () => cell => {
  cell.coin.hiddenFace.parts.top.setText("", false);
  cell.coin.hiddenFace.parts.middle.setText("🐝", false);
  cell.coin.hiddenFace.parts.bottom.setText("", false);
};

const randomHoneyColor = () => {
  const hue = 35 + Math.floor(Math.random() * 20);
  const saturation = 70 + Math.floor(Math.random() * 30);
  const lightness = 50 + Math.floor(Math.random() * 30);

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

const setHoneyColors: CellTransformationFunction = () => cell => {
  cell.coin.hiddenFace.setColor(randomHoneyColor(), false);
};

export const suddenlyBees: CellTransformationFunction = compound(
  fillWithBees,
  setHoneyColors,
  flipAll(undefined, undefined)
);
