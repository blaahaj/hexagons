export const HexagonContentPosition = ["top", "middle", "bottom"] as const;

type TextPart = {
  readonly span: HTMLSpanElement;
  text: string;
};

export class HexagonPart {
  public readonly element: HTMLDivElement;
  private readonly texts: [TextPart, TextPart];

  constructor(which: (typeof HexagonContentPosition)[number]) {
    this.element = document.createElement("div");
    this.element.setAttribute(
      "class",
      `hexagon--content hexagon--content-${which}`
    );
    const makeText = () => {
      const span = document.createElement("span");
      const text = "";
      span.innerHTML = text; // Initialize with empty HTML content
      return { span, text };
    };
    this.texts = [makeText(), makeText()];
    this.texts[0].span.style.opacity = "1";
    this.texts[1].span.style.opacity = "0";
    this.element.append(...this.texts.map(t => t.span));
  }

  get text() {
    return this.texts[0].span.innerHTML ?? "";
  }

  set text(value) {
    if (value === this.text) return;
    this.texts.reverse();
    this.texts[0].span.innerHTML = value;
    this.texts[0].span.style.opacity = "1"; // fade in
    this.texts[1].span.style.opacity = "0"; // fade out
  }

  get color() {
    return this.element.style.color;
  }

  set color(value) {
    this.element.style.color = value ?? "inherit";
  }
}

export class Hexagon {
  public readonly parts: {
    top: HexagonPart;
    middle: HexagonPart;
    bottom: HexagonPart;
  };

  private readonly _color: string | undefined;
  private readonly hexagon: HTMLDivElement;
  public readonly element: HTMLDivElement;
  public readonly rX: HTMLDivElement;
  public readonly rY: HTMLDivElement;
  public readonly rZ: HTMLDivElement;

  constructor(_size: unknown) {
    const parts = (this.parts = {
      top: new HexagonPart("top"),
      middle: new HexagonPart("middle"),
      bottom: new HexagonPart("bottom"),
    });
    const hexagon = document.createElement("div");
    hexagon.setAttribute(
      "class",
      "hexagon transition-[background-color] bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 focus-visible:outline-gray-600 dark:focus-visible:outline-gray-500"
    );
    hexagon.appendChild(parts.top.element);
    hexagon.appendChild(parts.middle.element);
    hexagon.appendChild(parts.bottom.element);
    this.hexagon = hexagon;

    this.rX = document.createElement("div");
    this.rX.setAttribute("class", "rx");
    this.rX.appendChild(hexagon);

    this.rY = document.createElement("div");
    this.rY.setAttribute("class", "ry");
    this.rY.appendChild(this.rX);

    this.rZ = document.createElement("div");
    this.rZ.setAttribute("class", "rz");
    this.rZ.appendChild(this.rY);

    this.element = this.rZ;
  }

  get color(): string | undefined {
    return this._color;
  }

  set color(value: string | undefined) {
    this.hexagon.style.backgroundColor = value ?? "inherit";
  }
}
