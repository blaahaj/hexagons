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
