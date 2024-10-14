import { Text } from "./text";
import type { RotateDegrees } from "./coin";

export class Face {
  public readonly parts: {
    top: Text;
    middle: Text;
    bottom: Text;
  };

  private readonly _color: string = "inherit";
  private readonly rotationElement: HTMLDivElement;
  private readonly colorElement: HTMLDivElement;

  constructor(isBackface: boolean, appendTo: HTMLElement) {
    this.rotationElement = document.createElement("div");
    this.rotationElement.setAttribute(
      "class",
      `faceRotation ${isBackface ? "back" : "front"}`
    );

    this.colorElement = document.createElement("div");
    this.colorElement.setAttribute(
      "class",
      `faceColor ${isBackface ? "back" : "front"}`
    );

    this.parts = {
      top: new Text("top", this.colorElement),
      middle: new Text("middle", this.colorElement),
      bottom: new Text("bottom", this.colorElement),
    };

    this.rotationElement.appendChild(this.colorElement);
    appendTo.appendChild(this.rotationElement);
  }

  get color(): string {
    return this._color;
  }

  public setColor(value: string, transition: boolean) {
    const transitionDuration = transition ? "var(--duration)" : "0s";

    this.colorElement.setAttribute(
      "style",
      `background-color: ${value}; transition-duration: ${transitionDuration};`
    );
  }

  hackyRotateDegrees(value: RotateDegrees, transition: boolean) {
    const transitionDuration = transition ? "var(--duration)" : "0s";

    this.rotationElement.setAttribute(
      "style",
      `
        --rx: ${value.x}deg;
        --ry: ${value.y}deg;
        --rz: ${value.z}deg;
        transition-duration: ${transitionDuration};
      `
    );
  }
}
