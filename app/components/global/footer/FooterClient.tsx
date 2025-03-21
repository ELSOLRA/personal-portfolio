"use client";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { RxDoubleArrowUp } from "react-icons/rx";
import { useThemeSetter } from "@/hooks/useThemeSetter";
import { FooterClientProps } from "@/types";

export default function FooterClient({
  elements,
  theme,
  socialLinks,
}: FooterClientProps) {
  useThemeSetter(theme);
  const currentYear = new Date().getFullYear();

  if (!elements || !theme) return null;

  return (
    <footer className="w-full bg-theme-accent py-4">
      <div className="w-[95%] mx-auto flex  flex-row justify-between items-center h-auto px-4 sm:px-6 lg:px-8">
        {/* Logo lection */}
        <div className="flex-shrink-0 flex items-center mb-4 sm:mb-0">
          <Link href="/" className="inline-block mr-3">
            {elements?.logo && (
              <Image
                src={urlForImage(elements.logo).url()}
                alt={elements?.title || "Logo"}
                width={48}
                height={48}
                className="h-10 w-auto object-cover"
              />
            )}
          </Link>
        </div>

        {/* Column with Copyright and social Links */}
        <div className="flex flex-col items-center">
          {/* Copyright */}
          <div className="text-theme-secondary-text text-sm mb-2">
            © Copyright Paulius {currentYear}
          </div>

          {/* Social links */}
          <div className="flex gap-4 justify-center">
            {socialLinks?.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-theme-secondary-text hover:text-white transition-colors">
                <FaGithub size={24} />
              </a>
            )}
            {socialLinks?.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-theme-secondary-text hover:text-white transition-colors">
                <FaLinkedin size={24} />
              </a>
            )}
          </div>
        </div>

        {/* Scroll button */}
        <div className=" flex justify-end items-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-theme-secondary-text/10 hover:bg-theme-secondary-text/20 text-theme-secondary-text p-2 border-2 rounded-full transition-all duration-300 "
            aria-label="Scroll to top">
            <RxDoubleArrowUp size={28} />
          </button>
        </div>
      </div>
    </footer>
  );
}
