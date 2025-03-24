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

  // Format date if available
  const formattedDate = publishedAt
    ? format(new Date(publishedAt), "MMMM yyyy")
    : null;

  return (
    <div
      id="project-section"
      className="flex-grow flex flex-col md:flex-row bg-theme-bg">
      {/* Image Section - Left Side */}
      <div className="w-full md:w-2/5 flex md:justify-end justify-start items-center max-w-7xl">
        <div className="w-70 h-70 md:w-85 md:h-85 lg:w-120 lg:h-120 rounded-lg overflow-hidden mt-28 mx-8 mb-2 md:m-8">
          {mainImage ? (
            <Image
              src={urlForImage(mainImage).url()}
              alt={mainImage.alt || `Image of ${title}`}
              width={480}
              height={480}
              className="object-cover w-full h-full"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-400 text-4xl">?</span>
            </div>
          )}
        </div>
      </div>

      {/* Content Section - Right Side */}
      <div className="w-full md:w-3/5 flex items-center justify-start p-8 md:p-12 lg:pl-0">
        <div className="max-w-2xl w-full">
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
                    className="px-3 py-1 bg-theme-accent/20 text-theme-accent rounded-md text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Project Links */}
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

          {/* Back to Projects Button */}
          <div>
            <Link
              href="/projects"
              className="inline-block px-6 py-3 rounded-lg bg-theme-bg border border-theme-accent text-theme hover:bg-theme-accent/10 transition-colors">
              Back to Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
