"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ThemeContextProps, ThemeProviderProps } from "./Types";

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme = {},
}) => {
  const [themeStyles, setThemeStyles] =
    useState<React.CSSProperties>(initialTheme);

  const setTheme = (styles: React.CSSProperties) => {
    setThemeStyles(styles);
  };

  // Updates theme styles on the client side
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(themeStyles).forEach(([key, value]) => {
      root.style.setProperty(key, value as string);
    });
  }, [themeStyles]);

  return (
    <ThemeContext.Provider value={{ themeStyles, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
