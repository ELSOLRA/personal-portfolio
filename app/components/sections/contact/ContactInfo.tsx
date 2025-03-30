import { AboutClientProps } from "@/types";
import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export const ContactInfo = ({
  about,
}: {
  about: AboutClientProps["about"];
}) => {
  const { location, email } = about || {};

  return (
    <div className="w-full md:w-5/12 lg:w-4/12 xl:w-4/12 md:pl-8 lg:pl-18 xl:pl-25  mb-8 md:mb-0">
      <div className="text-theme-secondary-text md:text-theme-secondary-text">
        <h3 className="text-4xl font-bold mb-5">Let&apos;s Connect</h3>
        <div className="flex items-center my-4">
          <div className="w-40 h-1 bg-theme-secondary-text"></div>
        </div>
        <p className="mb-6 opacity-90 text-2xl font-semibold tracking-wide">
          Always happy to explore freelance projects that align with my
          strengths. Feel free to reach out!
        </p>

        <div className="space-y-5  ">
          {location && (
            <div className="flex items-start text-sm">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-theme/20">
                  <FaMapMarkerAlt className="h-5 w-5 text-theme-third-text" />
                </div>
                <span className="text-lg font-semibold sm:font-normal sm:text-xl">
                  {location}
                </span>
              </div>
            </div>
          )}

          {email && (
            <div className="flex items-center gap-3 ">
              <div className="flex flex-shrink-0 items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-theme/20">
                <FaEnvelope className="h-5 w-5 text-theme-third-text" />
              </div>
              <a
                href={`mailto:${email}`}
                className="hover:text-theme md:hover:text-theme-third-text transition-colors text-lg font-semibold sm:font-normal sm:text-xl">
                {email}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
