import { getSiteElements } from "@/sanity/lib/queries";
import NavigationClient from "./NavigationClient";
import { SiteElements } from "@/types";

export default async function Navigation() {
  const elements: SiteElements = await getSiteElements();

  return <NavigationClient elements={elements} />;
}
