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

  constructor(appendTo: HTMLElement) {
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
    this.frontFace.hackyRotateDegrees(value, transition);
    this.backFace.hackyRotateDegrees(value, transition);
  }

  public get visibleFace(): Face {
    return (this.rotateDegrees.x + this.rotateDegrees.y) % 360 === 0
      ? this.frontFace
      : this.backFace;
  }

  public get hiddenFace(): Face {
    return (this.rotateDegrees.x + this.rotateDegrees.y) % 360 === 180
      ? this.frontFace
      : this.backFace;
  }
}
