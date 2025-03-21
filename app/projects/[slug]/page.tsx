import Project from "@/app/components/project/Project";
import { ProjectPageProps } from "@/types";

export default function ProjectPage({ params }: ProjectPageProps) {
  return (
    <>
      <Project params={params} />
    </>
  );
}
