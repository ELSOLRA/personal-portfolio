"use client";

import { useThemeSetter } from "@/hooks/useThemeSetter";
import { urlForImage } from "@/sanity/lib/image";
import { ProjectClientProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function ProjectClient({
  project,
  theme,
  elements,
  slug,
}: ProjectClientProps) {
  useThemeSetter(theme);

  if (!theme || !elements) return null;
  if (!project) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-theme-bg p-8 text-center">
        <h1 className="text-4xl font-bold text-theme mb-4">
          Project Not Found
        </h1>
        <p className="text-lg text-theme opacity-90 mb-6">
          Sorry, the project {slug && `"${slug}"`} is not available or does not
          exist.
        </p>
        <Link
          href="/projects"
          className="inline-block px-6 py-3 rounded-lg bg-theme-accent text-theme-secondary-text hover:opacity-70 transition-colors">
          Back to Projects
        </Link>
      </div>
    );
  }
  // default values
  const {
    title = "Project Title",
    description = "Project description goes here.",
    mainImage,
    technologies = [],
    projectUrl,
    githubUrl,
    publishedAt,
  } = project;

  // formating date if available
  const formattedDate = publishedAt
    ? format(new Date(publishedAt), "MMMM yyyy")
    : null;

  return (
    <div
      id="project-section"
      className="flex-grow bg-theme-secondary-bg flex mb-20 sm:mt-20 sm:mb-0 items-center">
      <div className="container mx-auto px-4 max-w-[100rem]">
        <div className="flex flex-col lg:flex-row ">
          {/* Image - left side */}
          <div className="w-full lg:w-1/2 flex items-center justify-start lg:justify-end p-4 lg:p-8">
            <div className="w-full aspect-[4/3] max-w-[800px] rounded-lg overflow-hidden ">
              {mainImage ? (
                <Image
                  src={urlForImage(mainImage).url()}
                  alt={mainImage.alt || `Image of ${title}`}
                  width={800}
                  height={600}
                  className="object-contain w-full h-full object-left lg:object-right"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <span className="text-gray-400 text-4xl">?</span>
                </div>
              )}
            </div>
          </div>

          {/* Content - right side */}
          <div className="w-full lg:w-1/2 flex items-center justify-start p-4 lg:p-8">
            <div className="w-full">
              <h2 className="text-2xl font-medium text-theme-accent mb-1">
                Project Details
              </h2>
              <h1 className="text-4xl md:text-5xl font-bold text-theme mb-4">
                {title}
              </h1>
              {formattedDate && (
                <h3 className="text-xl md:text-2xl font-medium text-theme opacity-80 mb-6">
                  {formattedDate}
                </h3>
              )}

              {/* Description */}
              <div className="text-lg text-theme opacity-90 mb-6">
                {description}
              </div>

              {/* Technologies */}
              {technologies.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-medium text-theme mb-2">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-theme-accent/20 text-theme-secondary-text rounded-md text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Project links */}
              <div className="flex flex-row gap-4 items-center mb-6">
                {projectUrl && (
                  <a
                    href={projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-theme-accent text-theme-secondary-text hover:opacity-70 transition-colors">
                    <FaExternalLinkAlt size={16} />
                    View Project
                  </a>
                )}
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-theme-accent text-theme-accent hover:bg-white/10 transition-colors">
                    <FaGithub size={18} />
                    View Code
                  </a>
                )}
              </div>

              {/* Back to projects */}
              <div>
                <Link
                  href="/projects"
                  className="inline-block px-6 py-3  bg-theme-accent border border-theme-accent text-theme hover:bg-theme-accent/10 transition-colors">
                  More Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
