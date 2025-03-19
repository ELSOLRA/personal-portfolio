import { getSiteElements } from "@/sanity/lib/queries";
import NavigationClient from "./NavigationClient";

export default async function Navigation() {
  const elements = await getSiteElements();

  return <NavigationClient elements={elements} />;
}
