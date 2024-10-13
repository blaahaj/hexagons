export const TextPositions = ["top", "middle", "bottom"] as const;
export type TextPosition = (typeof TextPositions)[number];

interface TextPart {
  readonly span: HTMLSpanElement;
  text: string;
}

export class FaceText {
  public readonly element: HTMLDivElement;
  private readonly texts: [TextPart, TextPart];

  constructor(textPosition: TextPosition) {
    this.element = document.createElement("div");
    this.element.setAttribute("class", `text ${textPosition}`);
    const makeText = () => {
      const span = document.createElement("span");
      span.classList.add("alternate");
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
    return this.texts[0].span.innerHTML;
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

  set color(value: string) {
    this.element.style.color = value;
  }
}

export class Face {
  public readonly parts: {
    top: FaceText;
    middle: FaceText;
    bottom: FaceText;
  };

  private readonly _color: string | undefined;
  public readonly element: HTMLDivElement;

  constructor(private readonly isBackface: boolean) {
    const parts = (this.parts = {
      top: new FaceText("top"),
      middle: new FaceText("middle"),
      bottom: new FaceText("bottom"),
    });

    const element = document.createElement("div");
    element.setAttribute("class", `face ${isBackface ? "back" : "front"}`);

    element.appendChild(parts.top.element);
    element.appendChild(parts.middle.element);
    element.appendChild(parts.bottom.element);

    this.element = element;
  }

  get color(): string | undefined {
    return this._color;
  }

  set color(value: string | undefined) {
    this.element.style.backgroundColor = value ?? "inherit";
  }
}
