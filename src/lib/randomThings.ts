export const randomSymbol = (() => {
  const alphabet = "abcdefghijklmnopqrstuvwxyzæøå";
  const randomLetterFrom = (s: string) =>
    s[Math.floor(Math.random() * s.length)];

  return () => {
    const n = Math.random();
    if (n > 0.98) return "🪩";
    if (n > 0.96) return "⭐️";
    if (n > 0.94) return "🐝";
    return (
      randomLetterFrom(alphabet).toUpperCase() +
      randomLetterFrom(alphabet + "  ").trim()
    );
  };
})();

export const randomColorPair = (() => {
  const r = () => Math.floor(Math.random() * 256);
  return () => {
    for (;;) {
      const fg = { r: r(), g: r(), b: r() };
      const bg = { r: r(), g: r(), b: r() };
      const distance = Math.sqrt(
        (fg.r - bg.r) ** 2 * 4 + (fg.g - bg.g) * 2 + (fg.b - bg.b) ** 2 * 2
      );

      if (distance < 400)
        return {
          fg: `rgb(${fg.r}, ${fg.g}, ${fg.b})`,
          bg: `rgb(${bg.r}, ${bg.g}, ${bg.b})`,
        };
    }
  };
})();

export const randomElementFrom = <T>(items: readonly T[]) =>
  items[Math.floor(Math.random() * items.length)];
