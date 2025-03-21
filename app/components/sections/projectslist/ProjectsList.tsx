import {
  getProjects,
  getActiveTheme,
  getSiteElements,
} from "@/sanity/lib/queries";
import ProjectsListClient from "./ProjectsListClient";

export default async function ProjectsList() {
  const projects = await getProjects();
  const theme = await getActiveTheme();
  const elements = await getSiteElements();

  return (
    <ProjectsListClient projects={projects} theme={theme} elements={elements} />
  );
}
