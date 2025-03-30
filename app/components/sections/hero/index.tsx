import {
  getAbout,
  getActiveTheme,
  getHero,
  getSiteElements,
} from "@/sanity/lib/queries";
import { About, Hero as HeroType, SiteElements, Theme } from "@/types";
import HeroClient from "./HeroClient";

export default async function Hero() {
  const hero: HeroType | null = await getHero();
  const about: About | null = await getAbout();
  const theme: Theme | null = await getActiveTheme();
  const elements: SiteElements = await getSiteElements();

  //  data as props to the client component
  return (
    <HeroClient hero={hero} about={about} theme={theme} elements={elements} />
  );
}
