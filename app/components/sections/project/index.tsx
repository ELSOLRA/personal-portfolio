import {
  getProjectBySlug,
  getActiveTheme,
  getSiteElements,
} from "@/sanity/lib/queries";
import {
  ProjectPageProps,
  Project as ProjectType,
  SiteElements,
  Theme,
} from "@/types";
import { notFound } from "next/navigation";
import ProjectClient from "./ProjectClient";

export default async function Project({ params }: ProjectPageProps) {
  // asynchronous access of params.slug
  const { slug } = await params;

  try {
    // Fetching  data

    const project: ProjectType = await getProjectBySlug(slug);
    const theme: Theme | null = await getActiveTheme();
    const elements: SiteElements = await getSiteElements();

    if (!project) {
      notFound();
    }

    return (
      <ProjectClient
        project={project}
        theme={theme}
        elements={elements}
        slug={slug}
      />
    );
  } catch (error) {
    console.error("Error fetching project:", error);
    //  passing theme and elements, but with null project
    const theme = await getActiveTheme();
    const elements = await getSiteElements();

    return (
      <ProjectClient
        project={null}
        theme={theme}
        elements={elements}
        slug={slug}
      />
    );
  }
}
