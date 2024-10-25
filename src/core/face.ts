import { Text } from "./text";

export class Face {
  public readonly parts: {
    top: Text;
    middle: Text;
    bottom: Text;
  };

  private readonly _color: string = "inherit";
  private readonly element: HTMLDivElement;

  constructor(isBackface: boolean, appendTo: HTMLElement) {
    this.element = document.createElement("div");
    this.element.setAttribute("class", isBackface ? "backFace" : "frontFace");

    this.parts = {
      top: new Text("top", this.element),
      middle: new Text("middle", this.element),
      bottom: new Text("bottom", this.element),
    };

    appendTo.appendChild(this.element);
  }

  get color(): string {
    return this._color;
  }

  public setColor(value: string, transition: boolean) {
    const transitionDuration = transition ? "var(--duration)" : "0s";

    this.element.setAttribute(
      "style",
      `background-color: ${value}; transition-duration: ${transitionDuration};`
    );
  }
}
