/**
 * Design tokens for Remotion compositions.
 *
 * Mirrors the CSS variables defined in app/styles/shadcn-ui.css.
 * Remotion renders in a headless browser where CSS custom properties
 * from the Next.js app are not available, so we duplicate the values here.
 */

export const COLORS = {
  primary: "rgb(0, 150, 136)",
  primaryForeground: "rgb(255, 255, 255)",
  brandSecondary: "rgb(124, 58, 237)",
  brandSecondaryForeground: "rgb(255, 255, 255)",
  background: "rgb(255, 255, 255)",
  foreground: "rgb(10, 10, 10)",
  card: "rgb(255, 255, 255)",
  cardForeground: "rgb(10, 10, 10)",
  muted: "rgb(241, 245, 249)",
  mutedForeground: "rgb(100, 116, 139)",
  border: "rgb(226, 232, 240)",
  accent: "rgb(224, 242, 241)",
  accentForeground: "rgb(0, 77, 64)",
  destructive: "rgb(239, 68, 68)",

  categories: {
    fundamentals: "rgb(0, 150, 136)",
    rendering: "rgb(59, 130, 246)",
    optimization: "rgb(249, 115, 22)",
    "best-practices": "rgb(168, 85, 247)",
    advanced: "rgb(239, 68, 68)",
    architecture: "rgb(59, 130, 246)",
    testing: "rgb(249, 115, 22)",
  },

  gradients: {
    fundamentals: ["rgb(0, 150, 136)", "rgb(124, 58, 237)"] as const,
    rendering: ["#3b82f6", "#06b6d4"] as const,
    optimization: ["#f97316", "#f59e0b"] as const,
    "best-practices": ["#a855f7", "#ec4899"] as const,
    advanced: ["#ef4444", "#f43f5e"] as const,
  },
} as const;

export const DARK_COLORS = {
  primary: "rgb(0, 200, 180)",
  primaryForeground: "rgb(255, 255, 255)",
  brandSecondary: "rgb(157, 100, 255)",
  brandSecondaryForeground: "rgb(255, 255, 255)",
  background: "rgb(10, 10, 15)",
  foreground: "rgb(235, 235, 245)",
  card: "rgb(22, 24, 30)",
  cardForeground: "rgb(235, 235, 245)",
  muted: "rgb(30, 33, 42)",
  mutedForeground: "rgb(148, 163, 184)",
  border: "rgb(45, 50, 65)",
  accent: "rgb(15, 50, 45)",
  accentForeground: "rgb(0, 200, 180)",
  destructive: "rgb(248, 85, 85)",

  categories: {
    fundamentals: "rgb(0, 200, 180)",
    rendering: "rgb(80, 160, 255)",
    optimization: "rgb(255, 140, 50)",
    "best-practices": "rgb(190, 120, 255)",
    advanced: "rgb(248, 85, 85)",
    architecture: "rgb(80, 160, 255)",
    testing: "rgb(255, 140, 50)",
  },

  gradients: {
    fundamentals: ["rgb(0, 200, 180)", "rgb(157, 100, 255)"] as const,
    rendering: ["#50a0ff", "#06d6d4"] as const,
    optimization: ["#ff8c32", "#fbbf24"] as const,
    "best-practices": ["#be78ff", "#f472b6"] as const,
    advanced: ["#f85555", "#fb7185"] as const,
  },

  glow: {
    cyan: "rgba(0, 200, 220, 0.4)",
    green: "rgba(52, 211, 153, 0.5)",
    blue: "rgba(80, 160, 255, 0.4)",
    red: "rgba(248, 85, 85, 0.4)",
  },

  surface: {
    browserBg: "rgb(18, 20, 28)",
    browserTitleBar: "rgb(28, 32, 42)",
    browserBorder: "rgb(55, 60, 75)",
    gridLine: "rgba(255, 255, 255, 0.04)",
  },
} as const;

export const FONTS = {
  sans: "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
} as const;

export type CategoryType = keyof typeof COLORS.categories;
export type GradientType = keyof typeof COLORS.gradients;
