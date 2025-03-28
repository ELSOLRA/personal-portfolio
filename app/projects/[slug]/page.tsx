import Project from "@/app/components/sections/project";
import { ProjectPageProps } from "@/types";

export default function ProjectPage({ params }: ProjectPageProps) {
  return (
    <>
      <Project params={params} />
    </>
  );
}
