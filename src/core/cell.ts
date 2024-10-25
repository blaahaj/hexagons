import { Grid } from "./grid";
import { Position } from "./position";
import { Coin } from "./coin";
import type { Neighbours } from "./neighbours";

export interface CellGeometry {
  readonly position: Position;
  readonly orientation: Orientation;
  readonly spin: Spin;
  readonly flip: Flip | undefined;
}

export interface Orientation {
  readonly degrees: number;
  readonly reversed: boolean;
}

export interface Spin {
  readonly around: number; // clock position 0..11, relative to the grid
  readonly degrees: number;
}

export interface Flip {
  readonly around: number;
}

export const hexagonSpacing = 1.06;
export const hexagonShortRadiusEm = 3.3;
export const hexagonLongRadiusEm = hexagonShortRadiusEm / Math.sin(Math.PI / 3);

export class Cell {
  public readonly coin: Coin;
  private readonly element: HTMLDivElement;

  private _geometry: CellGeometry;

  public static create(pos: Position, grid: Grid) {
    const cell = new Cell(pos, grid);
    return { cell, element: cell.element };
  }

  protected constructor(
    position: Position,
    public readonly grid: Grid
  ) {
    this.element = document.createElement("div");
    this.element.className = "cell";

    this.coin = new Coin(this.element);

    this._geometry = { position } as CellGeometry;
    grid.add(this);

    this.setGeometry(
      {
        position,
        orientation: { degrees: 60, reversed: true },
        spin: { degrees: 0, around: 0 },
        flip: undefined,
      },
      false
    );
  }

  get position(): Position {
    return this._geometry.position;
  }

  public setPosition(pos: Position, transition: boolean): void {
    this.setGeometry(
      {
        ...this._geometry,
        position: pos,
      },
      transition
    );
  }

  public setGeometry(geometry: CellGeometry, transition: boolean) {
    this.grid.remove(this);

    const { position, orientation, spin, flip } = geometry;
    const style = this.element.style;

    // In apply-order
    const transforms: string[] = [
      ...this.orientationTransforms(orientation),
      ...this.spinTransforms(spin),
      ...this.flipTransforms(flip),
    ];

    if (transforms.length > 0) {
      transforms.unshift(
        `translate3d(${-1 * hexagonLongRadiusEm}em, ${-1 * hexagonShortRadiusEm}em, 0)`
      );
      transforms.push(
        `translate3d(${+1 * hexagonLongRadiusEm}em, ${+1 * hexagonShortRadiusEm}em, 0)`
      );
    }

    style.top = `${hexagonSpacing * hexagonShortRadiusEm * (2 * position.y + (position.x % 2))}em`;
    style.left = `${hexagonSpacing * hexagonLongRadiusEm * position.x * 1.5}em`;
    style.transform = transforms.reverse().join(" ");
    console.log(transforms.reverse().join(" "));
    style.transitionDuration = transition ? "var(--duration)" : "0s";

    this._geometry = geometry;
    this.grid.add(this);
  }

  private orientationTransforms(orientation: Orientation): string[] {
    if (orientation.degrees % 360 === 0 && !orientation.reversed) return [];

    return [
      `rotateY(${orientation.reversed ? "180deg" : "0"})`,
      `rotateZ(${orientation.degrees}deg)`,
    ];
  }

  // Can be centered either on a (spaced) vertex, or a (spaced) edge
  private spinTransforms(spin: Spin): string[] {
    if (spin.degrees % 360 === 0) return [];

    const r =
      (spin.around % 2 === 0 ? hexagonShortRadiusEm : hexagonLongRadiusEm) *
      hexagonSpacing;
    const theta = (spin.around / 6) * Math.PI;
    const cx = r * Math.sin(theta);
    const cy = -r * Math.cos(theta);

    return [
      `translate3d(${-1 * cx}em, ${-1 * cy}em, 0)`,
      `rotateZ(${spin.degrees}deg)`,
      `translate3d(${+1 * cx}em, ${+1 * cy}em, 0)`,
    ];
  }

  // Always centered around an edge
  private flipTransforms(flip: Flip | undefined): string[] {
    if (flip === undefined) return [];

    const r =
      (flip.around % 2 === 0 ? hexagonShortRadiusEm : hexagonLongRadiusEm) *
      hexagonSpacing;
    const theta = (flip.around / 6) * Math.PI;
    const cx = r * Math.sin(theta);
    const cy = -r * Math.cos(theta);

    return [
      `translate3d(${-1 * cx}em, ${-1 * cy}em, 0)`,
      `rotate3d(${cy}, ${-cx}, 0, 180deg)`,
      `translate3d(${+1 * cx}em, ${+1 * cy}em, 0)`,
    ];
  }

  public get screenPosition() {
    return {
      top: this.element.offsetTop,
      left: this.element.offsetLeft,
      height: this.element.offsetHeight,
      width: this.element.offsetWidth,
    };
  }

  public neighbours(): Neighbours<Cell | undefined> {
    return this.grid.neighboursOf(this._geometry.position);
  }
}
