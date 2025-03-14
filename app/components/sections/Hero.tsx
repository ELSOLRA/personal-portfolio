import Link from "next/link";
import Image from "next/image";
import { getAbout } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

export default async function Hero() {
  const about = await getAbout();

  return (
    <div className="relative flex flex-col md:flex-row min-h-screen">
      {/* Left side - Content with sand background */}
      <div className="md:w-1/2 flex items-center justify-center bg-[#f5e1c0] z-10">
        <div className="max-w-md px-8 py-16 md:py-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-800">
            Hi, I'm {about?.name || "Developer"}
          </h1>
          <h2 className="mt-4 text-xl md:text-2xl text-gray-700">
            {about?.role || "Web Developer"}
          </h2>
          <p className="mt-6 text-lg text-gray-600">
            {about?.shortBio || "Welcome to my portfolio website."}
          </p>
          <div className="mt-10 flex gap-4 flex-col sm:flex-row">
            <Link
              href="/projects"
              className="px-6 py-3 bg-[#48acda] text-white rounded-lg hover:bg-[#3a9bc9] transition-colors text-center">
              View My Work
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border border-gray-400 rounded-lg hover:bg-white/30 transition-colors text-center">
              Contact Me
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="md:w-1/2 h-screen md:h-auto relative">
        {about?.profileImage ? (
          <Image
            src={urlForImage(about.profileImage).width(1200).height(1600).url()}
            alt={about.name}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-500 text-6xl">?</span>
          </div>
        )}
      </div>
    </div>
  );
}
