export class CellPosition {
  public static at(x: number, y: number): CellPosition {
    return new CellPosition(x, y);
  }

  constructor(
    public readonly x: number,
    public readonly y: number
  ) {}

  public toKey(): string {
    return `(${this.x},${this.y})`;
  }
}
