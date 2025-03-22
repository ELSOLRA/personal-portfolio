import { getActiveTheme } from "@/sanity/lib/queries";

import { Theme } from "@/types";
import ContactForm from "./ContactForm";

export default async function Contact() {
  const theme: Theme | null = await getActiveTheme();

  return <ContactForm theme={theme} />;
}
