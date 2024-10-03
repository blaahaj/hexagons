// colors taken from https://en.wikipedia.org/wiki/Pride_flag

const transgender = ["#5acffa", "#f5abb9", "#ffffff"];

const pansexual = ["#ff1b8d", "#ffd900", "#1bb3ff"];

const asexual = ["#000000", "#a4a4a4", "#ffffff", "#810081"];

const bisexual = ["#d70071", "#9c4e97", "#0035aa"];

const genderQueer = ["#b67fdd", "#ffffff", "#48821d"];

const nonBinary = ["#fff42f", "#ffffff", "#9c59d1", "#292929"];

const traditional = [
  "#e50000", // red
  "#ff8d00", // orange
  "#ffee00", // yellow
  "#008121", // green
  "#004cff", // blue
  "#760188", // purple
];

const progress = [...transgender, "#61360d", "#000000", ...traditional];

export const schemes = {
  transgender,
  pansexual,
  asexual,
  bisexual,
  genderQueer,
  nonBinary,
  progress,
} as const;
