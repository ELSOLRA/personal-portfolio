import { getAbout, getActiveTheme } from "@/sanity/lib/queries";
import AboutClient from "./AboutClient";
import { About as AboutType, Theme } from "@/types";

export default async function About() {
  const about: AboutType | null = await getAbout();
  const theme: Theme | null = await getActiveTheme();

  //  data as props to the client component
  return <AboutClient about={about} theme={theme} />;
}
