import { Hexagon } from "./hexagon";
import { randomColorPair, randomElementFrom } from "./lib/randomThings";
import normaliseRange from "./lib/normaliseRange";
import cellTimingFunctions, { CellTimingFunction } from "./cellTimingFunctions";
import cellTransformationFunctions, {
  CellTransformationFunction,
} from "./cellTransformationFunctions";

// export type Cell = {
//   readonly position: CellPosition;
//   readonly hexagon: Hexagon;
//   readonly cell: HTMLDivElement;
// };

export type CellPosition = {
  readonly x: number;
  readonly y: number;
};

export class Cell {
  constructor(
    private pos: CellPosition,
    public readonly hexagon: Hexagon,
    public readonly cell: HTMLDivElement
  ) {
    this.position = pos;
  }

  get position(): CellPosition {
    return this.pos;
  }

  set position(pos: CellPosition) {
    this.pos = pos;
    this.cell.setAttribute(
      "style",
      `--cell-y: ${pos.y}; --cell-x: ${pos.x}; --cell-x-mod-2: ${pos.x % 2};`
    );
  }
}

const check = () => {
  const main = document.getElementById("hexagon-container");
  if (!main) return;

  const cells: Cell[] = [];

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

      const cellStruct = new Cell({ x: cellX, y: cellY }, hexagon, cell);

      main.appendChild(cell);
      cells.push(cellStruct);

      ++cellX;
      if (cell.offsetLeft > screen.availWidth) break;
    }

    ++cellY;
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
