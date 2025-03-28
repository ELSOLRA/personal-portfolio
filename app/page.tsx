import Hero from "@/app/components/sections/hero";
import About from "@/app/components/sections/about";

import ProjectsList from "@/app/components/sections/projectlist";
import Contact from "@/app/components/sections/contact";
import ScrollToHash from "@/app/components/global/ScrollToHash";

export default function Home() {
  return (
    <>
      <ScrollToHash />
      <Hero />

      <About />
      <ProjectsList />
      <Contact />
    </>
  );
}
