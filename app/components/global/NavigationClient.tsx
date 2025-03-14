// components/global/Navigation.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { About } from "@/types";
import { urlForImage } from "@/sanity/lib/image";

interface NavigationClientProps {
  about: About | null;
}

export default function NavigationClient({ about }: NavigationClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
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
      className={`absolute top-3.5 w-full z-50 transition-all duration-300 mt-4 ${isScrolled ? "bg-gray-900/90 backdrop-blur-sm shadow-md" : "bg-white"}`}>
      <div className=" mx-auto flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8 ">
        <div className="flex-shrink-0">
          <Link href="/" className="inline-block">
            {about?.profileImage && (
              <Image
                src={urlForImage(about.profileImage).url()}
                alt={about?.name || "Logo"}
                width={48}
                height={48}
                className="h-10 w-auto object-cover mt-auto pt-2 pb-2"
              />
            )}
          </Link>
          {/*           <Image
            src="/name1.svg"
            alt="Logo"
            width={120}
            height={40}
            className="h-10 w-auto"
          /> */}
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
                href="/about"
                className="font-medium text-gray-700 hover:text-[#48acda] transition-colors"
                onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="font-medium text-gray-700 hover:text-[#48acda] transition-colors"
                onClick={() => setIsMenuOpen(false)}>
                Works
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
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
