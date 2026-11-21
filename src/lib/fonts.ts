import {
  Inter,
  Plus_Jakarta_Sans,
  Poppins,
  Open_Sans,
  Montserrat,
  Lato,
  Playfair_Display,
  Source_Sans_3,
  Merriweather,
  Nunito_Sans,
  DM_Serif_Display,
  DM_Sans,
  Space_Grotesk,
  Outfit,
  Nunito,
  Raleway,
  Roboto,
  Lora,
  Work_Sans,
  Manrope,
} from "next/font/google";

// 1. Original (current fonts)
export const fontPlusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["600", "700", "800"],
  preload: false,
});

export const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
  preload: false,
});

// Modern Sans: Inter + Inter (already defined)

// Friendly: Poppins + Open Sans
export const fontPoppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["600", "700", "800"],
  preload: false,
});

export const fontOpenSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
  weight: ["400", "500", "600"],
  preload: false,
});

// Clean Pro: Montserrat + Lato
export const fontMontserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["600", "700", "800"],
  preload: false,
});

export const fontLato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
  weight: ["400", "700"],
  preload: false,
});

// Classic Serif: Playfair Display + Source Sans 3
export const fontPlayfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["600", "700", "800"],
  preload: false,
});

export const fontSourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
  weight: ["400", "500", "600"],
  preload: false,
});

// Editorial: Merriweather + Nunito Sans
export const fontMerriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  display: "swap",
  weight: ["700", "900"],
  preload: false,
});

export const fontNunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap",
  weight: ["400", "600"],
  preload: false,
});

// Elegant: DM Serif Display + DM Sans
export const fontDmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
  weight: ["400"],
  preload: false,
});

export const fontDmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "700"],
  preload: false,
});

// Bold Tech: Space Grotesk + Inter
export const fontSpaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["600", "700"],
  preload: false,
});

// Soft Round: Outfit + Nunito
export const fontOutfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["600", "700"],
  preload: false,
});

export const fontNunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
  weight: ["400", "600"],
  preload: false,
});

// Sharp: Raleway + Roboto
export const fontRaleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
  weight: ["600", "700", "800"],
  preload: false,
});

export const fontRoboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
  weight: ["400", "500"],
  preload: false,
});

// Warm Serif: Lora + Work Sans
export const fontLora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
  weight: ["600", "700"],
  preload: false,
});

export const fontWorkSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
  weight: ["400", "500", "600"],
  preload: false,
});

// Fresh: Plus Jakarta Sans + Manrope
export const fontManrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600"],
  preload: false,
});

export interface FontPreset {
  id: string;
  name: string;
  headingName: string;
  bodyName: string;
  headingVariable: string;
  bodyVariable: string;
}

export const FONT_PRESETS: Record<string, FontPreset> = {
  default: {
    id: "default",
    name: "Original",
    headingName: "Plus Jakarta Sans",
    bodyName: "Inter",
    headingVariable: "var(--font-jakarta)",
    bodyVariable: "var(--font-inter)",
  },
  modern: {
    id: "modern",
    name: "Modern Sans",
    headingName: "Inter",
    bodyName: "Inter",
    headingVariable: "var(--font-inter)",
    bodyVariable: "var(--font-inter)",
  },
  friendly: {
    id: "friendly",
    name: "Friendly",
    headingName: "Poppins",
    bodyName: "Open Sans",
    headingVariable: "var(--font-poppins)",
    bodyVariable: "var(--font-open-sans)",
  },
  clean: {
    id: "clean",
    name: "Clean Pro",
    headingName: "Montserrat",
    bodyName: "Lato",
    headingVariable: "var(--font-montserrat)",
    bodyVariable: "var(--font-lato)",
  },
  classic: {
    id: "classic",
    name: "Classic Serif",
    headingName: "Playfair Display",
    bodyName: "Source Sans 3",
    headingVariable: "var(--font-playfair)",
    bodyVariable: "var(--font-source-sans)",
  },
  editorial: {
    id: "editorial",
    name: "Editorial",
    headingName: "Merriweather",
    bodyName: "Nunito Sans",
    headingVariable: "var(--font-merriweather)",
    bodyVariable: "var(--font-nunito-sans)",
  },
  elegant: {
    id: "elegant",
    name: "Elegant",
    headingName: "DM Serif Display",
    bodyName: "DM Sans",
    headingVariable: "var(--font-dm-serif)",
    bodyVariable: "var(--font-dm-sans)",
  },
  bold: {
    id: "bold",
    name: "Bold Tech",
    headingName: "Space Grotesk",
    bodyName: "Inter",
    headingVariable: "var(--font-space-grotesk)",
    bodyVariable: "var(--font-inter)",
  },
  soft: {
    id: "soft",
    name: "Soft Round",
    headingName: "Outfit",
    bodyName: "Nunito",
    headingVariable: "var(--font-outfit)",
    bodyVariable: "var(--font-nunito)",
  },
  sharp: {
    id: "sharp",
    name: "Sharp",
    headingName: "Raleway",
    bodyName: "Roboto",
    headingVariable: "var(--font-raleway)",
    bodyVariable: "var(--font-roboto)",
  },
  warm: {
    id: "warm",
    name: "Warm Serif",
    headingName: "Lora",
    bodyName: "Work Sans",
    headingVariable: "var(--font-lora)",
    bodyVariable: "var(--font-work-sans)",
  },
  fresh: {
    id: "fresh",
    name: "Fresh",
    headingName: "Plus Jakarta Sans",
    bodyName: "Manrope",
    headingVariable: "var(--font-jakarta)",
    bodyVariable: "var(--font-manrope)",
  },
};

export const allFontVariables = [
  fontPlusJakarta.variable,
  fontInter.variable,
  fontPoppins.variable,
  fontOpenSans.variable,
  fontMontserrat.variable,
  fontLato.variable,
  fontPlayfair.variable,
  fontSourceSans.variable,
  fontMerriweather.variable,
  fontNunitoSans.variable,
  fontDmSerif.variable,
  fontDmSans.variable,
  fontSpaceGrotesk.variable,
  fontOutfit.variable,
  fontNunito.variable,
  fontRaleway.variable,
  fontRoboto.variable,
  fontLora.variable,
  fontWorkSans.variable,
  fontManrope.variable,
].join(" ");

export function getFontCss(preset: FontPreset): string {
  if (preset.id === "default") return "";
  return `:root {\n  --font-heading: ${preset.headingVariable}, system-ui, sans-serif;\n  --font-body: ${preset.bodyVariable}, system-ui, sans-serif;\n}`;
}
