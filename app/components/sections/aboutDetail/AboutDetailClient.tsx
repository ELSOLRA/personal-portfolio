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
} from "react-icons/fa";

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
    shortBio = "",
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
    "soft",
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
    soft: "Soft Skills",
    other: "Other Skills",
  };

  return (
    <div className="bg-theme-bg">
      <div className="container mx-auto px-4 max-w-[100rem] pb-20 pt-30">
        <div className="flex flex-col lg:flex-row">
          {/* Left side - profile Image + Bio */}
          <div className="w-full lg:w-1/2 lg:pr-8">
            {/* Container for side-by-side layout */}
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Image */}
              <div className="md:w-1/2">
                <div className="w-full h-96 md:h-120 overflow-hidden ">
                  {profileImage ? (
                    <Image
                      src={urlForImage(profileImage).url()}
                      alt={profileImage.alt || `Photo of ${name}`}
                      width={320}
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

              {/* Bio information */}
              <div className="md:w-1/2">
                <h1 className="text-4xl md:text-5xl font-bold text-theme mb-4">
                  {name}
                </h1>
                <h2 className="text-2xl md:text-3xl font-medium text-theme-accent mb-6">
                  {role}
                </h2>
                <div className="text-xl text-theme opacity-90 mb-8">
                  {shortBio}
                </div>

                {/* Resume */}
                <div className="flex gap-4 mb-10">
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
            </div>

            {/* Full Bio */}
            {fullBio && (
              <div className="mt-10">
                <h2 className="text-3xl font-bold text-theme mb-6">
                  Biography
                </h2>
                <div className="prose prose-lg max-w-none text-theme opacity-90">
                  <PortableText value={fullBio} />
                </div>
              </div>
            )}
          </div>
          {/* Right side - skills */}
          <div className="w-full lg:w-1/2 lg:pl-8 mt-10 lg:mt-0">
            <h2 className="text-3xl font-bold text-theme mb-10">Skills</h2>

            {/* Skill categories */}
            <div className="space-y-8">
              {orderedCategories.map((category) => (
                <div key={category}>
                  <h3 className="text-2xl font-semibold text-theme-accent mb-6">
                    {categoryTitles[category]}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 ">
                    {groupedSkills[category].map((skill) => (
                      <div
                        key={skill._id}
                        className="bg-white/5 p-1  hover:bg-white/10 transition-colors max-w-[250px] ">
                        <div className="flex items-center gap-2 mb-2">
                          {/* Logo and title */}
                          <div className="flex items-center gap-2">
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
                            <h4 className="text-base font-medium text-theme">
                              {skill.title}
                            </h4>
                          </div>

                          {/* Proficiency bar */}
                          <div className="flex gap-0.5 ml-auto">
                            {Array.from({ length: 5 }).map((_, index) => {
                              const threshold = index * 20;
                              const nextThreshold = threshold + 20;

                              if (skill.proficiency >= nextThreshold) {
                                return (
                                  <div
                                    key={index}
                                    className="w-5 h-5 rounded-sm bg-theme-accent"></div>
                                );
                              }
                              // half filled square (10% increments)
                              else if (skill.proficiency >= threshold + 10) {
                                return (
                                  <div
                                    key={index}
                                    className="w-5 h-5 rounded-sm relative overflow-hidden">
                                    <div className="absolute inset-0 w-1/2 bg-theme-accent"></div>
                                    <div className="absolute inset-0 left-1/2 bg-gray-200/20"></div>
                                  </div>
                                );
                              }
                              //
                              else {
                                return (
                                  <div
                                    key={index}
                                    className="w-5 h-5 rounded-sm bg-gray-200/20"></div>
                                );
                              }
                            })}
                          </div>
                        </div>

                        {/* Years of experience */}
                        {skill.yearsOfExperience !== undefined && (
                          <div className="text-sm text-theme-accent">
                            {skill.yearsOfExperience}{" "}
                            {skill.yearsOfExperience === 1 ? "year" : "years"}{" "}
                            of experience
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
