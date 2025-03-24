import { getAbout, getActiveTheme } from "@/sanity/lib/queries";

import { About, Theme } from "@/types";
import ContactForm from "./ContactForm";

export default async function Contact() {
  const theme: Theme | null = await getActiveTheme();
  const about: About | null = await getAbout();

  return <ContactForm theme={theme} about={about} />;
}
