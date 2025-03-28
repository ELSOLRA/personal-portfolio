import Hero from "@/app/components/sections/hero";
import About from "@/app/components/sections/about";

import ProjectsList from "@/app/components/sections/projectlist";
import Contact from "@/app/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />

      <About />
      <ProjectsList />
      <Contact />
    </>
  );
}
