"use client";

import { useTheme } from "@/app/context/ThemeContext";
import { useThemeSetter } from "@/hooks/useThemeSetter";
import { urlForImage } from "@/sanity/lib/image";
import { AboutClientProps } from "@/types";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
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
    fullBio,
    socialLinks,
    email,
    resumeURL,
    location,
  } = about;

  return (
    <div
      id="about-section"
      className="min-h-[80vh] flex flex-col md:flex-row bg-theme-bg w-full">
      {/* Image Section - Left Side */}
      <div className="w-full max-w-[100rem] mx-auto flex flex-col md:flex-row">
        <div className="w-full md:w-2/5 flex md:justify-end justify-start items-center   max-w-7xl">
          <div className="w-70 h-70 md:w-78 md:h-78 lg:w-96 lg:h-96 rounded-lg overflow-hidden mt-20 mx-8 mb-2 md:m-8 ">
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
        <div className="w-full md:w-3/5 flex items-center justify-start p-8 md:p-12 lg:pl-0 ">
          <div className="max-w-2xl w-full">
            <h2 className="text-2xl font-medium text-theme-accent mb-1">
              About Me
            </h2>
            <h1 className="text-4xl md:text-5xl font-bold text-theme mb-4">
              {name}
            </h1>
            <h3 className="text-xl md:text-2xl font-medium text-theme opacity-80 mb-6">
              {role}
            </h3>

            {/* Short Bio */}
            <div className="text-lg text-theme opacity-90 mb-6">{shortBio}</div>

            {/* Full Bio */}
            {fullBio && (
              <div className="text-theme opacity-80 prose prose-lg max-w-none mb-6">
                <PortableText value={fullBio} />
              </div>
            )}

            {/* Location and Contact Info */}
            <div className="flex flex-wrap gap-y-2 mb-6">
              {location && (
                <div className="w-full md:w-1/2 flex items-center gap-2 text-theme opacity-80">
                  <FaMapMarkerAlt className="h-5 w-5" />
                  <span>{location}</span>
                </div>
              )}
              {email && (
                <div className="w-full md:w-1/2 flex items-center gap-2 text-theme opacity-80">
                  <FaEnvelope className="h-5 w-5" />
                  <a
                    href={`mailto:${email}`}
                    className="hover:text-theme-accent transition-colors">
                    {email}
                  </a>
                </div>
              )}
            </div>

            {/* Social Media Links */}
            <div className="flex flex-row gap-4 items-center mb-4">
              {/* More about me button */}
              <div className="">
                <Link
                  href="/about-test"
                  className="inline-block px-6 py-3 rounded-lg bg-theme-accent text-theme-secondary-text hover:opacity-70 transition-colors">
                  MORE ABOUT ME
                </Link>
              </div>
              <div className="flex gap-4  justify-center">
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

            {/* Resume Download Button only for testing, going to remove if not needed */}
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
  );
}
