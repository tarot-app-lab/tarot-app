import { useColorScheme } from "react-native";

import { appTheme, type AppColorScheme } from "./tokens";

export function useAppTheme() {
  const systemScheme = useColorScheme();
  const colorScheme: AppColorScheme = systemScheme === "dark" ? "dark" : "light";

  return {
    colorScheme,
    colors: appTheme.colors[colorScheme],
    spacing: appTheme.spacing,
    typography: appTheme.typography
  };
}
