"use client";

import { useTheme } from "@/app/context/ThemeContext";
import { urlForImage } from "@/sanity/lib/image";
import { AboutClientProps } from "@/types";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { useEffect } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function AboutClient({ about, theme }: AboutClientProps) {
  const { themeStyles, setTheme } = useTheme();

  useEffect(() => {
    if (theme) {
      setTheme({
        "--theme-text-color": theme.textColor?.hex || "#333333",
        "--theme-accent-color": theme.accentColor?.hex || "#48acda",
        "--theme-bg-color": theme.backgroundColor?.hex || "#f5e1c0",
        "--theme-button-text-color": "#ffffff",
      } as React.CSSProperties);
    }
  }, [theme]);

  if (!about || !theme) return null;

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
    <div className="min-h-screen flex flex-col md:flex-row bg-theme-bg">
      {/* Image Section - Left Side */}
      <div className="w-full md:w-2/5 flex items-center justify-center">
        <div className="w-60 h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-lg overflow-hidden m-8">
          {profileImage ? (
            <Image
              src={urlForImage(profileImage).url()}
              alt={profileImage.alt || `Photo of ${name}`}
              width={320}
              height={320}
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
      <div className="w-full md:w-3/5 flex items-center justify-center p-8 md:p-12">
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
            <div className="text-theme opacity-80 prose prose-lg max-w-none mb-8">
              <PortableText value={fullBio} />
            </div>
          )}

          {/* Location and Contact Info */}
          <div className="flex flex-wrap gap-y-2 mb-8">
            {location && (
              <div className="w-full md:w-1/2 flex items-center gap-2 text-theme opacity-80">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>{location}</span>
              </div>
            )}
            {email && (
              <div className="w-full md:w-1/2 flex items-center gap-2 text-theme opacity-80">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href={`mailto:${email}`}
                  className="hover:text-theme-accent transition-colors">
                  {email}
                </a>
              </div>
            )}
          </div>

          {/* Social Media Links */}
          <div className="flex gap-4 mb-8">
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
  );
}
