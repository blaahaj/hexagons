export default class EuclideanPosition {
  public static at(x: number, y: number): EuclideanPosition {
    return new EuclideanPosition(x, y);
  }

  constructor(
    public readonly x: number,
    public readonly y: number
  ) {}

  public distance(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  public angle(): number {
    return Math.atan2(this.y, this.x);
  }

  public offsetFrom(from: EuclideanPosition): EuclideanPosition {
    return EuclideanPosition.at(this.x - from.x, this.y - from.y);
  }
}
