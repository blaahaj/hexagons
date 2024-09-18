export default <T>(
  items: ReadonlyArray<Readonly<[T, number]>>,
  outputMin: number,
  outputMax: number
) => {
  if (items.length === 0) return items;
  let inputMin = Infinity;
  let inputMax = -Infinity;
  for (const item of items) {
    if (item[1] > inputMax) inputMax = item[1];
    if (item[1] < inputMin) inputMin = item[1];
  }
  const inputRange = inputMax - inputMin;
  const outputRange = outputMax - outputMin;
  if (inputRange < 0.1) return items;
  const scale = outputRange / inputRange;
  return items.map(
    (item) => [item[0], outputMin + scale * (item[1] - inputMin)] as const
  );
};
