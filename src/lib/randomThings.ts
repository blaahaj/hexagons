import { chemicalElements } from "./chemicalElements";

export const randomSymbol = (() => {
  return (): string | [string, string, string] => {
    const n = Math.random();
    if (n > 0.98) return "🪩";
    if (n > 0.96) return "⭐️";
    if (n > 0.94) return "🐝";
    const e = randomElementFrom(chemicalElements);
    return randomElementFrom([
      e.symbol,
      [e.number.toString(), e.symbol, e.name],
    ]);
  };
})();

export const randomColorPair = (() => {
  const r = () => Math.floor(Math.random() * 256);
  return () => {
    for (;;) {
      const fg = { r: r(), g: r(), b: r() };
      const bg = { r: r(), g: r(), b: r() };
      const distance = Math.sqrt(
        (fg.r - bg.r) ** 2 * 0.3 +
          (fg.g - bg.g) ** 2 * 0.59 +
          (fg.b - bg.b) ** 2 * 0.11
      );

      if (distance > 30)
        return {
          fg: `rgb(${fg.r}, ${fg.g}, ${fg.b})`,
          bg: `rgb(${bg.r}, ${bg.g}, ${bg.b})`,
        };
    }
  };
})();

export const randomElementFrom = <T>(items: readonly T[]) =>
  items[Math.floor(Math.random() * items.length)];
