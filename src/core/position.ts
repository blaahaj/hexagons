import EuclideanPosition from "./euclideanPosition";

const sin60 = Math.sin(Math.PI / 3);
const longRadius = 1 / sin60;

export class Position {
  public static at(x: number, y: number): Position {
    return new Position(x, y);
  }

  constructor(
    public readonly x: number,
    public readonly y: number
  ) {}

  public toKey(): string {
    return `(${this.x},${this.y})`;
  }

  public toEuclidean(): EuclideanPosition {
    return EuclideanPosition.at(
      this.x * longRadius * 1.5,
      2 * this.y + (this.x % 2)
    );
  }
}
