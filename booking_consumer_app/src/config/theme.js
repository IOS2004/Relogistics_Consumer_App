import { DefaultTheme } from "react-native-paper";

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#1E40AF", // Blue
    secondary: "#64748B", // Gray
    accent: "#3B82F6",
    background: "#F8FAFC",
    surface: "#FFFFFF",
    text: "#1E293B",
    placeholder: "#94A3B8",
    error: "#EF4444",
    success: "#10B981",
    warning: "#F59E0B",
  },
  roundness: 12,
};

export const colors = {
  primary: "#1E40AF",
  primaryLight: "#3B82F6",
  primaryDark: "#1E3A8A",
  secondary: "#64748B",
  gray: {
    50: "#F8FAFC",
    100: "#F1F5F9",
    200: "#E2E8F0",
    300: "#CBD5E1",
    400: "#94A3B8",
    500: "#64748B",
    600: "#475569",
    700: "#334155",
    800: "#1E293B",
    900: "#0F172A",
  },
  white: "#FFFFFF",
  black: "#000000",
  success: "#10B981",
  error: "#EF4444",
  warning: "#F59E0B",
  info: "#3B82F6",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
  },
  small: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
  },
};
