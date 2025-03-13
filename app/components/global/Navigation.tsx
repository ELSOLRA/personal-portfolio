import { getAbout } from "@/sanity/lib/queries";
import NavigationClient from "./NavigationClient";

export default async function Navigation() {
  const about = await getAbout();

  return <NavigationClient about={about} />;
}
