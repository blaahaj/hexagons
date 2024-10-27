import { Grid } from "./grid";
import { Position } from "./position";
import { Coin } from "./coin";
import type { Neighbours } from "./neighbours";

export interface CellGeometry {
  readonly positionAndMovement: {
    readonly position: Position;
    readonly movement: CellMovement;
  };
  readonly instantOrientation: Orientation; // never transitioned
}

export type CellMovement =
  | { readonly spin: Spin; readonly flip: undefined }
  | { readonly flip: Flip; readonly spin: undefined }
  | { readonly flip: undefined; readonly spin: undefined };

export interface Spin {
  readonly around: number; // clock position 0..11, relative to the grid
  readonly degrees: number;
}

export interface Flip {
  readonly around: number;
}

export interface Orientation {
  readonly zeroPosition: number;
  readonly reversed: boolean;
}

export const hexagonSpacing = 1.06;
export const hexagonShortRadiusEm = 3.3;
export const hexagonLongRadiusEm = hexagonShortRadiusEm / Math.sin(Math.PI / 3);

export class Cell {
  public readonly coin: Coin;
  private readonly positionAndMovementElement: HTMLDivElement;
  private readonly instantOrientationElement: HTMLDivElement;

  private _geometry: CellGeometry;

  public static create(pos: Position, grid: Grid) {
    const cell = new Cell(pos, grid);
    return { cell, element: cell.positionAndMovementElement };
  }

  protected constructor(
    position: Position,
    public readonly grid: Grid
  ) {
    this.positionAndMovementElement = document.createElement("div");
    this.positionAndMovementElement.className = "cell";

    this.instantOrientationElement = document.createElement("div");
    this.instantOrientationElement.className = "cellOrientation";

    this.positionAndMovementElement.appendChild(this.instantOrientationElement);

    this._geometry = {
      positionAndMovement: {
        position,
        movement: { spin: undefined, flip: undefined },
      },
      instantOrientation: {
        zeroPosition: 0,
        reversed: false,
      },
    };
    grid.add(this);

    this.setGeometry(this._geometry, false);

    this.coin = new Coin(
      this.instantOrientationElement,
      () => this._geometry.instantOrientation.reversed
    );
  }

  get position(): Position {
    return this._geometry.positionAndMovement.position;
  }

  get geometry(): CellGeometry {
    return this._geometry;
  }

  public setGeometry(geometry: CellGeometry, transition: boolean) {
    const positionAndMovementStyle = this.positionAndMovementElement.style;
    positionAndMovementStyle.transitionDuration = transition
      ? `var(--duration)`
      : "0s";
    this._updatePosition(
      positionAndMovementStyle,
      geometry.positionAndMovement.position
    );
    this._updateMovement(
      positionAndMovementStyle,
      geometry.positionAndMovement.movement
    );

    const instantOrientationStyle = this.instantOrientationElement.style;
    this._updateInstantOrientation(
      instantOrientationStyle,
      geometry.instantOrientation
    );

    this._geometry = geometry;
  }

  private _updatePosition(style: CSSStyleDeclaration, to: Position) {
    const isMove =
      to.toKey() !== this._geometry.positionAndMovement.position.toKey();

    if (isMove) this.grid.remove(this);

    style.left = `calc(50% - var(--hex-long-radius) + ${to.x} * 1.5 * var(--hex-long-radius) * var(--hexagon-spacing))`;
    style.top = `calc(50% - var(--hex-short-radius) + ${to.y + (Math.abs(to.x) % 2) / 2} * 2 * var(--hex-short-radius) * var(--hexagon-spacing))`;

    if (isMove) this.grid.add(this);
  }

  private _updateMovement(style: CSSStyleDeclaration, to: CellMovement) {
    if (to.spin) {
      this._setSpin(style, to.spin);
    } else if (to.flip) {
      this._setFlip(style, to.flip);
    } else {
      this._setNeitherSpinNorFlip(style);
    }
  }

  // Z-rotation around any vertex or edge-middle
  private _setSpin(style: CSSStyleDeclaration, spin: Spin) {
    const r = `(${spin.around % 2 === 0 ? "var(--hex-short-radius)" : "var(--hex-long-radius)"} * var(--hexagon-spacing))`;

    const theta = `${spin.around * 30}deg`;
    const cx = `calc(50% + ${r} * sin( ${theta} ))`;
    const cy = `calc(50% - ${r} * cos( ${theta} ))`;

    style.transformOrigin = `${cx} ${cy} 0`;
    style.transform = `rotateZ(${spin.degrees}deg)`;
  }

  // Flip around any edge
  private _setFlip(style: CSSStyleDeclaration, flip: Flip) {
    const r = `(${flip.around % 2 === 0 ? "var(--hex-short-radius)" : "var(--hex-long-radius)"} * var(--hexagon-spacing))`;
    const theta = `${flip.around * 30}deg`;
    const cx = `calc(50% + ${r} * sin( ${theta} ))`;
    const cy = `calc(50% - ${r} * cos( ${theta} ))`;

    style.transformOrigin = `${cx} ${cy} 0`;
    style.transform = `rotate3d(cos(${theta}), sin(${theta}), 0, 180deg)`;
  }

  private _setNeitherSpinNorFlip(style: CSSStyleDeclaration) {
    // around whatever origin was previously set
    style.transform = "";
  }

  // Never transitions
  private _updateInstantOrientation(
    style: CSSStyleDeclaration,
    to: Orientation
  ) {
    style.transformOrigin = "center center";

    style.transform = [
      `rotateZ(${to.zeroPosition * 30}deg)`,
      `rotateY(${to.reversed ? "180deg" : "0"})`,
    ].join(" ");
  }

  public get screenPosition() {
    return {
      top: this.positionAndMovementElement.offsetTop,
      left: this.positionAndMovementElement.offsetLeft,
      height: this.positionAndMovementElement.offsetHeight,
      width: this.positionAndMovementElement.offsetWidth,
    };
  }

  public neighbours(): Neighbours<Cell | undefined> {
    return this.grid.neighboursOf(this._geometry.positionAndMovement.position);
  }
}
