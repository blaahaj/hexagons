import { Text } from "./text";
import { maybeTransition } from "../lib/maybeTransition";

export class Face {
  public readonly parts: {
    top: Text;
    middle: Text;
    bottom: Text;
  };

  private readonly _color: string | undefined;
  protected readonly element: HTMLDivElement;

  public static create(isBackface: boolean) {
    const face = new Face(isBackface);
    return { face, element: face.element };
  }

  constructor(private readonly isBackface: boolean) {
    const parts = (this.parts = {
      top: new Text("top"),
      middle: new Text("middle"),
      bottom: new Text("bottom"),
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

  public setColor(value: string | undefined, transition: boolean) {
    maybeTransition(transition, this.element, () => {
      this.element.style.backgroundColor = value ?? "inherit";
    });
  }
}
