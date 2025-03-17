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
  const [isMounted, setIsMounted] = useState(false);

  const setTheme = (styles: React.CSSProperties) => {
    setThemeStyles(styles);
  };

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(themeStyles).forEach(([key, value]) => {
      root.style.setProperty(key, value as string);
    });
    // marking the component as mounted after the initial theme is applied
    setIsMounted(true);
  }, [themeStyles]);

  return (
    <ThemeContext.Provider value={{ themeStyles, setTheme }}>
      <div
        className={
          isMounted ? "" : "opacity-0 transition-opacity duration-300"
        }>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
