export const generateRange = function* (
  stopAt: number,
  startAt = 0,
  step = 1
): Generator<number> {
  if (Math.sign(step) !== Math.sign(stopAt - startAt))
    throw new Error("Range must be finite");

  let n = startAt;

  while (n < stopAt) {
    yield n;
    n += step;
  }
};
