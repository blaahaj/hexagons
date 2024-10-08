import { Position } from "./position";

export const NeighbourDirections = [
  "kl00",
  "kl02",
  "kl04",
  "kl06",
  "kl08",
  "kl10",
] as const;

export type NeighbourDirections = (typeof NeighbourDirections)[number];

export type Neighbours<T> = Exclude<
  {
    [k in NeighbourDirections]: T;
  },
  undefined
>;

export const neighboursOfPosition = (pos: Position): Neighbours<Position> => ({
  kl00: Position.at(pos.x + 0, pos.y - 1),
  kl02: Position.at(pos.x + 1, pos.y - 1 + (pos.x % 2)),
  kl04: Position.at(pos.x + 1, pos.y + 0 + (pos.x % 2)),
  kl06: Position.at(pos.x + 0, pos.y + 1),
  kl08: Position.at(pos.x - 1, pos.y + 0 + (pos.x % 2)),
  kl10: Position.at(pos.x - 1, pos.y - 1 + (pos.x % 2)),
});

export const mapNeighbours = <I, O>(
  from: Neighbours<I>,
  fn: (value: I, key: NeighbourDirections) => O
): Neighbours<O> => {
  const to = {} as Neighbours<O>;
  for (const k of NeighbourDirections) {
    to[k] = fn(from[k], k);
  }
  return to;
};
