import {
  getActiveTheme,
  getSiteElements,
  getAbout,
} from "@/sanity/lib/queries";
import FooterClient from "./FooterClient";
import { SiteElements, Theme, About } from "@/types";

export default async function Footer() {
  const elements: SiteElements = await getSiteElements();
  const theme: Theme | null = await getActiveTheme();
  const about: About | null = await getAbout();
  const socialLinks = about?.socialLinks;

  return (
    <FooterClient elements={elements} theme={theme} socialLinks={socialLinks} />
  );
}
