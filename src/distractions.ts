import { Hexagon } from "./hexagon";
import { randomColorPair, randomElementFrom } from "./lib/randomThings";
import normaliseRange from "./lib/normaliseRange";
import cellTimingFunctions, { CellTimingFunction } from "./cellTimingFunctions";
import cellTransformationFunctions, {
  CellTransformationFunction,
} from "./cellTransformationFunctions";

export type Cell = {
  hexagon: Hexagon;
  cell: HTMLDivElement;
};

const check = () => {
  const main = document.getElementById("hexagon-container");
  if (!main) return;

  const cells: Cell[] = [];

  let rowNumber = 0;
  let cell: HTMLDivElement;

  for (;;) {
    let columnNumber = 0;

    for (;;) {
      const colors = randomColorPair();
      const hexagon = new Hexagon();
      hexagon.color = colors.bg;
      hexagon.parts.middle.text = randomElementFrom("HEXAGON".split(""));
      hexagon.parts.middle.color = colors.fg;
      cell = document.createElement("div");
      cell.className = "hexagon-cell";
      cell.appendChild(hexagon.element);

      cell.setAttribute(
        "style",
        `--row: ${rowNumber}; --column: ${columnNumber}; --column-mod-2: ${columnNumber % 2};`
      );

      main.appendChild(cell);

      cells.push({ hexagon, cell });

      ++columnNumber;
      if (cell.offsetLeft > screen.availWidth) break;
    }

    ++rowNumber;
    if (cell.offsetTop > screen.availHeight) break;
  }

  const iterate = () => {
    const timingFunction = randomElementFrom(cellTimingFunctions)(cells);
    const transformationFunction = randomElementFrom(
      cellTransformationFunctions
    )(cells);
    const itemsWithDelays = normaliseRange(
      cells.map(item => [item, timingFunction(item)]),
      100,
      1500
    );
    for (const [item, delay] of itemsWithDelays) {
      setTimeout(() => transformationFunction(item), delay);
    }
  };

  let timeout: NodeJS.Timeout | undefined = setInterval(iterate, 6000);

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
      timeout = setInterval(iterate, 6000);
    }
  });
};

check();
