export const colorTokens = {
  light: {
    background: "#fbfaf7",
    surface: "#ffffff",
    surfaceMuted: "#f1ece5",
    text: "#1f1b16",
    textMuted: "#6f655b",
    border: "#ded6cc",
    accent: "#f97316",
    accentStrong: "#c2410c"
  },
  dark: {
    background: "#101010",
    surface: "#1a1a1a",
    surfaceMuted: "#272321",
    text: "#f7f0e8",
    textMuted: "#b7aaa0",
    border: "#3a332e",
    accent: "#fdba74",
    accentStrong: "#fb923c"
  }
} as const;

export const spacingTokens = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  "2xl": 48
} as const;

export const typographyTokens = {
  display: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "700"
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "600"
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400"
  },
  caption: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "400"
  }
} as const;

export type AppColorScheme = keyof typeof colorTokens;

export const appTheme = {
  colors: colorTokens,
  spacing: spacingTokens,
  typography: typographyTokens
} as const;
