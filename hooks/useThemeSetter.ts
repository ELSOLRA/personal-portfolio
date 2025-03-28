import { useEffect } from "react";
import { useTheme } from "@/app/context/ThemeContext";
import { Theme } from "@/types";

export function useThemeSetter(theme: Theme | null) {
  const { setTheme } = useTheme();

  useEffect(() => {
    if (theme) {
      setTheme({
        "--theme-text-color": theme.textColor?.hex || "#0145A1",
        "--theme-accent-color": theme.accentColor?.hex || "#48acda",
        "--theme-bg-color": theme.backgroundColor?.hex || "#f5e1c0",
        "--theme-secondary-text-color":
          theme.secondaryTextColor?.hex || "#333333",
        "--theme-secondary-accent-color":
          theme.secondaryAccentColor?.hex || "#2A6FB8",
        "--theme-secondary-bg-color":
          theme.secondaryBackgroundColor?.hex || "#D8CBAD",
        "--theme-third-text-color": theme.thirdTextColor?.hex || "#333333",
        "--theme-third-accent-color": theme.thirdAccentColor?.hex || "#2A6FB8",
        "--theme-third-bg-color": theme.thirdBackgroundColor?.hex || "#fff18b",
        "--theme-button-text-color": "#ffffff",
      } as React.CSSProperties);
    }
  }, [theme]);
}
