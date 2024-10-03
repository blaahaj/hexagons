import { Cell } from "./distractions";
// import { groups } from "./hexagonsData";
import {
  randomColorPair,
  randomElementFrom,
  randomSymbol,
} from "./lib/randomThings";
import { schemes } from "./colorSchemes";

export type CellTransformationFunction = () => (cell: Cell) => void;
type F = CellTransformationFunction;

const transformMakeSingleRandomColor: F = () => {
  const colorPair = randomColorPair();
  return (item) => {
    item.hexagon.color = colorPair.bg;
    item.hexagon.parts.middle.color = colorPair.fg;
  };
};

const transformIndependentRandomColors: F = () => (item) => {
  const colorPair = randomColorPair();
  item.hexagon.color = colorPair.bg;
  item.hexagon.parts.middle.color = colorPair.fg;
};

const transformNRandomColors: F = () => {
  const colorPairs = [...Array(1 + Math.floor(Math.random() * 6))].map(() =>
    randomColorPair()
  );
  return (item) => {
    const colorPair = randomElementFrom(colorPairs);
    item.hexagon.color = colorPair.bg;
    item.hexagon.parts.middle.color = colorPair.fg;
  };
};

const transformToRandomColorScheme: F = () => {
  const scheme = randomElementFrom(Object.values(schemes));
  return (item) => {
    const color = randomElementFrom(scheme);
    item.hexagon.color = color;
  };
};

const transformSingleRotateAll: F = () => {
  const degX = randomElementFrom([0, 180]);
  const degY = randomElementFrom([0, 180]);
  const degZ = randomElementFrom([0, 60, 120, 180, 240]);
  return (item) => {
    item.hexagon.rX.style.transform = `rotateX(${degX}deg)`;
    item.hexagon.rY.style.transform = `rotateY(${degY}deg)`;
    item.hexagon.rZ.style.transform = `rotateZ(${degZ}deg)`;
  };
};

const transformSingleRotateX: F = () => {
  const degX = randomElementFrom([-360, -180, 0, 180]);
  return (item) => {
    item.hexagon.rX.style.transform = `rotateX(${degX}deg)`;
  };
};

const transformSingleRotateY: F = () => {
  const degY = randomElementFrom([-360, -180, 0, 180]);
  return (item) => {
    item.hexagon.rY.style.transform = `rotateY(${degY}deg)`;
  };
};

const transformSingleRotateZ: F = () => {
  const degZ = randomElementFrom([
    0, 60, 120, 180, 240, 360, 420, 480, 540, 600, 660,
  ]);
  return (item) => {
    item.hexagon.rZ.style.transform = `rotateZ(${degZ}deg)`;
  };
};

const transformIndependentRotateAll: F = () => {
  return (item: Cell) => {
    const degX = randomElementFrom([-360, -180, 0, 180]);
    const degY = randomElementFrom([-360, -180, 0, 180]);
    const degZ = randomElementFrom([
      0, 60, 120, 180, 240, 360, 420, 480, 540, 600, 660,
    ]);
    item.hexagon.rX.style.transform = `rotateX(${degX}deg)`;
    item.hexagon.rY.style.transform = `rotateY(${degY}deg)`;
    item.hexagon.rZ.style.transform = `rotateZ(${degZ}deg)`;
  };
};

const transformIndependentMakeWonky: F = () => {
  return (item: Cell) => {
    const degX = Math.random() * 10 - 5;
    const degY = Math.random() * 10 - 5;
    const degZ = Math.random() * 10 - 5;
    item.hexagon.rX.style.transform = `rotateX(${degX}deg)`;
    item.hexagon.rY.style.transform = `rotateY(${degY}deg)`;
    item.hexagon.rZ.style.transform = `rotateZ(${degZ}deg)`;
  };
};

const transformSingleRandomSymbol: F = () => {
  const symbol = randomSymbol();
  return (item: Cell) => (item.hexagon.parts.middle.text = symbol);
};

const transformIndependentRandomSymbols: F = () => (item) =>
  (item.hexagon.parts.middle.text = randomSymbol());

const transformNRandomSymbols: F = () => {
  const symbols = [...Array(1 + Math.floor(Math.random() * 6))].map(() =>
    randomSymbol()
  );
  return (item: Cell) => {
    item.hexagon.parts.middle.text = randomElementFrom(symbols);
  };
};

const transformSymbolsFromWord: F = () => {
  const word = randomElementFrom([
    "BLÅHAJ",
    "BLåHAj",
    "BLAAHAJ",
    "BLaAHAj",
    "HEXAGON",
    "HeXAgON",
  ]);
  const symbols = word.split(/([A-Z][a-z]?)/g).filter((t) => t !== "");
  return (item: Cell) =>
    (item.hexagon.parts.middle.text = randomElementFrom(symbols));
};

// const transformBestagons: F = () => {
//   const bestagons = groups
//     .map((group) =>
//       group.hexagons!.map((hexagon) => ({
//         code: hexagon.code,
//         color: group.color,
//         textColor: group.textColor,
//       }))
//     )
//     .flat();

//   return (item) => {
//     const bestagon = randomElementFrom(bestagons);
//     item.hexagon.parts.middle.text = bestagon.code;
//     item.hexagon.color = bestagon.color;
//     item.hexagon.parts.middle.color = bestagon.textColor;
//   };
// };

const compound =
  (...transformations: F[]): F =>
  () => {
    const fns = transformations.map((t) => t());
    return (item) => {
      fns.forEach((fn) => fn(item));
    };
  };

export default [
  transformMakeSingleRandomColor,
  transformIndependentRandomColors,
  transformNRandomColors,
  transformToRandomColorScheme,
  transformSingleRotateAll,
  transformSingleRotateAll,
  transformSingleRotateAll,
  transformSingleRotateX,
  transformSingleRotateY,
  transformSingleRotateZ,
  transformIndependentRotateAll,
  transformIndependentMakeWonky,
  transformSingleRandomSymbol,
  transformIndependentRandomSymbols,
  transformNRandomSymbols,
  transformSymbolsFromWord,
  // transformBestagons,
  compound(transformMakeSingleRandomColor, transformSingleRotateAll),
  compound(transformSymbolsFromWord, transformIndependentMakeWonky),
  compound(transformSymbolsFromWord, transformSingleRotateX),
  compound(
    transformSymbolsFromWord,
    transformSingleRotateAll,
    transformNRandomColors
  ),
];
