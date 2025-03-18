"use client";

import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { About, Hero as HeroType, Theme } from "@/types";
import TypewriterText from "../global/Typewriter";
import { useTheme } from "@/app/context/ThemeContext";
import { useEffect } from "react";

interface HeroClientProps {
  hero: HeroType | null;
  about: About | null;
  theme: Theme | null;
}

export default function HeroClient({ hero, about, theme }: HeroClientProps) {
  const { themeStyles, setTheme } = useTheme();

  // Updates theme when component mounts or hero changes
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

  if (!hero || !theme) return null;

  // Default values
  const {
    title = "Hi, I'm a Developer",
    subtitle = "Web Developer",
    description = "Welcome to my portfolio website",
    mainImage,
    logo,
    primaryButtonText = "View My Work",
    primaryButtonUrl = "/projects",
    secondaryButtonText = "Contact Me",
    secondaryButtonUrl = "/contact",
    layout = "split-right",
  } = hero;

  //  Layout classes based on selected layout
  const isImageLeft = layout === "split-left";
  const isOverlay = layout === "overlay";
  const isMinimal = layout === "minimal";

  // Overlay and Minimal layouts
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
          {logo && (
            <div className="mb-6 flex justify-center">
              <Image
                src={urlForImage(logo).width(120).height(40).url()}
                alt="Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </div>
          )}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-theme">
            {title}
          </h1>
          {about?.name && (
            <h2 className="mt-2 text-3xl md:text-4xl font-medium tracking-tight text-theme">
              I'm {about.name}
            </h2>
          )}
          <h2 className="mt-4 text-xl md:text-2xl opacity-90 text-theme">
            {subtitle}
          </h2>
          <p className="mt-6 text-lg opacity-80 text-theme">{description}</p>
          <div className="mt-8 flex gap-4 justify-center">
            <Link
              href={primaryButtonUrl}
              className="px-6 py-3 rounded-lg transition-colors text-center bg-theme-accent text-theme-button-text">
              {primaryButtonText}
            </Link>
            <Link
              href={secondaryButtonUrl}
              className="px-6 py-3 border rounded-lg hover:bg-white/10 transition-colors text-center border-theme-accent text-theme-accent">
              {secondaryButtonText}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isMinimal) {
    return (
      <div className="h-screen flex items-center justify-center px-4 overflow-auto bg-theme-bg">
        <div className="max-w-4xl mx-auto py-12 text-center">
          {logo && (
            <div className="mb-6 flex justify-center">
              <Image
                src={urlForImage(logo).width(120).height(40).url()}
                alt="Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </div>
          )}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-theme">
            {title}
          </h1>
          {about?.name && (
            <h2 className="mt-2 text-3xl md:text-4xl font-medium tracking-tight text-theme">
              I'm {about.name}
            </h2>
          )}
          <h2 className="mt-4 text-xl md:text-2xl opacity-90 text-theme">
            {subtitle}
          </h2>

          {mainImage && (
            <div className="mt-6 flex justify-center">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-theme-accent shadow-lg">
                <Image
                  src={urlForImage(mainImage).width(160).height(160).url()}
                  alt={mainImage.alt || title}
                  width={160}
                  height={160}
                  className="object-cover"
                />
              </div>
            </div>
          )}

          <p className="mt-6 text-lg max-w-2xl mx-auto opacity-80 text-theme">
            {description}
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Link
              href={primaryButtonUrl}
              className="px-6 py-3 rounded-lg transition-colors text-center bg-theme-accent text-theme-button-text">
              {primaryButtonText}
            </Link>
            <Link
              href={secondaryButtonUrl}
              className="px-6 py-3 rounded-lg border-theme-accent text-theme-accent hover:bg-white/10 transition-colors text-center">
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
      {/* Mobile Background Image (visible only on small screens) */}
      {mainImage && (
        <div className="md:hidden absolute inset-0 z-0">
          <Image
            src={urlForImage(mainImage).width(1500).height(1500).url()}
            alt={mainImage.alt || title}
            fill
            className={`object-cover ${isImageLeft ? "object-[0%_center]" : "object-[100%_center]"}`}
            /*             style={{
              objectPosition: isImageLeft ? "0% center" : "100% center",
            }} */
            priority
          />
          <div className="absolute inset-0 opacity-60 bg-theme-bg"></div>
        </div>
      )}

      {/* Desktop Split Layout (hidden on mobile) */}
      <div className="hidden md:flex flex-row h-screen overflow-hidden">
        {/* Content Side */}
        <div
          className={`relative z-10 w-1/2 flex items-center justify-center bg-theme-bg ${
            isImageLeft ? "order-2" : "order-1"
          }`}>
          <div className="w-full max-w-md px-8 py-12">
            {logo && (
              <div className="mb-6">
                <Image
                  src={urlForImage(logo).width(120).height(40).url()}
                  alt="Logo"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>
            )}
            <div className="text-theme">Theme text color</div>

            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-theme">
              <span className="terminal-prompt mr-2 inline-flex items-center">
                &gt;
              </span>
              <TypewriterText text={`${title}`} />
            </h1>
            {about?.name && (
              <h2 className="mt-2 text-3xl md:text-4xl font-medium tracking-tight text-theme">
                <TypewriterText text={`I'm ${about.name}`} startDelay={2500} />
              </h2>
            )}
            <h2 className="mt-3 text-xl md:text-2xl text-theme opacity-90">
              {subtitle}
            </h2>
            <p className="mt-4 text-lg text-theme opacity-80">{description}</p>
            <div className="mt-6 flex gap-4">
              <Link
                href={primaryButtonUrl}
                className="px-5 py-2 rounded-lg transition-colors text-center bg-theme-accent text-theme-button-text">
                {primaryButtonText}
              </Link>
              <Link
                href={secondaryButtonUrl}
                className="px-5 py-2 rounded-lg border border-theme-accent text-theme-accent hover:bg-white/10 transition-colors text-center">
                {secondaryButtonText}
              </Link>
            </div>
          </div>
        </div>

        {/* Image Side */}
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
      <div className="md:hidden relative z-10 flex items-center justify-center h-screen">
        <div
          className={`w-full max-w-sm px-6 py-10 ${isImageLeft ? "ml-auto mr-8" : "ml-8 mr-auto"}`}>
          {logo && (
            <div className="mb-6">
              <Image
                src={urlForImage(logo).width(120).height(40).url()}
                alt="Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </div>
          )}
          <h1 className="text-3xl font-bold tracking-tight text-theme">
            {title}
          </h1>
          {about?.name && (
            <h2 className="mt-2 text-3xl md:text-4xl font-medium tracking-tight text-theme">
              I'm {about.name}
            </h2>
          )}

          <h2 className="mt-3 text-xl text-theme opacity-90">{subtitle}</h2>
          <p className="mt-4 text-base text-theme opacity-80">{description}</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href={primaryButtonUrl}
              className="px-5 py-2 rounded-lg transition-colors text-center bg-theme-accent text-theme-button-text">
              {primaryButtonText}
            </Link>
            <Link
              href={secondaryButtonUrl}
              className="px-5 py-2 border rounded-lg border-theme-accent text-theme-accent hover:bg-white/10 transition-colors text-center">
              {secondaryButtonText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
