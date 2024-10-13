import { Coin } from "./core/coin";
import { randomColorPair, randomElementFrom } from "./lib/randomThings";
import normaliseRange from "./lib/normaliseRange";
import cellTimingFunctions from "./effects/when/cellTimingFunctions";
import cellTransformationFunctions from "./effects/what/index";
import { Cell } from "./core/cell";
import { Grid } from "./core/grid";
import { Position } from "./core/position";

const iterationInterval = 6000;
const timingSpread = 1500;

const initGrid = (container: HTMLElement): Grid => {
  const grid = new Grid();
  let cellX = 0;
  let cellY = 0;

  for (;;) {
    const coin = new Coin();

    for (const whichFace of ["frontFace", "backFace"] as const) {
      const face = coin[whichFace];
      const colors = randomColorPair();
      face.color = colors.bg;
      // hexagon.parts.top.text = `x=${cellX} y=${cellY}`;
      face.parts.middle.text = randomElementFrom("HEXAGON".split(""));
      face.parts.middle.color = colors.fg;
    }

    const cell = new Cell(Position.at(cellX, cellY), coin, grid);

    container.appendChild(cell.element);

    if (
      cell.element.offsetLeft + cell.element.offsetWidth >
      cell.element.parentElement!.clientWidth
    ) {
      if (
        cell.element.offsetTop + cell.element.offsetHeight >
        cell.element.parentElement!.clientHeight
      )
        break;

      cellX = 0;
      ++cellY;
    } else {
      ++cellX;
    }
  }

  grid.boundary = Position.at(cellX, cellY);

  return grid;
};

const makeIterator = (grid: Grid): (() => void) => {
  const cells = grid.cells();

  return () => {
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
      setTimeout(() => {
        transformationFunction(item);
      }, delay);
    }
  };
};

const check = () => {
  const container = document.getElementById("hexagon-container");
  if (!container) return;

  const grid = initGrid(container);
  const iterate = makeIterator(grid);

  let timeout: NodeJS.Timeout | undefined = setTimeout(() => {
    timeout = setInterval(iterate, iterationInterval);
    iterate();
  }, iterationInterval / 2);

  document.addEventListener("keydown", event => {
    if (event.key === "f") {
      if (document.fullscreenElement === null)
        document.body.requestFullscreen().catch(() => undefined);
      else document.exitFullscreen().catch(() => undefined);
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
