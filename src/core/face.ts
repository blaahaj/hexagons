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
    const element = document.createElement("div");
    element.setAttribute("class", `face ${isBackface ? "back" : "front"}`);

    this.parts = {
      top: new Text("top", element),
      middle: new Text("middle", element),
      bottom: new Text("bottom", element),
    };

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
