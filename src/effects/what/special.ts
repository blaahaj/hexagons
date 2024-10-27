import { CellTransformationFunction, compound } from "./core";
import { flipAll, transformSingleRotateAll } from "./coinTumble";
import harald from "./harald";
import type { RotateDegrees } from "../../core/coin";
import { randomElementFrom } from "../../lib/randomThings";
import { moveEverythingViaFlip } from "./cellMove";
import type { Cell, Orientation } from "../../core/cell";
import type { Face } from "../../core/face";

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
  flipAll(undefined, undefined),
  transformSingleRotateAll
);

const randomWaterColor = () => {
  const hue = 215 + Math.floor(Math.random() * 20);
  const saturation = 60 + Math.floor(Math.random() * 30);
  const lightness = 30 + Math.floor(Math.random() * 30);

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

// Basic Harald
//   const div = `<div style="
//   position: relative;
//   display: block;
//   width: calc(2 * var(--hex-long-radius));
//   top: calc(-1 * var(--hex-short-radius));
//   height: calc(2 * var(--hex-short-radius));
// ">${harald()}</div>`;

/*

    border: 1px solid red;
      position: absolute;
      display: block;
      width: calc(2 * var(--hex-long-radius));
      height: calc(2 * var(--hex-short-radius));
top: calc(-0.7  * var(--hex-short-radius));
      transform-origin: center center;
      transform: scale(0.8) rotateZ(180deg);
    */

export const suddenlyHarald: CellTransformationFunction = cells => {
  const moves = new Map(
    cells.map(cell => {
      const cellOrientation = cell.geometry.instantOrientation;

      const chosenAxis = randomElementFrom(["x", "y"] as const);

      const coinRotation: RotateDegrees = {
        ...cell.coin.rotateDegrees,
        [chosenAxis]: 180 - cell.coin.rotateDegrees[chosenAxis],
        z: randomElementFrom([0, 60, 120, 180, 240, 300]),
      };

      return [
        cell,
        {
          cellOrientation,
          coinRotation,
          face: cell.coin.hiddenFace,
        },
      ];
    })
  );

  return cell => {
    const move = moves.get(cell);
    if (!move) return;

    // Prepare first, then rotate
    prepareHarald(cell, move.cellOrientation, move.coinRotation, move.face);
    cell.coin.setRotation(move.coinRotation, true);
  };
};

export const suddenlyHarald2: CellTransformationFunction = cells => {
  const flip = moveEverythingViaFlip(cells);

  return cell => {
    flip(cell);

    // And now prepare the soon-to-be-visible face, just in time
    const cellOrientation = cell.geometry.instantOrientation;
    const coinRotation = cell.coin.rotateDegrees;
    const face = cell.coin.visibleFace; // or at least, it will be soon

    prepareHarald(cell, cellOrientation, coinRotation, face);
  };
};

const prepareHarald = (
  cell: Cell,
  cellOrientation: Orientation,
  coinRotation: RotateDegrees,
  face: Face
) => {
  // Where does kl12 (position 0) on the face actually end up, on screen?
  // relative to the hidden face:
  let topDegrees = 0;

  // relative to the visible face: kl12 on the front
  // face is always in the same place as kl12 on the back face.
  // So no transformation necessary.

  // Relative to the cell:
  // Apply coin tumble: Z, Y, X (in that order)
  topDegrees = (topDegrees + coinRotation.z) % 360;
  if (coinRotation.y % 360 !== 0) topDegrees = (360 - topDegrees) % 360;
  if (coinRotation.x % 360 !== 0) topDegrees = (180 - topDegrees) % 360;

  // Relative to the grid:
  if (cellOrientation.reversed) topDegrees = (360 - topDegrees) % 360;

  topDegrees = (topDegrees + cellOrientation.zeroPosition * 30) % 360;

  const contentTransform: string[] = [];

  contentTransform.push(`scale(15)`);
  contentTransform.push(`translate(
        calc(${cell.position.x} * -1.5 * var(--hex-long-radius) * var(--hexagon-spacing)),
         calc(${cell.position.y + (Math.abs(cell.position.x) % 2) / 2} * -2 * var(--hex-short-radius) * var(--hexagon-spacing)  )
         )`);
  contentTransform.push(`rotateZ(${-topDegrees}deg)`);

  const div = `<div style="
      position: absolute;
      display: block;
      width: calc(1 * var(--hex-short-radius));
      height: calc(1 * var(--hex-short-radius));
      left: calc(var(--hex-long-radius) - 0.5 * var(--hex-short-radius));
      top: calc(-0.5 * var(--hex-short-radius));
      transform-origin: center center;
      transform: ${contentTransform.reverse().join(" ")};
    ">${harald()}</div>`;

  face.setColor(randomWaterColor(), false);

  face.parts.top.setText("", false);
  face.parts.middle.setText(div, false);
  face.parts.bottom.setText("", false);
};

const effects: readonly CellTransformationFunction[] = [
  cells =>
    randomElementFrom([suddenlyBees, suddenlyHarald, suddenlyHarald2])(cells),
];

export default effects;
