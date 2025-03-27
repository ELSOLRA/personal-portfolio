"use client";

import { useThemeSetter } from "@/hooks/useThemeSetter";
import { urlForImage } from "@/sanity/lib/image";
import { AboutClientProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function AboutClient({
  about,
  theme,
  elements,
}: AboutClientProps) {
  useThemeSetter(theme);

  if (!about || !theme || !elements) return null;

  // default values
  const {
    name = "John Doe",
    role = "Developer",
    profileImage,
    shortBio = "A passionate developer who loves creating intuitive user experiences.",
    socialLinks,
    resumeURL,
  } = about;

  return (
    <div id="about-section" className="bg-theme-bg w-full py-25 md:py-45">
      <div className="w-full max-w-[100rem] mx-auto">
        <div className="flex flex-col md:flex-row ">
          {/* Image section, left side */}
          <div className="w-full md:w-2/5 flex md:justify-end justify-start items-start max-w-7xl">
            <div className="w-80 h-80 md:w-96 md:h-96 lg:w-[32rem] lg:h-[32rem] overflow-hidden mt-4 mx-8 mb-2 md:m-8">
              {profileImage ? (
                <Image
                  src={urlForImage(profileImage).url()}
                  alt={profileImage.alt || `Photo of ${name}`}
                  width={512}
                  height={512}
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

          {/* Content section - right side */}
          <div className="w-full md:w-3/5 flex items-center justify-start p-8 md:p-8.5 md:px-8 xl:pl-10 ">
            <div className="flex flex-col h-full ">
              <h1 className="text-4xl md:text-5xl font-bold text-theme mt-auto mb-4">
                {name}
              </h1>
              <h3 className="text-xl md:text-2xl font-semibold text-theme opacity-80 mb-6">
                {role}
              </h3>

              {/* Short bio */}
              <div className="text-xl font-semibold text-theme opacity-90 mb-6">
                {shortBio}
              </div>

              {/* Social Media Links */}
              <div className="flex flex-row gap-4 items-center mb-4 md:mb-0 mt-auto">
                {/* More about me button */}

                <Link
                  href="/about"
                  className="inline-block px-6 py-3 bg-theme-accent text-theme hover:opacity-70 transition-colors">
                  MORE ABOUT ME
                </Link>

                <div className="flex gap-4 items-center">
                  {socialLinks?.github && (
                    <a
                      href={socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-theme hover:text-theme-accent transition-colors">
                      <FaGithub size={28} />
                    </a>
                  )}
                  {socialLinks?.linkedin && (
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-theme hover:text-theme-accent transition-colors">
                      <FaLinkedin size={28} />
                    </a>
                  )}
                </div>
              </div>

              {/* Resume Download Button */}
              {resumeURL && (
                <div>
                  <a
                    href={resumeURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 rounded-lg bg-theme-accent text-theme-button-text hover:bg-opacity-90 transition-colors">
                    Download Resume
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
