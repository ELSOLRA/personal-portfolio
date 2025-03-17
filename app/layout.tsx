import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/app/components/global/Navigation";
import { getHero } from "@/sanity/lib/queries";
import { Hero as HeroType } from "@/types";
import { ThemeProvider } from "./context/ThemeContext";

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
  const hero: HeroType | null = await getHero(); // fetching hero data

  // default values if hero data is missing
  const defaultTextColor = "#333333";
  const defaultAccentColor = "#48acda";
  const defaultBackgroundColor = "#f5e1c0";
  const defaultButtonTextColor = "#ffffff";

  //  initial theme styles from hero data or defaults
  const initialTheme: React.CSSProperties = {
    "--theme-text-color": hero?.textColor?.hex || defaultTextColor,
    "--theme-accent-color": hero?.accentColor?.hex || defaultAccentColor,
    "--theme-bg-color": hero?.backgroundColor?.hex || defaultBackgroundColor,
    "--theme-button-text-color": defaultButtonTextColor,
  } as React.CSSProperties;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex flex-col min-h-screen">
          <ThemeProvider initialTheme={initialTheme}>
            <Navigation />
            <main className="flex-grow">{children}</main>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
