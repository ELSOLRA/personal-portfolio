import {
  getAbout,
  getActiveTheme,
  getSiteElements,
} from "@/sanity/lib/queries";

import { About as AboutType, SiteElements, Theme } from "@/types";
import AboutClient from "./AboutClient";

export default async function About() {
  const about: AboutType | null = await getAbout();
  const theme: Theme | null = await getActiveTheme();
  const elements: SiteElements = await getSiteElements();

  //  data as props to the client component
  return <AboutClient about={about} theme={theme} elements={elements} />;
}
