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
}
