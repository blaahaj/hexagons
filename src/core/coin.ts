import { Face } from "./face";

interface RotateDegrees {
  x: number;
  y: number;
  z: number;
}

export class Coin {
  public readonly frontFace: Face;
  public readonly backFace: Face;

  protected readonly element: HTMLDivElement;
  private _rotateDegrees: RotateDegrees = { x: 0, y: 0, z: 0 };

  public static create() {
    const coin = new Coin();
    return { coin, element: coin.element };
  }

  protected constructor() {
    this.frontFace = new Face(false);
    this.backFace = new Face(true);

    const element = document.createElement("div");
    element.setAttribute("class", "coin");
    element.appendChild(this.frontFace.element);
    element.appendChild(this.backFace.element);

    this.element = element;
    this.rotateDegrees = { x: 0, y: 0, z: 0 };
  }

  get rotateDegrees(): Readonly<RotateDegrees> {
    return this._rotateDegrees;
  }

  set rotateDegrees(value: RotateDegrees) {
    this._rotateDegrees = {
      x: value.x,
      y: value.y,
      z: value.z,
    };
    this.element.setAttribute(
      "style",
      `
        --rx: ${this._rotateDegrees.x}deg;
        --ry: ${this._rotateDegrees.y}deg;
        --rz: ${this._rotateDegrees.z}deg;
      `
    );
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
