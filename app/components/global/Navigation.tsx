import { getActiveTheme, getSiteElements } from "@/sanity/lib/queries";
import NavigationClient from "./NavigationClient";
import { SiteElements, Theme } from "@/types";

export default async function Navigation() {
  const elements: SiteElements = await getSiteElements();
  const theme: Theme | null = await getActiveTheme();

  return <NavigationClient elements={elements} theme={theme} />;
}
