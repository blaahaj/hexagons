import { Hexagon } from "./hexagon";
import { randomColorPair, randomElementFrom } from "./lib/randomThings";
import normaliseRange from "./lib/normaliseRange";
import cellTimingFunctions, { CellTimingFunction } from "./cellTimingFunctions";
import cellTransformationFunctions, {
  CellTransformationFunction,
} from "./cellTransformationFunctions";
import { Cell } from "./cell";
import { CellArray } from "./cellArray";
import { CellPosition } from "./cellPosition";

const iterationInterval = 6000;
const timingSpread = 1500;

const check = () => {
  const main = document.getElementById("hexagon-container");
  if (!main) return;

  const cells: Cell[] = [];
  const cellArray = new CellArray();

  let cellY = 0;
  let cell: HTMLDivElement;

  for (;;) {
    let cellX = 0;

    for (;;) {
      const colors = randomColorPair();
      const hexagon = new Hexagon();
      hexagon.color = colors.bg;
      // hexagon.parts.top.text = `x=${cellX} y=${cellY}`;
      hexagon.parts.middle.text = randomElementFrom("HEXAGON".split(""));
      hexagon.parts.middle.color = colors.fg;
      cell = document.createElement("div");
      cell.className = "hexagon-cell";
      cell.appendChild(hexagon.element);

      const cellStruct = new Cell(
        CellPosition.at(cellX, cellY),
        hexagon,
        cell,
        cellArray
      );

      main.appendChild(cell);
      cells.push(cellStruct);

      ++cellX;
      if (cell.offsetLeft > cell.parentElement!.clientWidth) break;
    }

    ++cellY;
    if (cell.offsetTop > cell.parentElement!.clientHeight) break;
  }

  const iterate = () => {
    const timingFunction = randomElementFrom(cellTimingFunctions)(cells);
    const transformationFunction = randomElementFrom(
      cellTransformationFunctions
    )(cells);
    const itemsWithDelays = normaliseRange(
      cells.map(item => [item, timingFunction(item)]),
      0,
      timingSpread
    );
    for (const [item, delay] of itemsWithDelays) {
      setTimeout(() => transformationFunction(item), delay);
    }
  };

  let timeout: NodeJS.Timeout | undefined = setInterval(
    iterate,
    iterationInterval
  );

  document.addEventListener("keydown", event => {
    if (event.key === "f") {
      if (document.fullscreenElement === null)
        document.body.requestFullscreen();
      else document.exitFullscreen();
    }

    if (event.key === "n" && !timeout) {
      iterate();
    }

    if (event.key === "s" && timeout) {
      clearTimeout(timeout);
      timeout = undefined;
    }

    if (event.key === "g" && !timeout) {
      timeout = setInterval(iterate, iterationInterval);
    }
  });
};

check();
