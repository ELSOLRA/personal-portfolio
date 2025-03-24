import { AboutClientProps } from "@/types";
import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export const ContactInfo = ({
  about,
}: {
  about: AboutClientProps["about"];
}) => {
  const { location, email } = about || {};

  return (
    <div className="w-full md:w-4/12 lg:w-4/12 xl:w-4/12 md:pl-8 lg:pl-25 xl:pl-50 mb-8 md:mb-0">
      <div className="text-theme-secondary-text md:text-white">
        <h3 className="text-4xl font-bold mb-5">Let's Connect</h3>
        <div className="flex items-center my-4">
          <div className="w-40 h-1 bg-theme-bg"></div>
        </div>
        <p className="mb-6 opacity-90 text-xl">
          Always happy to explore freelance projects that align with my
          strengths. Feel free to reach out!
        </p>

        <div className="space-y-5">
          {location && (
            <div className="flex items-start">
              <div className="w-full md:w-1/2 flex items-center gap-2 text-theme opacity-80">
                <FaMapMarkerAlt className="h-5 w-5" />
                <span>{location}</span>
              </div>
            </div>
          )}
          {email && (
            <div className="w-full md:w-1/2 flex items-center gap-2 text-theme opacity-80">
              <FaEnvelope className="h-5 w-5" />
              <a
                href={`mailto:${email}`}
                className="hover:text-theme-accent transition-colors">
                {email}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
