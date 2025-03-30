"use client";

import { useThemeSetter } from "@/hooks/useThemeSetter";
import { urlForImage } from "@/sanity/lib/image";
import { ProjectClientProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import CustomButton from "@/app/components/ui/CustomButton";

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
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-theme-secondary-bg p-8 text-center">
        <h1 className="text-4xl font-bold text-theme mb-4">
          Project Not Found
        </h1>
        <p className="text-lg text-theme opacity-90 mb-6">
          Sorry, the project {slug && `"${slug}"`} is not available or does not
          exist.
        </p>

        <Link
          href="/projects"
          className="w-3/4 sm:w-1/3 inline-flex items-center justify-center px-6 py-3 min-h-[3.5rem] bg-theme-accent text-theme
      relative overflow-hidden
      hover:text-theme-third-text
      focus:outline-none 
      focus:ring-2 
      focus:ring-theme-accent 
      focus:ring-offset-2 
      disabled:opacity-50
      transition-all duration-300 
      before:absolute
      before:bottom-0
      before:left-0
      before:top-0
      before:z-0
      before:h-full
      before:w-0
      before:bg-theme/80
      before:transition-all
      before:duration-500
      hover:before:w-full">
          <span className="relative z-10 font-semibold">MORE PROJECTS</span>
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
          <div className="w-full lg:w-1/2 flex items-center justify-start lg:justify-end p-4 mt-20 sm:mt-0 lg:p-8">
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
              <h2 className="text-2xl font-medium text-theme-secondary-text/80 mb-1">
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
              <div className="text-xl text-theme-secondary-text opacity-90 mb-6">
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
                        className="px-3 py-1 bg-theme-third-accent/20 text-theme-secondary-text rounded-md text-sm shadow-xl">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Project links */}
              <div className="flex flex-col sm:flex-row gap-5 items-center mb-6">
                {projectUrl && (
                  <CustomButton
                    as="a"
                    href={projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    animation="left-to-right"
                    className="w-full sm:w-1/3 inline-flex gap-2 py-3 bg-theme-accent text-theme xl:text-lg hover:text-theme-third-text">
                    <span className="relative z-10 flex items-center gap-2">
                      <FaExternalLinkAlt size={18} />
                      View Project
                    </span>
                  </CustomButton>
                )}
                {githubUrl && (
                  <CustomButton
                    as="a"
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    animation="right-to-left"
                    className="w-full sm:w-1/3 inline-flex gap-2 py-3 border-2 border-theme-accent text-theme xl:text-lg hover:text-theme-third-text hover:border-transparent before:bg-theme">
                    <span className="relative z-10 flex items-center gap-2">
                      <FaGithub size={20} />
                      View Code
                    </span>
                  </CustomButton>
                )}
              </div>

              {/* Back to projects */}
              <div className="sm:w-1/3 ">
                <CustomButton
                  as="Link"
                  href="/projects"
                  animation="left-to-right"
                  className="w-full inline-flex py-3 bg-theme-accent text-theme xl:text-lg hover:text-theme-third-text">
                  <span className="relative z-10 font-semibold">
                    MORE PROJECTS
                  </span>
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
