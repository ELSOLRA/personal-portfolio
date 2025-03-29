"use client";

import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { HeroClientProps } from "@/types";
import TypewriterText from "../../global/Typewriter";
import { useThemeSetter } from "@/hooks/useThemeSetter";
import { HiOutlineChevronRight } from "react-icons/hi";

export default function HeroClient({
  hero,
  about,
  theme,
  elements,
}: HeroClientProps) {
  useThemeSetter(theme);

  if (!hero || !theme || !elements) return null;

  // Default values
  const {
    title = "Hi, I'm a Developer",
    subtitle = "Web Developer",
    mainImage,
    layout = "split-right",
  } = hero;

  const {
    primaryButtonText = "View My Work",
    primaryButtonUrl = "/#projects",
    secondaryButtonText = "Contact",
    secondaryButtonUrl = "/",
  } = elements;

  //  Layout classes based on selected layout
  const isImageLeft = layout === "split-left";
  const isOverlay = layout === "overlay";
  const isMinimal = layout === "minimal";

  // Overlay and minimal layouts
  if (isOverlay) {
    return (
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        {mainImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={urlForImage(mainImage).url()}
              alt={mainImage.alt || title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 opacity-50 bg-theme-bg"></div>
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto px-8 py-12 text-center">
          <div className="relative inline-block text-left">
            <HiOutlineChevronRight className="absolute -left-16 text-theme text-6xl" />
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-theme">
              <TypewriterText text={`${title}`} />
            </h1>
            {about?.name && (
              <h2 className="mt-4 text-5xl md:text-6xl font-bold tracking-tight text-theme">
                <TypewriterText text={`I'm ${about.name}`} startDelay={2500} />
              </h2>
            )}
            <h2 className="mt-6 text-2xl md:text-3xl opacity-90 font-semibold text-theme">
              {subtitle}
            </h2>
          </div>

          <div className="mt-10 flex gap-6 justify-center">
            <Link
              href={primaryButtonUrl}
              className="px-8 py-4 transition-colors text-center bg-theme-accent text-theme-secondary-text font-semibold hover:opacity-90 text-lg">
              {primaryButtonText}
            </Link>
            <Link
              href={secondaryButtonUrl}
              className="px-8 py-4 border-2 hover:bg-white/10 transition-colors text-center border-theme-accent text-theme-accent font-semibold text-lg">
              {secondaryButtonText}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Minimal layout
  if (isMinimal) {
    return (
      <div className="h-screen flex items-center justify-center px-4 overflow-auto bg-theme-bg">
        <div className="max-w-4xl mx-auto py-12 text-center">
          <div className="relative inline-block text-left">
            <HiOutlineChevronRight className="absolute -left-16 text-theme text-6xl" />
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-theme">
              <TypewriterText text={`${title}`} />
            </h1>
            {about?.name && (
              <h2 className="mt-4 text-5xl md:text-6xl font-bold tracking-tight text-theme">
                <TypewriterText text={`I'm ${about.name}`} startDelay={2500} />
              </h2>
            )}
            <h2 className="mt-6 text-2xl md:text-3xl opacity-90 font-semibold text-theme">
              {subtitle}
            </h2>
          </div>

          {mainImage && (
            <div className="mt-8 flex justify-center">
              <div className="w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-theme-accent shadow-lg">
                <Image
                  src={urlForImage(mainImage).width(192).height(192).url()}
                  alt={mainImage.alt || title}
                  width={192}
                  height={192}
                  className="object-cover"
                />
              </div>
            </div>
          )}

          <div className="mt-10 flex gap-6 justify-center">
            <Link
              href={primaryButtonUrl}
              className="px-8 py-4 transition-colors text-center bg-theme-accent text-theme-secondary-text font-semibold hover:opacity-90 text-lg">
              {primaryButtonText}
            </Link>
            <Link
              href={secondaryButtonUrl}
              className="px-8 py-4 border-2 border-theme-accent text-theme-accent font-semibold hover:bg-white/10 transition-colors text-center text-lg">
              {secondaryButtonText}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Layout with responsive mobile overlay
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Mobile background image (visible only on small screens) */}
      {mainImage && (
        <div className="md:hidden absolute inset-0 z-0">
          <Image
            src={urlForImage(mainImage).width(1500).height(1500).url()}
            alt={mainImage.alt || title}
            fill
            className={`object-cover ${isImageLeft ? "object-[0%_center]" : "object-[100%_center]"}`}
            priority
          />
          <div className="absolute inset-0 opacity-60 bg-theme-bg"></div>
        </div>
      )}

      {/* Desktop split layout (hidden on mobile) */}
      <div className="hidden md:flex flex-row h-screen overflow-hidden">
        {/* Content side */}
        <div
          className={`relative z-10 w-1/2 flex items-center justify-center bg-theme-secondary-bg ${
            isImageLeft ? "order-2" : "order-1"
          }`}>
          <div
            className={`w-full max-w-md ${
              isImageLeft ? "md:pl-16 lg:px-8" : "md:pl-14 md:pr-5 xl:pl-0"
            } py-12`}>
            <div className="relative">
              <HiOutlineChevronRight className="absolute  -left-16 md:top-1 lg:top-2 text-theme text-6xl" />
              <h1 className="text-6xl lg:text-7xl font-bold tracking-tight text-theme">
                <TypewriterText text={`${title}`} />
              </h1>
            </div>
            {about?.name && (
              <h2 className="mt-4 text-4xl lg:text-5xl font-bold tracking-tight text-theme">
                <TypewriterText text={`I'm ${about.name}`} startDelay={2500} />
              </h2>
            )}
            <h2 className="mt-5 text-2xl lg:text-3xl text-theme font-semibold opacity-90">
              {subtitle}
            </h2>

            <div className="mt-8 flex gap-4">
              <Link
                href={primaryButtonUrl}
                className="px-7 py-3  text-center bg-theme-accent text-theme font-semibold hover:text-theme-third-text text-lg w-full flex items-center justify-center min-h-[3.5rem]
                relative overflow-hidden
      transition-colors duration-300
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
      hover:before:w-full">
                <span className="relative z-10">{primaryButtonText}</span>
              </Link>
              <Link
                href={secondaryButtonUrl}
                className="px-7 py-3 border-2 border-theme-accent  text-theme hover:text-theme-third-text font-semibold text-center text-lg w-full flex items-center justify-center min-h-[3.5rem]
                relative overflow-hidden                   
      hover:border-transparent
      transition-colors duration-300
      before:absolute
       before:bottom-0
     before:right-0
    before:top-0
    before:z-0
      before:h-full
      before:w-0
      before:bg-theme
      before:transition-all
      before:duration-500
      hover:before:w-full">
                <span className="relative z-10">{secondaryButtonText}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Image side */}
        <div
          className={`w-1/2 h-screen ${
            isImageLeft ? "order-1" : "order-2"
          } overflow-hidden bg-theme-bg`}>
          {mainImage ? (
            <div className="relative h-full w-full">
              <Image
                src={urlForImage(mainImage).width(1500).height(1500).url()}
                alt={mainImage.alt || title}
                fill
                className="object-cover"
                style={{
                  objectPosition: isImageLeft ? "0% center" : "100% center",
                }}
                priority
                sizes="50vw"
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <span className="text-gray-500 text-6xl">?</span>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Content Overlay */}
      <div className="md:hidden relative z-10 flex  items-center justify-center h-screen">
        <div
          className={`w-full h-full flex flex-col px-6 sm:px-25 py-10 ${isImageLeft ? "ml-auto mr-8" : "ml-8 mr-auto"}`}>
          <div className="relative mt-auto">
            <HiOutlineChevronRight className="absolute -left-12 text-theme text-5xl" />
            <h1 className="text-5xl font-bold tracking-tight text-theme">
              <TypewriterText text={`${title}`} />
            </h1>
          </div>
          {about?.name && (
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-theme">
              <TypewriterText text={`I'm ${about.name}`} startDelay={2500} />
            </h2>
          )}
          <h2 className="mt-4 text-2xl text-theme font-semibold opacity-90">
            {subtitle}
          </h2>

          <div className="mt-auto flex flex-col gap-3">
            <Link
              href={primaryButtonUrl}
              className="px-7 py-3  text-center border-1 border-theme bg-theme-accent text-theme-third-text font-semibold  text-lg w-full flex items-center justify-center min-h-[3.5rem]
                relative overflow-hidden
      transition-colors duration-300
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
      hover:before:w-full">
              <span className="relative z-10">{primaryButtonText}</span>
            </Link>
            <Link
              href={secondaryButtonUrl}
              className="px-7 py-3 border-1 border-theme  text-theme-third-text font-semibold text-center text-lg w-full flex items-center justify-center min-h-[3.5rem]
                relative overflow-hidden                   
      hover:border-transparent
      transition-colors duration-300
      before:absolute
       before:bottom-0
     before:right-0
    before:top-0
    before:z-0
      before:h-full
      before:w-0
      before:bg-theme
      before:transition-all
      before:duration-500
      hover:before:w-full">
              <span className="relative z-10">{secondaryButtonText}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
