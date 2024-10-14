import { type CellTransformationFunction } from "./core";
import { Cell } from "../../core/cell";
import { randomElementFrom } from "../../lib/randomThings";

type F = CellTransformationFunction;

export const transformSingleRotateAll: F = () => {
  const degX = randomElementFrom([0, 180]);
  const degY = randomElementFrom([0, 180]);
  const degZ = randomElementFrom([0, 60, 120, 180, 240]);
  return item => {
    item.coin.setRotation({ x: degX, y: degY, z: degZ }, true);
  };
};

// FIXME: can easily result in a no-op
export const transformSingleRotateX: F = () => {
  const degX = randomElementFrom([0, 180]);
  return item => {
    item.coin.setRotation(
      {
        ...item.coin.rotateDegrees,
        x: degX,
      },
      true
    );
  };
};

// FIXME: can easily result in a no-op
export const transformSingleRotateY: F = () => {
  const degY = randomElementFrom([0, 180]);
  return item => {
    item.coin.setRotation(
      {
        ...item.coin.rotateDegrees,
        y: degY,
      },
      true
    );
  };
};

export const transformSingleRotateZ: F = () => {
  const degZ = randomElementFrom([0, 60, 120, 180, 240]);
  return item => {
    item.coin.setRotation(
      {
        ...item.coin.rotateDegrees,
        z: degZ,
      },
      true
    );
  };
};

export const transformIndependentRotateAll: F = () => {
  return (item: Cell) => {
    const degX = randomElementFrom([0, 180]);
    const degY = randomElementFrom([0, 180]);
    const degZ = randomElementFrom([0, 60, 120, 180, 240]);
    item.coin.setRotation({ x: degX, y: degY, z: degZ }, true);
  };
};

export const flipAll =
  (axis: "x" | "y" | undefined, spin: boolean | undefined): F =>
  () => {
    const chosenAxis = axis ?? randomElementFrom(["x", "y"]);
    const chosenSpin = spin ?? randomElementFrom([true, false]);

    return cell => {
      cell.coin.setRotation(
        {
          ...cell.coin.rotateDegrees,
          [chosenAxis]: 180 - cell.coin.rotateDegrees[chosenAxis],
          z: chosenSpin
            ? randomElementFrom([0, 60, 120, 180, 240])
            : cell.coin.rotateDegrees.z,
        },
        true
      );
    };
  };

const effects: readonly CellTransformationFunction[] = [
  transformSingleRotateAll,
  transformSingleRotateAll,
  transformSingleRotateAll,
  transformSingleRotateX,
  transformSingleRotateY,
  transformSingleRotateZ,
  transformIndependentRotateAll,
  flipAll("x", false),
  flipAll("y", false),
];

export default effects;
