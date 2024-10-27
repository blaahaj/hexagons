import { Face } from "./face";

export interface RotateDegrees {
  x: number;
  y: number;
  z: number;
}

export class Coin {
  public readonly frontFace: Face;
  public readonly backFace: Face;

  private readonly element: HTMLDivElement;
  private _rotateDegrees: RotateDegrees = { x: 0, y: 0, z: 0 };

  constructor(
    appendTo: HTMLElement,
    private readonly isParentReversed: () => boolean
  ) {
    const element = document.createElement("div");
    element.setAttribute("class", "coin");
    this.element = element;

    this.frontFace = new Face(false, element);
    this.backFace = new Face(true, element);

    this.setRotation({ x: 0, y: 0, z: 0 }, false);
    appendTo.appendChild(this.element);
  }

  get rotateDegrees(): Readonly<RotateDegrees> {
    return this._rotateDegrees;
  }

  setRotation(value: RotateDegrees, transition: boolean) {
    this._rotateDegrees = {
      x: value.x,
      y: value.y,
      z: value.z,
    };

    const transform = [
      `rotateX(${value.x}deg)`,
      `rotateY(${value.y}deg)`,
      `rotateZ(${value.z}deg)`,
    ].join(" ");
    const transitionDuration = transition ? "var(--duration)" : "0s";

    this.element.setAttribute(
      "style",
      `transform: ${transform}; transition-duration: ${transitionDuration};`
    );
  }

  public get visibleFace(): Face {
    return this.isReversed() ? this.backFace : this.frontFace;
  }

  public get hiddenFace(): Face {
    return this.isReversed() ? this.frontFace : this.backFace;
  }

  private isReversed(): boolean {
    return (
      ((this.rotateDegrees.x + this.rotateDegrees.y) % 360 === 180) !=
      this.isParentReversed()
    );
  }
}
