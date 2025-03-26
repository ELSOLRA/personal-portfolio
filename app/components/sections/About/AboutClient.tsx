"use client";

import { useThemeSetter } from "@/hooks/useThemeSetter";
import { urlForImage } from "@/sanity/lib/image";
import { AboutClientProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import {
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

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
    email,
    resumeURL,
    location,
  } = about;

  return (
    <div id="about-section" className="bg-theme-bg w-full py-20 md:py-50">
      <div className="w-full max-w-[100rem] mx-auto">
        {/* About Me heading with extended underline */}
        <div className="w-full text-center mb-12">
          <div className="relative inline-block">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-theme mb-6">
              About Me
            </h2>
            <div className="absolute  left-1/2 transform -translate-x-1/2 w-[120%] h-1 bg-theme"></div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
          {/* Image Section - Left Side */}
          <div className="w-full md:w-2/5 flex md:justify-end justify-start items-start max-w-7xl">
            <div className="w-70 h-70 md:w-78 md:h-78 lg:w-96 lg:h-96 overflow-hidden mt-4 mx-8 mb-2 md:m-8">
              {profileImage ? (
                <Image
                  src={urlForImage(profileImage).url()}
                  alt={profileImage.alt || `Photo of ${name}`}
                  width={384}
                  height={384}
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
          <div className="w-full md:w-3/5 flex items-start justify-start p-8 md:p-12 lg:pl-0">
            <div className="max-w-2xl w-full">
              <h1 className="text-4xl md:text-5xl font-bold text-theme mb-4">
                {name}
              </h1>
              <h3 className="text-xl md:text-2xl font-medium text-theme opacity-80 mb-6">
                {role}
              </h3>

              {/* Short Bio */}
              <div className="text-lg text-theme opacity-90 mb-6">
                {shortBio}
              </div>

              {/* Location and Contact Info */}
              <div className="flex flex-wrap mb-6">
                <div className="flex flex-col sm:flex-row sm:gap-6">
                  {location && (
                    <div className="flex items-center gap-2 text-theme opacity-80 mb-4 sm:mb-0">
                      <FaMapMarkerAlt className="h-5 w-5" />
                      <span>{location}</span>
                    </div>
                  )}
                  {email && (
                    <div className="flex items-center gap-2 text-theme opacity-80">
                      <FaEnvelope className="h-5 w-5" />
                      <a
                        href={`mailto:${email}`}
                        className="hover:text-theme-accent transition-colors">
                        {email}
                      </a>
                    </div>
                  )}
                </div>
              </div>
              {/* Social Media Links */}
              <div className="flex flex-row gap-4 items-center mb-4">
                {/* More about me button */}
                <div className="">
                  <Link
                    href="/about"
                    className="inline-block px-6 py-3 bg-theme-accent text-theme hover:opacity-70 transition-colors">
                    MORE ABOUT ME
                  </Link>
                </div>
                <div className="flex gap-4 justify-center">
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
