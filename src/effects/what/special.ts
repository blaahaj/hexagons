import { CellTransformationFunction, compound } from "./core";
import { flipAll, transformSingleRotateAll } from "./coinTumble";
import harald from "./harald";
import type { RotateDegrees } from "../../core/coin";
import { randomElementFrom } from "../../lib/randomThings";

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
      const log: string[] = [];

      const cellOrientation = cell.geometry.instantOrientation;

      const newCoinRotation: RotateDegrees = {
        x: 180 - cell.coin.rotateDegrees.x,
        y: cell.coin.rotateDegrees.y,
        z: randomElementFrom([0, 60, 120, 180, 240, 300]),
      };
      log.push(JSON.stringify(newCoinRotation));

      const hiddenFace = cell.coin.hiddenFace;
      const rect = cell.screenPosition;
      const isBackface = hiddenFace === cell.coin.backFace;

      // Where does kl12 (position 0) on the face actually end up, on screen?
      // relative to the hidden face:
      let topDegrees = 0;
      log.push(`topDegrees=${topDegrees}`);

      // relative to the visible face: still zero.

      // Relative to the cell:
      // Apply coin tumble: Z, Y, X
      topDegrees = (topDegrees + newCoinRotation.z) % 360;
      log.push(`topDegrees=${topDegrees}`);

      if (newCoinRotation.y % 360 !== 0) topDegrees = (360 - topDegrees) % 360;
      log.push(`topDegrees=${topDegrees}`);

      if (newCoinRotation.x % 360 !== 0) topDegrees = (180 - topDegrees) % 360;
      log.push(`topDegrees=${topDegrees}`);

      // Relative to the grid:
      if (cellOrientation.reversed) topDegrees = (360 - topDegrees) % 360;
      log.push(`topDegrees=${topDegrees}`);

      topDegrees = (topDegrees + cellOrientation.zeroPosition * 30) % 360;
      log.push(`topDegrees=${topDegrees}`);

      const contentTransform: string[] = [];

      contentTransform.push(`rotateZ(${-topDegrees}deg)`);

      return [
        cell,
        {
          newCoinRotation,
          hiddenFace,
          rect,
          topDegrees,
          isBackface,
          log,
          contentTransform: contentTransform.join(" "),
        },
      ];
    })
  );

  return cell => {
    const move = moves.get(cell);
    if (!move) return;

    const div = `<div style="
      position: absolute;
      display: block;
      width: calc(1 * var(--hex-short-radius));
      height: calc(1 * var(--hex-short-radius));
      left: calc(var(--hex-long-radius) - 0.5 * var(--hex-short-radius));
      top: calc(-0.5 * var(--hex-short-radius));
      transform-origin: center center;
      transform: ${move.contentTransform};
    ">${harald()}</div>`;

    move.hiddenFace.parts.top.setText("oh haj!", false);
    move.hiddenFace.parts.middle.setText(div, false);
    move.hiddenFace.parts.bottom.setText("", false);
    //   `bf=${move.isBackface} rx=${move.newCoinRotation.x} ry=${move.newCoinRotation.y} rz=${move.newCoinRotation.z} or=${cell.geometry.instantOrientation.reversed} zpos=${cell.geometry.instantOrientation.zeroPosition} top=${move.topDegrees} log=${move.log.join("\n")}`,
    //   false
    // );

    move.hiddenFace.setColor(randomWaterColor(), false);
    cell.coin.setRotation(move.newCoinRotation, true);
  };
};
