"use client";

import { useThemeSetter } from "@/hooks/useThemeSetter";
import { urlForImage } from "@/sanity/lib/image";
import { Project, ProjectListClientProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt, FaLink } from "react-icons/fa";
import { PiArrowFatLinesRightBold } from "react-icons/pi";

export default function ProjectListClient({
  projects,
  theme,
  elements,
  isProjectsPage = false,
}: ProjectListClientProps) {
  useThemeSetter(theme);

  if (!theme || !elements) return null;
  if (!projects || projects.length === 0) {
    return (
      <div className="py-20 bg-theme-bg w-full">
        <div className="container mx-auto px-4 max-w-[100rem]">
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

  // specific layouts based on number of projects
  const renderProjectGrid = () => {
    // default behavior for main page
    if (!isProjectsPage) {
      // show only first 3 projects on the main page
      const displayProjects = projects.slice(0, 3);
      const count = displayProjects.length;

      // with only 1 project
      if (count === 1) {
        return (
          <div className="flex justify-center">
            <div className="w-full md:w-2/3 lg:w-1/2">
              <ProjectCard project={displayProjects[0]} isLarge={true} />
            </div>
          </div>
        );
      }

      // with only 2 projects
      if (count === 2) {
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {displayProjects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                isLarge={false}
              />
            ))}
          </div>
        );
      }

      // default 3-column layout for 3 projects
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProjects.map((project) => (
            <ProjectCard key={project._id} project={project} isLarge={false} />
          ))}
        </div>
      );
    }

    // new behavior for the projects page
    const count = projects.length;

    if (count === 1) {
      // one project - full width
      return (
        <div className="grid grid-cols-1 gap-6">
          <ProjectCard project={projects[0]} isLarge={true} />
        </div>
      );
    } else if (count === 2) {
      // two projects - two cards side by side
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} isLarge={true} />
          ))}
        </div>
      );
    } else {
      // three or more projects - grid with three per row
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} isLarge={false} />
          ))}
        </div>
      );
    }
  };

  return (
    <section
      id="projects"
      className={`${isProjectsPage ? "py-40" : "py-25 md:py-50"} bg-theme-secondary-bg`}>
      <div className="container mx-auto px-4 max-w-[100rem]">
        <div className="w-full text-center mb-12">
          <div className="relative inline-block">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-theme mb-6">
              My Projects
            </h2>
            <div className="absolute  left-1/2 transform -translate-x-1/2 w-[120%] h-1 bg-theme"></div>
          </div>
        </div>
        <p className="text-3xl text-theme-secondary-text font-semibold opacity-80 text-center mb-12">
          Check out some of my recent work
        </p>

        {renderProjectGrid()}

        {/* button only shown on main page if there are more than 3 projects */}
        {!isProjectsPage && projects.length > 2 && (
          <div className="mt-8 flex justify-center">
            <Link
              href="/projects"
              className="px-7 py-3 text-center bg-theme-accent text-theme font-semibold text-lg lg:w-1/4 flex items-center justify-center gap-4 min-h-[3.5rem]
      relative overflow-hidden
      hover:text-theme-third-text
      focus:outline-none 
      focus:ring-2 
      focus:ring-theme-accent/50 
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
      hover:before:w-full
      group">
              <span className="relative z-10">VIEW ALL PROJECTS</span>
              <PiArrowFatLinesRightBold
                size={22}
                className=" relative z-10 transform transition-all duration-500 group-hover:translate-x-4"
              />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  isLarge = false,
}: {
  project: Project;
  isLarge?: boolean;
}) {
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
    <div
      className={`relative overflow-hidden shadow-md transition-all hover:shadow-xl ${isLarge ? "col-span-1" : ""}`}>
      {/* aspect ratio based on size */}
      <div
        className={`${isLarge ? "aspect-[16/9]" : "aspect-[4/3]"} w-full relative group`}>
        {mainImage ? (
          <Image
            src={urlForImage(mainImage).url()}
            alt={mainImage.alt || `Image of ${title}`}
            fill
            sizes={
              isLarge
                ? "(max-width: 768px) 100vw, 90vw"
                : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            }
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
            className="relative p-4 bg-transparent text-white hover:text-theme/90 transition-all duration-300 transform hover:scale-110 group/icon ">
            <FaLink size={isLarge ? 30 : 25} />
            {/* Tooltip */}
            <span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-black text-white text-sm py-1 px-2 rounded opacity-0 group-hover/icon:opacity-100 transition-opacity">
              View Details
            </span>
          </Link>
        </div>

        {/* External links */}
        <div className="absolute bottom-3 right-3 flex gap-2 z-10">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-2 rounded-full text-theme hover:text-theme-accent transition-colors group/gh">
              <FaGithub size={isLarge ? 20 : 16} />
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
              <FaExternalLinkAlt size={isLarge ? 18 : 14} />
              {/* Tooltip */}
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover/proj:opacity-100 transition-opacity">
                Live Project
              </span>
            </a>
          )}
        </div>
      </div>

      {/* Bottom info bar */}
      <div className="bg-theme-accent/60 py-2 px-3">
        {/* Technologies */}
        <div className="flex flex-wrap gap-1 mb-2">
          {technologies && technologies.length > 0 ? (
            <>
              {technologies.slice(0, isLarge ? 5 : 3).map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 bg-theme-third-accent/20 text-theme-secondary-text text-sm rounded font-bold shadow-xl">
                  {tech}
                </span>
              ))}
              {technologies.length > (isLarge ? 5 : 3) && (
                <span className="px-2 py-0.5 bg-theme-third-accent/20 text-theme-secondary-text text-sm rounded font-bold">
                  +{technologies.length - (isLarge ? 5 : 3)}
                </span>
              )}
            </>
          ) : null}
        </div>

        {/* Title */}
        <h3
          className={`${isLarge ? "text-2xl" : "text-xl"} font-bold text-theme-secondary-text truncate mb-2 mt-3`}>
          {title}
        </h3>

        {/* Description - only shown if large */}
        {isLarge && description && (
          <p className="text-theme-secondary-text/80 text-sm line-clamp-2 mb-2">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
