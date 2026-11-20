export interface ThemePalette {
  id: string;
  name: string;
  tokens: {
    "brand-primary": string;
    "brand-primary-hover": string;
    "brand-primary-light": string;
    "brand-primary-muted": string;
    "brand-accent": string;
    "brand-accent-hover": string;
    "brand-accent-light": string;
    "brand-accent-bright": string;
    "brand-accent-on-dark": string;
    "bg-tint": string;
    "surface-subtle": string;
  };
}

export const PALETTES: Record<string, ThemePalette> = {
  default: {
    id: "default",
    name: "Clinical Emerald",
    tokens: {
      "brand-primary": "#0F172A",
      "brand-primary-hover": "#020617",
      "brand-primary-light": "#1E293B",
      "brand-primary-muted": "#334155",
      "brand-accent": "#059669",
      "brand-accent-hover": "#047857",
      "brand-accent-light": "#ECFDF5",
      "brand-accent-bright": "#10B981",
      "brand-accent-on-dark": "#34D399",
      "bg-tint": "#F1F5F9",
      "surface-subtle": "#F8FAFC",
    },
  },
  cobalt: {
    id: "cobalt",
    name: "Cobalt Health",
    tokens: {
      "brand-primary": "#0B192C",
      "brand-primary-hover": "#050D18",
      "brand-primary-light": "#14283F",
      "brand-primary-muted": "#2A3F57",
      "brand-accent": "#0284C7",
      "brand-accent-hover": "#0369A1",
      "brand-accent-light": "#E0F2FE",
      "brand-accent-bright": "#0EA5E9",
      "brand-accent-on-dark": "#38BDF8",
      "bg-tint": "#F0F9FF",
      "surface-subtle": "#F8FCFF",
    },
  },
  slate: {
    id: "slate",
    name: "Medical Slate",
    tokens: {
      "brand-primary": "#18181B",
      "brand-primary-hover": "#09090B",
      "brand-primary-light": "#27272A",
      "brand-primary-muted": "#3F3F46",
      "brand-accent": "#0D9488",
      "brand-accent-hover": "#0F766E",
      "brand-accent-light": "#F0FDFA",
      "brand-accent-bright": "#14B8A6",
      "brand-accent-on-dark": "#2DD4BF",
      "bg-tint": "#F4F4F5",
      "surface-subtle": "#FAFAFA",
    },
  },
  indigo: {
    id: "indigo",
    name: "Royal Indigo",
    tokens: {
      "brand-primary": "#1E1B4B",
      "brand-primary-hover": "#0F0D2E",
      "brand-primary-light": "#312E81",
      "brand-primary-muted": "#3F3C6B",
      "brand-accent": "#4F46E5",
      "brand-accent-hover": "#4338CA",
      "brand-accent-light": "#EEF2FF",
      "brand-accent-bright": "#6366F1",
      "brand-accent-on-dark": "#A5B4FC",
      "bg-tint": "#F5F5FF",
      "surface-subtle": "#FAFAFF",
    },
  },
  terracotta: {
    id: "terracotta",
    name: "Terracotta",
    tokens: {
      "brand-primary": "#2B1810",
      "brand-primary-hover": "#170C07",
      "brand-primary-light": "#3F2418",
      "brand-primary-muted": "#5A3A2B",
      "brand-accent": "#C2410C",
      "brand-accent-hover": "#9A3412",
      "brand-accent-light": "#FFF7ED",
      "brand-accent-bright": "#EA580C",
      "brand-accent-on-dark": "#FB923C",
      "bg-tint": "#FAF5F0",
      "surface-subtle": "#FDFAF7",
    },
  },
  crimson: {
    id: "crimson",
    name: "Crimson",
    tokens: {
      "brand-primary": "#2A0A12",
      "brand-primary-hover": "#160509",
      "brand-primary-light": "#44111F",
      "brand-primary-muted": "#5F2A38",
      "brand-accent": "#BE123C",
      "brand-accent-hover": "#9F1239",
      "brand-accent-light": "#FFF1F2",
      "brand-accent-bright": "#E11D48",
      "brand-accent-on-dark": "#FB7185",
      "bg-tint": "#FBF3F4",
      "surface-subtle": "#FEF9FA",
    },
  },
  bronze: {
    id: "bronze",
    name: "Golden Bronze",
    tokens: {
      "brand-primary": "#1C1410",
      "brand-primary-hover": "#0C0805",
      "brand-primary-light": "#2E2119",
      "brand-primary-muted": "#4A3829",
      "brand-accent": "#A16207",
      "brand-accent-hover": "#854D0E",
      "brand-accent-light": "#FEFCE8",
      "brand-accent-bright": "#CA8A04",
      "brand-accent-on-dark": "#FACC15",
      "bg-tint": "#FAF7F0",
      "surface-subtle": "#FDFCF8",
    },
  },
  rosewood: {
    id: "rosewood",
    name: "Rosewood",
    tokens: {
      "brand-primary": "#2D1520",
      "brand-primary-hover": "#1A0B12",
      "brand-primary-light": "#43212F",
      "brand-primary-muted": "#5C3445",
      "brand-accent": "#9D174D",
      "brand-accent-hover": "#831843",
      "brand-accent-light": "#FDF2F8",
      "brand-accent-bright": "#DB2777",
      "brand-accent-on-dark": "#F472B6",
      "bg-tint": "#FBF4F7",
      "surface-subtle": "#FEF9FB",
    },
  },
  amethyst: {
    id: "amethyst",
    name: "Amethyst",
    tokens: {
      "brand-primary": "#2E1065",
      "brand-primary-hover": "#1A0638",
      "brand-primary-light": "#4C1D95",
      "brand-primary-muted": "#5B3A8C",
      "brand-accent": "#7C3AED",
      "brand-accent-hover": "#6D28D9",
      "brand-accent-light": "#F5F3FF",
      "brand-accent-bright": "#8B5CF6",
      "brand-accent-on-dark": "#C4B5FD",
      "bg-tint": "#F8F5FF",
      "surface-subtle": "#FCFAFF",
    },
  },
  graphite: {
    id: "graphite",
    name: "Graphite",
    tokens: {
      "brand-primary": "#111111",
      "brand-primary-hover": "#000000",
      "brand-primary-light": "#262626",
      "brand-primary-muted": "#404040",
      "brand-accent": "#525252",
      "brand-accent-hover": "#404040",
      "brand-accent-light": "#F5F5F5",
      "brand-accent-bright": "#737373",
      "brand-accent-on-dark": "#D4D4D4",
      "bg-tint": "#F5F5F5",
      "surface-subtle": "#FAFAFA",
    },
  },
  olive: {
    id: "olive",
    name: "Olive Grove",
    tokens: {
      "brand-primary": "#1F2410",
      "brand-primary-hover": "#10130A",
      "brand-primary-light": "#2F3618",
      "brand-primary-muted": "#4A5230",
      "brand-accent": "#4D7C0F",
      "brand-accent-hover": "#3F6212",
      "brand-accent-light": "#F7FEE7",
      "brand-accent-bright": "#65A30D",
      "brand-accent-on-dark": "#A3E635",
      "bg-tint": "#F7F8F0",
      "surface-subtle": "#FBFCF7",
    },
  },
  aqua: {
    id: "aqua",
    name: "Deep Aqua",
    tokens: {
      "brand-primary": "#0C2A36",
      "brand-primary-hover": "#051820",
      "brand-primary-light": "#123C4C",
      "brand-primary-muted": "#2A5666",
      "brand-accent": "#0E7490",
      "brand-accent-hover": "#155E75",
      "brand-accent-light": "#ECFEFF",
      "brand-accent-bright": "#06B6D4",
      "brand-accent-on-dark": "#67E8F9",
      "bg-tint": "#F0F9FA",
      "surface-subtle": "#F8FDFE",
    },
  },
};

export function getPaletteCss(palette: ThemePalette): string {
  if (palette.id === "default") return "";
  const vars = Object.entries(palette.tokens)
    .map(([key, val]) => `  --${key}: ${val};`)
    .join("\n");
  return `:root {\n${vars}\n}`;
}
