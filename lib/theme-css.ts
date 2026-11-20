import type {
  BodyFontKey,
  CardShadowKey,
  DisplayFontKey,
  SiteTheme,
} from "@/lib/types/cms";

export const DISPLAY_FONTS: Record<
  DisplayFontKey,
  { label: string; sample: string; cssVar: string }
> = {
  outfit: {
    label: "Outfit (Actual)",
    sample: "Geométrica moderna y corporativa",
    cssVar: "var(--font-outfit), system-ui, sans-serif",
  },
  barlow: {
    label: "Barlow Condensed",
    sample: "Industrial compacta de ingeniería",
    cssVar: "var(--font-barlow), system-ui, sans-serif",
  },
  montserrat: {
    label: "Montserrat",
    sample: "Limpia, ancha y arquitectónica",
    cssVar: "var(--font-montserrat), system-ui, sans-serif",
  },
  playfair: {
    label: "Playfair Display",
    sample: "Editorial clásica de alto prestigio",
    cssVar: "var(--font-playfair), Georgia, serif",
  },
  inter: {
    label: "Inter",
    sample: "Neutra y ultra legible",
    cssVar: "var(--font-inter), system-ui, sans-serif",
  },
};

export const BODY_FONTS: Record<
  BodyFontKey,
  { label: string; sample: string; cssVar: string }
> = {
  plus_jakarta: {
    label: "Plus Jakarta Sans (Actual)",
    sample: "Clara, amigable y profesional",
    cssVar: "var(--font-jakarta), system-ui, sans-serif",
  },
  inter: {
    label: "Inter",
    sample: "Estándar digital de máxima lectura",
    cssVar: "var(--font-inter), system-ui, sans-serif",
  },
  dm_sans: {
    label: "DM Sans",
    sample: "Moderna y suave en pantallas",
    cssVar: "var(--font-dmsans), system-ui, sans-serif",
  },
  roboto: {
    label: "Roboto",
    sample: "Conocida y directa en formularios",
    cssVar: "var(--font-roboto), system-ui, sans-serif",
  },
  lato: {
    label: "Lato",
    sample: "Cálida y balanceada para lectura",
    cssVar: "var(--font-lato), system-ui, sans-serif",
  },
};

const SHADOW_MAP: Record<CardShadowKey, string> = {
  none: "none",
  sm: "0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.04)",
  md: "0 6px 16px -4px rgba(15, 23, 42, 0.08), 0 2px 6px -2px rgba(15, 23, 42, 0.04)",
  lg: "0 14px 30px -6px rgba(15, 23, 42, 0.12), 0 4px 10px -4px rgba(15, 23, 42, 0.06)",
};

function sanitizeHex(hex: string | undefined, fallback: string): string {
  if (!hex) return fallback;
  const cleaned = hex.trim();
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(cleaned)
    ? cleaned
    : fallback;
}

function clamp(val: number | undefined, min: number, max: number, fallback: number): number {
  if (typeof val !== "number" || Number.isNaN(val)) return fallback;
  return Math.min(max, Math.max(min, val));
}

export function buildThemeCssVars(theme: SiteTheme): Record<string, string> {
  const displayFont = DISPLAY_FONTS[theme.displayFont]?.cssVar ?? DISPLAY_FONTS.outfit.cssVar;
  const bodyFont = BODY_FONTS[theme.bodyFont]?.cssVar ?? BODY_FONTS.plus_jakarta.cssVar;

  const brandOrange = sanitizeHex(theme.brandOrange, "#FF5000");
  const brandOrangeDark = sanitizeHex(theme.brandOrangeDark, "#CC4000");
  const inkAnthracite = sanitizeHex(theme.inkAnthracite, "#0F172A");
  const inkMid = sanitizeHex(theme.inkMid, "#52525B");
  const surfaceWhite = sanitizeHex(theme.surfaceWhite, "#FFFFFF");
  const surfaceCream = sanitizeHex(theme.surfaceCream, "#F8FAFC");
  const dividerColor = sanitizeHex(theme.dividerColor, "#E4E4E7");

  const textScale = clamp(theme.textScale, 0.85, 1.35, 1);
  const headingScale = clamp(theme.headingScale, 0.8, 1.35, 1);
  const lineHeight = clamp(theme.lineHeight, 1.3, 2.0, 1.65);
  const sectionPy = clamp(theme.sectionPy, 36, 150, 88);
  const gridGap = clamp(theme.gridGap, 10, 56, 24);
  const containerMax = clamp(theme.containerMax, 960, 1480, 1280);
  const borderWidth = clamp(theme.borderWidth, 0, 4, 1);
  const dividerWidth = clamp(theme.dividerWidth, 0, 4, 1);
  const cardRadius = clamp(theme.cardRadius, 0, 28, 2);
  const cardPadding = clamp(theme.cardPadding, 14, 48, 28);
  const btnRadius = clamp(theme.btnRadius, 0, 999, 2);
  const cardShadow = SHADOW_MAP[theme.cardShadow] ?? SHADOW_MAP.sm;

  return {
    "--color-brand-orange": brandOrange,
    "--color-brand-orange-hover": brandOrange,
    "--color-brand-orange-dark": brandOrangeDark,
    "--color-ink-anthracite": inkAnthracite,
    "--color-ink-mid": inkMid,
    "--color-surface-white": surfaceWhite,
    "--color-surface-cream": surfaceCream,
    "--color-divider": dividerColor,
    "--tr-font-display": displayFont,
    "--tr-font-sans": bodyFont,
    "--tr-text-scale": String(textScale),
    "--tr-heading-scale": String(headingScale),
    "--tr-line-height": String(lineHeight),
    "--tr-section-py": `${sectionPy}px`,
    "--tr-grid-gap": `${gridGap}px`,
    "--tr-container-max": `${containerMax}px`,
    "--tr-border-width": `${borderWidth}px`,
    "--tr-divider-width": `${dividerWidth}px`,
    "--tr-card-radius": `${cardRadius}px`,
    "--tr-card-shadow": cardShadow,
    "--tr-card-padding": `${cardPadding}px`,
    "--tr-btn-radius": `${btnRadius}px`,
  };
}

export function themeToStyleString(theme: SiteTheme): string {
  const vars = buildThemeCssVars(theme);
  const body = Object.entries(vars)
    .map(([k, v]) => `${k}:${v};`)
    .join("");
  return `.tr-public-site{${body}}html:has(.tr-public-site){--tr-text-scale:${vars["--tr-text-scale"]};font-size:calc(16px * var(--tr-text-scale));}`;
}

function hexToRgb(hex: string): [number, number, number] {
  let clean = hex.replace("#", "").trim();
  if (clean.length === 3) {
    clean = clean
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return [0, 0, 0];
  return [
    parseInt(clean.slice(0, 2), 16),
    parseInt(clean.slice(2, 4), 16),
    parseInt(clean.slice(4, 6), 16),
  ];
}

function relativeLuminance([r, g, b]: [number, number, number]): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function getContrastRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(hexToRgb(hex1));
  const l2 = relativeLuminance(hexToRgb(hex2));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return Number(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
}

export function getContrastStatus(ratio: number): {
  level: "AAA" | "AA" | "LOW";
  label: string;
} {
  if (ratio >= 7) return { level: "AAA", label: "Excelente contraste" };
  if (ratio >= 4.5) return { level: "AA", label: "Buen contraste" };
  return { level: "LOW", label: "Contraste bajo (difícil de leer)" };
}
