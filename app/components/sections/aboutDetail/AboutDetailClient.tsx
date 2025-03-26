"use client";

import { useThemeSetter } from "@/hooks/useThemeSetter";
import { urlForImage } from "@/sanity/lib/image";
import { AboutClientProps, Skill } from "@/types";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import {
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaEnvelope,
  FaFileAlt,
  FaArrowRight,
  FaLongArrowAltRight,
} from "react-icons/fa";
import {
  PiArrowFatLinesRightBold,
  PiArrowFatLinesRightThin,
} from "react-icons/pi";

export default function AboutDetailClient({
  about,
  skills,
  theme,
  elements,
}: AboutClientProps) {
  useThemeSetter(theme);

  if (!about || !theme || !elements) return null;

  // Sort skills by category and then by order or proficiency
  const groupedSkills = (skills || []).reduce(
    (acc, skill) => {
      const category = skill.category || "other";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );

  // Sort each category by order first, then by proficiency
  Object.keys(groupedSkills).forEach((category) => {
    groupedSkills[category].sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      if (a.order !== undefined) return -1;
      if (b.order !== undefined) return 1;
      return (b.proficiency || 0) - (a.proficiency || 0);
    });
  });

  // Default values
  const {
    name = "Name",
    role = "Role",
    profileImage,
    /*   shortBio = "", */
    fullBio,
    email,
    location,
    resumeURL,
    socialLinks,
  } = about;

  // categories in a specific order
  const categoryOrder = [
    "frontend",
    "backend",
    "languages",
    "frameworks",
    "tools",
    "devops",
    "other",
  ];

  const orderedCategories = categoryOrder.filter(
    (cat) => groupedSkills[cat]?.length > 0
  );

  const categoryTitles: Record<string, string> = {
    frontend: "Frontend Development",
    backend: "Backend Development",
    languages: "Programming Languages",
    frameworks: "Frameworks",
    tools: "Tools & Technologies",
    devops: "DevOps & Cloud",
    other: "Other Skills",
  };

  return (
    <div className="bg-theme-secondary-bg">
      <div className="container mx-auto px-6 max-w-[100rem] pb-20 pt-30">
        {/* Main title */}
        <h1 className="text-5xl md:text-6xl font-bold text-theme mb-16  text-center lg:text-left">
          &lt; About /&gt;
        </h1>

        {/* Profile image + Full bio*/}
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-20 mb-16">
          {/* Profile image */}
          <div className="w-full lg:w-1/4 self-start lg:self-auto">
            <div className="relative">
              {/* Image container */}
              <div className="w-full h-[28rem] md:h-[32rem] overflow-hidden relative z-10">
                {profileImage ? (
                  <Image
                    src={urlForImage(profileImage).url()}
                    alt={profileImage.alt || `Photo of ${name}`}
                    width={320}
                    height={560}
                    className="object-cover w-full h-full"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-gray-400 text-4xl">?</span>
                  </div>
                )}
              </div>

              {/* Background frame element */}
              <div
                className="absolute top-6 -left-1.5 sm:-left-2 -right-1.5 sm:-right-2 lg:-right-4 lg:left-3 
  border-5 border-gray-400 w-auto h-full z-9 bg-theme/10"></div>
            </div>

            <h2 className="text-xl md:text-1xl font-medium text-theme-accent mt-8 lg:mt-7 mb-6">
              #{role ? role.replace(/\s+/g, "") : ""}
            </h2>

            <div>
              <a
                href="/projects"
                className="w-3/4 inline-flex border-2 border-theme-accent/80 items-center justify-center  gap-2 px-6 py-3 bg-theme-accent/20 text-theme-secondary-text text-lg font-bold hover:opacity-80 transition-opacity group">
                <span>See my projects</span>
                <PiArrowFatLinesRightBold
                  size={22}
                  className="transform transition-all duration-500 group-hover:translate-x-3"
                />
              </a>
            </div>
          </div>

          {/* Full bio section */}
          {fullBio && (
            <div className="w-full lg:w-3/4 flex flex-col justify-center lg:h-auto lg:mt-0 overflow-x-hidden">
              <h2 className="text-3xl font-bold text-theme mb-6">I'm a</h2>
              <div className="prose prose-lg max-w-none text-theme opacity-90 overflow-x-visible">
                <p className="text-xl break-words">
                  <span>
                    Hi! My name is{" "}
                    <span className="font-bold text-theme-secondary-text">
                      {name}
                    </span>
                    .
                  </span>{" "}
                  <span className="inline-block w-full">
                    <PortableText
                      value={fullBio}
                      components={{
                        block: {
                          normal: ({ children }) => (
                            <span className="inline-block w-full">
                              {children}
                            </span>
                          ),
                        },
                      }}
                    />
                  </span>
                </p>
              </div>

              {/* Resume, using then needed */}
              <div className="flex gap-4 mt-8">
                {resumeURL && (
                  <a
                    href={resumeURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-theme-accent text-theme-secondary-text hover:opacity-80 transition-opacity">
                    <FaFileAlt size={20} />
                    <span>Resume</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/*  Skills section */}
        <div className="w-full">
          <h2 className="text-4xl font-bold text-theme mb-10">
            {" "}
            &#123; Skills &#125;
          </h2>

          {/* Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {orderedCategories.map((category) => (
              <div key={category} className="flex flex-col">
                {/* Category header */}
                <h3 className="text-2xl font-semibold text-theme-secondary-text mb-6 pb-2 border-b border-theme-accent/30">
                  {categoryTitles[category]}
                </h3>

                {/* Skills stacked in column */}
                <div className="flex flex-col gap-4">
                  {groupedSkills[category].map((skill) => (
                    <div
                      key={skill._id}
                      className="bg-white/5 p-2 hover:bg-white/10 transition-colors">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        {/* Logo and title */}
                        <div className="flex items-center gap-2 min-w-0">
                          {skill.logo && (
                            <div className="w-8 h-8 flex-shrink-0 rounded-md overflow-hidden bg-white/10">
                              <Image
                                src={urlForImage(skill.logo)
                                  .width(80)
                                  .height(80)
                                  .url()}
                                alt={`${skill.title} logo`}
                                width={32}
                                height={32}
                                className="object-contain w-full h-full"
                              />
                            </div>
                          )}
                          <h4 className="text-base font-medium text-theme truncate">
                            {skill.title}
                          </h4>
                        </div>

                        {/* Proficiency bar */}
                        <div className="flex gap-0.5 flex-shrink-0">
                          {Array.from({ length: 5 }).map((_, index) => {
                            const threshold = index * 20;
                            const nextThreshold = threshold + 20;

                            if (skill.proficiency >= nextThreshold) {
                              return (
                                <div
                                  key={index}
                                  className="w-4 h-4 md:w-5 md:h-5 rounded-sm bg-theme-accent"></div>
                              );
                            } else if (skill.proficiency >= threshold + 10) {
                              return (
                                <div
                                  key={index}
                                  className="w-4 h-4 md:w-5 md:h-5 rounded-sm relative overflow-hidden">
                                  <div className="absolute inset-0 w-1/2 bg-theme-accent"></div>
                                  <div className="absolute inset-0 left-1/2 bg-gray-200/20"></div>
                                </div>
                              );
                            } else {
                              return (
                                <div
                                  key={index}
                                  className="w-4 h-4 md:w-5 md:h-5 rounded-sm bg-gray-200/20"></div>
                              );
                            }
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
