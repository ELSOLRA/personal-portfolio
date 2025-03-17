import { getAbout, getHero } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { About, Hero as HeroType } from "@/types";
import TypewriterText from "../global/Typewriter";

export default async function Hero() {
  const hero: HeroType | null = await getHero();
  const about: About | null = await getAbout();

  if (!hero) return null;

  // Default values or use content from hero schema
  const {
    title = "Hi, I'm a Developer",
    subtitle = "Web Developer",
    description = "Welcome to my portfolio website",
    mainImage,
    logo,
    backgroundColor = { hex: "#f5e1c0" },
    textColor = { hex: "#333333" },
    accentColor = { hex: "#48acda" },
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
            <div
              className="absolute inset-0 opacity-50"
              style={{ backgroundColor: backgroundColor?.hex }}></div>
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
          <h1
            className="text-4xl md:text-6xl font-bold tracking-tight"
            style={{ color: textColor?.hex }}>
            {title}
          </h1>
          {about?.name && (
            <h2
              className="mt-2 text-3xl md:text-4xl font-medium tracking-tight"
              style={{ color: textColor?.hex }}>
              I'm {about.name}
            </h2>
          )}
          <h2
            className="mt-4 text-xl md:text-2xl opacity-90"
            style={{ color: textColor?.hex }}>
            {subtitle}
          </h2>
          <p
            className="mt-6 text-lg opacity-80"
            style={{ color: textColor?.hex }}>
            {description}
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Link
              href={primaryButtonUrl}
              className="px-6 py-3 rounded-lg transition-colors text-center"
              style={{
                backgroundColor: accentColor?.hex,
                color: "#ffffff",
              }}>
              {primaryButtonText}
            </Link>
            <Link
              href={secondaryButtonUrl}
              className="px-6 py-3 border rounded-lg hover:bg-white/10 transition-colors text-center"
              style={{
                borderColor: accentColor?.hex,
                color: accentColor?.hex,
              }}>
              {secondaryButtonText}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isMinimal) {
    return (
      <div
        className="h-screen flex items-center justify-center px-4 overflow-auto"
        style={{ backgroundColor: backgroundColor?.hex }}>
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
          <h1
            className="text-4xl md:text-6xl font-bold tracking-tight"
            style={{ color: textColor?.hex }}>
            {title}
          </h1>
          {about?.name && (
            <h2
              className="mt-2 text-3xl md:text-4xl font-medium tracking-tight"
              style={{ color: textColor?.hex }}>
              I'm {about.name}
            </h2>
          )}
          <h2
            className="mt-4 text-xl md:text-2xl opacity-90"
            style={{ color: textColor?.hex }}>
            {subtitle}
          </h2>

          {mainImage && (
            <div className="mt-6 flex justify-center">
              <div
                className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 shadow-lg"
                style={{ borderColor: accentColor?.hex }}>
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

          <p
            className="mt-6 text-lg max-w-2xl mx-auto opacity-80"
            style={{ color: textColor?.hex }}>
            {description}
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Link
              href={primaryButtonUrl}
              className="px-6 py-3 rounded-lg transition-colors text-center"
              style={{
                backgroundColor: accentColor?.hex,
                color: "#ffffff",
              }}>
              {primaryButtonText}
            </Link>
            <Link
              href={secondaryButtonUrl}
              className="px-6 py-3 rounded-lg hover:bg-white/10 transition-colors text-center"
              style={{
                borderColor: accentColor?.hex,
                borderWidth: "1px",
                color: accentColor?.hex,
              }}>
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
            className="object-cover"
            style={{
              objectPosition: isImageLeft ? "0% center" : "100% center",
            }}
            priority
          />
          <div
            className="absolute inset-0 opacity-60"
            style={{ backgroundColor: backgroundColor?.hex }}></div>
        </div>
      )}

      {/* Desktop Split Layout (hidden on mobile) */}
      <div className="hidden md:flex flex-row h-screen overflow-hidden">
        {/* Content Side */}
        <div
          className={`relative z-10 w-1/2 flex items-center justify-center ${
            isImageLeft ? "order-2" : "order-1"
          }`}
          style={{ backgroundColor: backgroundColor?.hex }}>
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
            <h1
              className="text-4xl lg:text-5xl font-bold tracking-tight "
              style={{ color: textColor?.hex }}>
              <span className="terminal-prompt mr-2 inline-flex items-center">
                &gt;
              </span>
              <TypewriterText
                text={`${title}`}
                textColor={textColor?.hex || "#333333"}
              />
            </h1>
            {about?.name && (
              <h2
                className="mt-2 text-3xl md:text-4xl font-medium tracking-tight"
                style={{ color: textColor?.hex }}>
                <TypewriterText
                  text={`I'm ${about.name}`}
                  textColor={textColor?.hex || "#333333"}
                  startDelay={2500}
                />
              </h2>
            )}
            <h2
              className="mt-3 text-xl md:text-2xl"
              style={{ color: textColor?.hex, opacity: 0.9 }}>
              {subtitle}
            </h2>
            <p
              className="mt-4 text-lg"
              style={{ color: textColor?.hex, opacity: 0.8 }}>
              {description}
            </p>
            <div className="mt-6 flex gap-4">
              <Link
                href={primaryButtonUrl}
                className="px-5 py-2 rounded-lg transition-colors text-center"
                style={{
                  backgroundColor: accentColor?.hex,
                  color: "#ffffff",
                }}>
                {primaryButtonText}
              </Link>
              <Link
                href={secondaryButtonUrl}
                className="px-5 py-2 rounded-lg hover:bg-white/10 transition-colors text-center"
                style={{
                  borderColor: accentColor?.hex,
                  borderWidth: "1px",
                  color: accentColor?.hex,
                }}>
                {secondaryButtonText}
              </Link>
            </div>
          </div>
        </div>

        {/* Image Side */}
        <div
          className={`w-1/2 h-screen ${
            isImageLeft ? "order-1" : "order-2"
          } overflow-hidden`}
          style={{ backgroundColor: backgroundColor?.hex }}>
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
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{ color: textColor?.hex }}>
            {title}
          </h1>
          {about?.name && (
            <h2
              className="mt-2 text-3xl md:text-4xl font-medium tracking-tight"
              style={{ color: textColor?.hex }}>
              I'm {about.name}
            </h2>
          )}

          <h2
            className="mt-3 text-xl"
            style={{ color: textColor?.hex, opacity: 0.9 }}>
            {subtitle}
          </h2>
          <p
            className="mt-4 text-base"
            style={{ color: textColor?.hex, opacity: 0.8 }}>
            {description}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href={primaryButtonUrl}
              className="px-5 py-2 rounded-lg transition-colors text-center"
              style={{
                backgroundColor: accentColor?.hex,
                color: "#ffffff",
              }}>
              {primaryButtonText}
            </Link>
            <Link
              href={secondaryButtonUrl}
              className="px-5 py-2 border rounded-lg hover:bg-white/10 transition-colors text-center"
              style={{
                borderColor: accentColor?.hex,
                color: accentColor?.hex,
              }}>
              {secondaryButtonText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
