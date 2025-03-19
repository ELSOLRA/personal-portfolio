import { ReactNode } from "react";
import { CSSProperties } from "react";

export interface ThemeContextProps {
  themeStyles: CSSProperties;
  setTheme: (styles: CSSProperties) => void;
}

export interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: CSSProperties;
}
