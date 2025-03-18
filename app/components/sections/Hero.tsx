import { getAbout, getHero, getTheme } from "@/sanity/lib/queries";
import { About, Hero as HeroType, Theme } from "@/types";
import HeroClient from "./HeroClient";

export default async function Hero() {
  const hero: HeroType | null = await getHero();
  const about: About | null = await getAbout();
  const theme: Theme | null = await getTheme();

  // Pass the data as props to the client component
  return <HeroClient hero={hero} about={about} theme={theme} />;
}
