import {
  getAbout,
  getActiveTheme,
  getSiteElements,
  getSkills,
} from "@/sanity/lib/queries";
import { About as AboutType, SiteElements, Skill, Theme } from "@/types";
import AboutDetailClient from "./AboutDetailClient";

export default async function AboutDetail() {
  // fetch data
  const about: AboutType | null = await getAbout();
  const skills: Skill[] = await getSkills();
  const theme: Theme | null = await getActiveTheme();
  const elements: SiteElements | null = await getSiteElements();

  return (
    <AboutDetailClient
      about={about}
      skills={skills}
      theme={theme}
      elements={elements}
    />
  );
}
