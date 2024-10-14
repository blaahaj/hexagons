import { maybeTransition } from "../lib/maybeTransition";

export const TextPositions = ["top", "middle", "bottom"] as const;
export type TextPosition = (typeof TextPositions)[number];

interface TextPart {
  readonly span: HTMLSpanElement;
  text: string;
}

export class Text {
  protected readonly element: HTMLDivElement;
  private readonly texts: [TextPart, TextPart];

  constructor(textPosition: TextPosition, appendTo: HTMLElement) {
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
    appendTo.appendChild(this.element);
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

  setColor(value: string, transition: boolean) {
    maybeTransition(transition, this.element, () => {
      this.element.style.color = value;
    });
  }
}
