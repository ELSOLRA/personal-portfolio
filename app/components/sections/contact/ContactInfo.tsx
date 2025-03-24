import { AboutClientProps } from "@/types";
import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export const ContactInfo = ({
  about,
}: {
  about: AboutClientProps["about"];
}) => {
  const { location, email } = about || {};

  return (
    <div className="w-full md:w-5/12 lg:w-4/12 xl:w-4/12 md:pl-8 lg:pl-25  mb-8 md:mb-0">
      <div className="text-theme-secondary-text md:text-white">
        <h3 className="text-4xl font-bold mb-5">Let's Connect</h3>
        <div className="flex items-center my-4">
          <div className="w-40 h-1 bg-theme-bg"></div>
        </div>
        <p className="mb-6 opacity-90 text-2xl">
          Always happy to explore freelance projects that align with my
          strengths. Feel free to reach out!
        </p>

        <div className="space-y-5">
          {location && (
            <div className="flex items-start">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-theme/20">
                  <FaMapMarkerAlt className="h-5 w-5 text-theme-accent" />
                </div>
                <span className="text-xl">{location}</span>
              </div>
            </div>
          )}

          {email && (
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-theme/20">
                <FaEnvelope className="h-5 w-5 text-theme-accent" />
              </div>
              <a
                href={`mailto:${email}`}
                className="hover:text-theme-secondary-text transition-colors text-xl">
                {email}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
