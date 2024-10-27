import { chemicalElements } from "./chemicalElements";
import { randomElementFrom } from "./randomThings";

type Alphabet = readonly (string | readonly [string, string, string])[];

const greekAlphabet = [
  "Αα",
  "Ββ",
  "Γγ",
  "Δδ",
  "Εε",
  "Ζζ",
  "Ηη",
  "Θθ",
  "Ιι",
  "Κκ",
  "Λλ",
  "Μμ",
  "Νν",
  "Ξξ",
  "Οο",
  "Ππ",
  "Ρρ",
  "Σσς",
  "Ττ",
  "Υυ",
  "Φφ",
  "Χχ",
  "Ψψ",
  "Ωω",
] as const;

export const greekUpper: Alphabet = greekAlphabet.map(s => s.substring(0, 1));
export const greekLower: Alphabet = greekAlphabet.flatMap(s =>
  s.substring(1).split("")
);
export const greekAll: Alphabet = greekAlphabet.flatMap(s => s.split(""));

export const baseSI: Alphabet = "s m kg A K mol cd".split(
  " "
) as readonly string[];
export const derivedSI: Alphabet =
  "rad sr Hz N Pa J W C V F Ω S Wb T H °C lm lx Bq Gy Sv kat".split(" ");
export const allSI: Alphabet = [...baseSI, ...derivedSI];

export const powers: Alphabet =
  "Q R Y Z E P T G M k h da  d c m μ n p f a z y r q".split(" ");

export const chemicalElementSymbols: Alphabet = chemicalElements.map(
  e => e.symbol
);
export const chemicalElementTriples: Alphabet = chemicalElements.map(e => [
  e.number.toString(),
  e.symbol,
  e.name,
]);
export const chemicalElementAll: Alphabet = [
  ...chemicalElementSymbols,
  ...chemicalElementTriples,
];

export const DISCO = "🪩";
export const STAR = "⭐️";
export const BEE = "🐝";

const alphabets: Alphabet[] = [
  greekUpper,
  greekLower,
  greekAll,
  baseSI,
  derivedSI,
  allSI,
  powers,
  chemicalElementSymbols,
  chemicalElementTriples,
  chemicalElementAll,
  [...allSI, ...powers],
  [...greekAll, ...allSI, ...powers, ...chemicalElementTriples],
] as const;

export const randomAlphabet = (availableAlphabets = alphabets) => {
  const chosenAlphabet = randomElementFrom(availableAlphabets);

  return (): string | readonly [string, string, string] => {
    const n = Math.random();
    if (n > 0.98) return "🪩";
    if (n > 0.96) return "⭐️";
    if (n > 0.94) return "🐝";
    return randomElementFrom(chosenAlphabet);
  };
};

export default alphabets;
