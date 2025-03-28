import {
  getProjects,
  getActiveTheme,
  getSiteElements,
} from "@/sanity/lib/queries";
import ProjectListClient from "./ProjectListClient";

export default async function ProjectList({ isProjectsPage = false }) {
  const projects = await getProjects();
  const theme = await getActiveTheme();
  const elements = await getSiteElements();

  return (
    <ProjectListClient
      projects={projects}
      theme={theme}
      elements={elements}
      isProjectsPage={isProjectsPage}
    />
  );
}
