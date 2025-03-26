import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/app/components/global/navigation";
import { getActiveTheme } from "@/sanity/lib/queries";
import { Theme } from "@/types";
import { ThemeProvider } from "./context/ThemeContext";
import Footer from "@/app/components/global/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio - Paulius",
  description: "Personal portfolio website",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme: Theme | null = await getActiveTheme(); // fetching theme data

  // default values if theme data is missing
  const defaultTextColor = "#333333";
  const defaultAccentColor = "#48acda";
  const defaultBackgroundColor = "#f5e1c0";
  const defaultButtonTextColor = "#ffffff";

  //  initial theme styles from theme data or defaults
  const initialTheme: React.CSSProperties = {
    "--theme-text-color": theme?.textColor?.hex || defaultTextColor,
    "--theme-accent-color": theme?.accentColor?.hex || defaultAccentColor,
    "--theme-bg-color": theme?.backgroundColor?.hex || defaultBackgroundColor,
    "--theme-button-text-color": defaultButtonTextColor,
  } as React.CSSProperties;

  // initial theme styles in SSR
  const themeStyles = Object.entries(initialTheme)
    .map(([key, value]) => `${key}: ${value}`)
    .join("; ");

  return (
    <html lang="en">
      <head>
        {/* initial theme styles in SSR */}
        <style>{`:root { ${themeStyles} }`}</style>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex flex-col min-h-screen">
          <ThemeProvider initialTheme={initialTheme}>
            <Navigation />

            <main className="flex-grow flex flex-col bg-theme-secondary-bg">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
