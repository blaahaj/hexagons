// colors taken from https://en.wikipedia.org/wiki/Pride_flag

export interface ColorScheme {
  weightedColors: Record<string, number>;
}

const transgender: ColorScheme = {
  weightedColors: {
    "#5acffa": 2, // blue
    "#f5abb9": 2, // pink
    "#ffffff": 1, // white
  },
};

const pansexual: ColorScheme = {
  weightedColors: {
    "#ff1b8d": 1, // pink
    "#ffd900": 1, // yellow
    "#1bb3ff": 1, // blue
  },
};

const asexual: ColorScheme = {
  weightedColors: {
    "#000000": 1, // black
    "#a4a4a4": 1, // grey
    "#ffffff": 1, // white
    "#810081": 1, // plum
  },
};

const bisexual: ColorScheme = {
  weightedColors: {
    "#d70071": 2, // pink
    "#9c4e97": 1, // purple
    "#0035aa": 2, // blue
  },
};

const genderQueer: ColorScheme = {
  weightedColors: {
    "#b67fdd": 1, // lilac
    "#ffffff": 1, // white
    "#48821d": 1, // green
  },
};

const nonBinary: ColorScheme = {
  weightedColors: {
    "#fff42f": 1, // yellow
    "#ffffff": 1, // white
    "#9c59d1": 1, // lavender
    "#292929": 1, // black
  },
};

const traditional: ColorScheme = {
  weightedColors: {
    "#e50000": 1, // red
    "#ff8d00": 1, // orange
    "#ffee00": 1, // yellow
    "#008121": 1, // green
    "#004cff": 1, // blue
    "#760188": 1, // purple
  },
};

export const schemes: Record<string, ColorScheme> = {
  transgender,
  pansexual,
  asexual,
  bisexual,
  genderQueer,
  nonBinary,
  traditional,
} as const;
