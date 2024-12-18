import { randomColorPair, randomElementFrom } from "./lib/randomThings";
import normaliseRange from "./lib/normaliseRange";
import cellTimingFunctions from "./effects/when/cellTimingFunctions";
import cellTransformationFunctions from "./effects/what/index";
import { Cell } from "./core/cell";
import { Grid } from "./core/grid";
import { Position } from "./core/position";

const iterationInterval = 10000;
const timingSpread = 3000;

const initGrid = (container: HTMLElement): Grid => {
  const grid = new Grid();
  let cellX = 0;
  let cellY = 0;

  const addCellIfEmpty = (
    pos: Position
  ): { cell: Cell; element: HTMLElement } | undefined => {
    if (grid.cellAt(pos)) return;

    const { cell, element } = Cell.create(pos, grid);

    const coin = cell.coin;

    for (const whichFace of ["frontFace", "backFace"] as const) {
      const face = coin[whichFace];
      const colors = randomColorPair();
      face.setColor(colors.bg, false);
      // hexagon.parts.top.text = `x=${cellX} y=${cellY}`;
      face.parts.middle.setText(randomElementFrom("HEXAGON".split("")), false);
      face.parts.top.setColor(colors.fg, false);
      face.parts.middle.setColor(colors.fg, false);
      face.parts.bottom.setColor(colors.fg, false);
    }

    container.appendChild(element);

    return { cell, element };
  };

  for (;;) {
    const result = addCellIfEmpty(Position.at(cellX, cellY));
    if (!result) break;

    const { element } = result;
    addCellIfEmpty(Position.at(-cellX, cellY));
    addCellIfEmpty(Position.at(-cellX, -cellY));
    addCellIfEmpty(Position.at(cellX, -cellY));

    if (
      element.offsetLeft + element.offsetWidth >
      element.parentElement!.clientWidth
    ) {
      if (
        element.offsetTop + element.offsetHeight >
        element.parentElement!.clientHeight
      )
        break;

      cellX = 0;
      ++cellY;
    } else {
      ++cellX;
    }

    if (container.childElementCount > 1000) break;
  }

  grid.boundary = [Position.at(-cellX, -cellY), Position.at(cellX, cellY)];

  Object.defineProperty(window, "__grid", {
    value: grid,
    enumerable: true,
    configurable: false,
  });

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

    if (event.key === "m") {
      const list = document.body.classList;
      list[list.contains("mirror") ? "remove" : "add"]("mirror");
    }
  });
};

check();
