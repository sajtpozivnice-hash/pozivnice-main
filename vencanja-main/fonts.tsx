import {
  Playfair_Display,
  Cormorant_Garamond,
  Inter,
  Roboto_Condensed,
  Lora,
  Dancing_Script,
  Parisienne,
  Great_Vibes,
} from "next/font/google";

export const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  variable: "--font-robotocondensed",
});

export const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

export const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancingscript",
});

export const parisienne = Parisienne({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-parisienne",
});

export const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-greatvibes",
});
