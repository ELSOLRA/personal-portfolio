import { getActiveTheme, getSiteElements } from "@/sanity/lib/queries";

import { SiteElements, Theme } from "@/types";
import NavigationClient from "./NavigationClient";

export default async function Navigation() {
  const elements: SiteElements = await getSiteElements();
  const theme: Theme | null = await getActiveTheme();

  return <NavigationClient elements={elements} theme={theme} />;
}
