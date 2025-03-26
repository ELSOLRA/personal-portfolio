// components/global/Navigation.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { NavigationClientProps } from "@/types";
import { urlForImage } from "@/sanity/lib/image";
import { useThemeSetter } from "@/hooks/useThemeSetter";
import { useNavStyles } from "@/hooks/useNavStyles";

export default function NavigationClient({
  elements,
  theme,
}: NavigationClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { headerClasses } = useNavStyles(isScrolled);

  useThemeSetter(theme);

  // scroll event for sticky header
  useEffect(() => {
    const handleScroll = () => {
      // About component's position
      const aboutSection = document.getElementById("about-section");
      if (aboutSection) {
        const aboutPosition = aboutSection.getBoundingClientRect().top;
        // Show nav when About section is at top of viewport or above
        setIsScrolled(aboutPosition <= 50);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.toggle("menu-is-open");
  };

  return (
    <header
      className={`z-50 transition-all duration-300 ease-in-out ${headerClasses}`}>
      <div className=" mx-auto flex justify-between items-center h-20 px-4 sm:px-6 lg:px-8 ">
        <div className="flex-shrink-0 flex items-center">
          <Link href="/" className="inline-block mr-3">
            {elements?.logo && (
              <Image
                src={urlForImage(elements.logo).url()}
                alt={elements?.title || "Logo"}
                width={48}
                height={48}
                className="h-12 w-auto object-cover"
              />
            )}
          </Link>
          {elements?.logoSecondary && (
            <div className="inline-flex items-center">
              <Image
                src={urlForImage(elements?.logoSecondary)
                  .width(32)
                  .height(18)
                  .url()}
                alt="Logo"
                width={32}
                height={18}
                className="h-6 w-auto"
              />
            </div>
          )}
        </div>

        <div className="block sm:hidden">
          <button
            className={`relative w-10 h-10 focus:outline-none ${isMenuOpen ? "is-clicked" : ""}`}
            onClick={toggleMenu}>
            <span className="sr-only">Menu</span>
            <span
              className="block absolute bg-white w-7 h-0.5 transform transition-all duration-300"
              style={{
                top: "50%",
                left: "50%",
                marginLeft: "-14px",
                marginTop: "-1px",
                ...(isMenuOpen ? { backgroundColor: "transparent" } : {}),
              }}></span>
            <span
              className="block absolute bg-white w-7 h-0.5 transform transition-all duration-300"
              style={{
                top: "calc(50% - 5px)",
                left: "50%",
                marginLeft: "-14px",
                ...(isMenuOpen
                  ? { top: "50%", transform: "rotate(45deg)" }
                  : {}),
              }}></span>
            <span
              className="block absolute bg-white w-7 h-0.5 transform transition-all duration-300"
              style={{
                top: "calc(50% + 5px)",
                left: "50%",
                marginLeft: "-14px",
                ...(isMenuOpen
                  ? { top: "50%", transform: "rotate(-45deg)" }
                  : {}),
              }}></span>
          </button>
        </div>

        <nav
          className={`sm:flex ${isMenuOpen ? "absolute top-16 left-0 right-0 bg-gray-900 p-4 shadow-lg flex flex-col" : "hidden"}`}>
          <ul className="sm:flex space-y-2 sm:space-y-0 sm:space-x-8 text-center sm:text-left">
            <li>
              <Link
                href="/"
                className="font-medium text-gray-700 hover:text-[#48acda] transition-colors"
                onClick={() => setIsMenuOpen(false)}>
                Intro
              </Link>
            </li>
            <li>
              <Link
                href="/#about-section"
                className="font-medium text-gray-700 hover:text-[#48acda] transition-colors"
                onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link
                href="/#projects"
                className="font-medium text-gray-700 hover:text-[#48acda] transition-colors"
                onClick={() => setIsMenuOpen(false)}>
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/#contact-form"
                className="font-medium text-gray-700 hover:text-[#48acda] transition-colors"
                onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
