"use client";

import { useThemeSetter } from "@/hooks/useThemeSetter";
import { urlForImage } from "@/sanity/lib/image";
import { Project, Theme, SiteElements, ProjectsListClientProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt, FaLink } from "react-icons/fa";

export default function ProjectsListClient({
  projects,
  theme,
  elements,
}: ProjectsListClientProps) {
  useThemeSetter(theme);

  if (!theme || !elements) return null;
  if (!projects || projects.length === 0) {
    return (
      <div className="py-20 bg-theme-bg w-full">
        <div className="container mx-auto px-4  max-w-[100rem]">
          <h2 className="text-3xl font-bold text-theme text-center mb-6">
            Projects
          </h2>
          <p className="text-center text-theme opacity-80">
            No projects available yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section id="projects" className="py-20 bg-theme-bg">
      <div className="container mx-auto px-4 max-w-[100rem]">
        <h2 className="text-3xl font-bold text-theme text-center mb-2">
          Projects
        </h2>
        <p className="text-lg text-theme opacity-80 text-center mb-12">
          Check out some of my recent work
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const {
    title = "Project Title",
    description = "Project description goes here.",
    mainImage,
    technologies = [],
    projectUrl,
    githubUrl,
    slug,
  } = project;

  return (
    <div className="relative overflow-hidden shadow-md transition-all hover:shadow-xl">
      {/* Project image container, grouped for hover effects only on image */}
      <div className="aspect-[4/3] w-full relative group">
        {mainImage ? (
          <Image
            src={urlForImage(mainImage).url()}
            alt={mainImage.alt || `Image of ${title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover w-full h-full"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400 text-4xl">?</span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-700"></div>

        {/* View details icon  */}
        <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <Link
            href={`/projects/${slug?.current}`}
            className="relative p-4 bg-transparent text-white hover:text-theme-accent transition-all duration-300 transform hover:scale-110 group/icon">
            <FaLink size={25} />
            {/* Tooltip */}
            <span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-black text-white text-sm py-1 px-2 rounded opacity-0 group-hover/icon:opacity-100 transition-opacity">
              View Details
            </span>
          </Link>
        </div>

        {/* External links, positioned at bottom right of image */}
        <div className="absolute bottom-3 right-3 flex gap-2 z-10">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-2 rounded-full text-theme hover:text-theme-accent transition-colors group/gh">
              <FaGithub size={16} />
              {/* Tooltip */}
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover/gh:opacity-100 transition-opacity">
                GitHub
              </span>
            </a>
          )}
          {projectUrl && (
            <a
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-2 rounded-full text-theme hover:text-theme-accent transition-colors group/proj">
              <FaExternalLinkAlt size={14} />
              {/* Tooltip */}
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover/proj:opacity-100 transition-opacity">
                Live Project
              </span>
            </a>
          )}
        </div>
      </div>

      {/* Bottom info bar */}
      <div className="bg-theme-accent py-2 px-3">
        {/* Technologies */}
        <div className="flex flex-wrap gap-1 mb-2">
          {technologies && technologies.length > 0 ? (
            <>
              {technologies.slice(0, 3).map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 bg-theme-accent/10 text-theme-secondary-text text-sm rounded font-bold">
                  {tech}
                </span>
              ))}
              {technologies.length > 3 && (
                <span className="px-2 py-0.5 bg-theme-accent/10 text-theme-accent text-sm rounded font-bold">
                  +{technologies.length - 3}
                </span>
              )}
            </>
          ) : null}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-theme-secondary-text truncate mb-2 mt-3">
          {title}
        </h3>
      </div>
    </div>
  );
}
