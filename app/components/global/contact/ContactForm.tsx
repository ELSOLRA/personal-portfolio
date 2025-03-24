"use client";

import { useState } from "react";
import { useThemeSetter } from "@/hooks/useThemeSetter";
import { ContactFormProps } from "@/types";
import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactForm({ theme, about }: ContactFormProps) {
  useThemeSetter(theme);

  if (!theme || !about) return null;

  const { location, email } = about;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<{
    submitted: boolean;
    submitting: boolean;
    info: { error: boolean; msg: string | null };
  }>({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({
      submitted: false,
      submitting: true,
      info: { error: false, msg: null },
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          submitted: true,
          submitting: false,
          info: { error: false, msg: "Message sent successfully!" },
        });

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error(data.error || "Something went wrong");
      }
    } catch (error: unknown) {
      setStatus({
        submitted: false,
        submitting: false,
        info: {
          error: true,
          msg:
            error instanceof Error
              ? error.message
              : "Something went wrong. Please try again later.",
        },
      });
    }
  };

  return (
    <section className="relative overflow-hidden md:py-40 p-2 ">
      <div className="absolute inset-0 hidden md:block">
        {/* Left background */}
        <div className="absolute top-0 left-0 w-1/2 h-full bg-theme-bg"></div>
        {/* Right background */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-theme-accent"></div>
      </div>
      {/* Mobile background */}
      <div className="absolute inset-0 md:hidden bg-gradient-to-b from-theme-bg to-theme-accent/10"></div>
      {/* Main container */}
      <div className="relative z-10 max-w-[100rem] mx-auto px-4 flex flex-col md:flex-row items-start justify-center md:-mt-6">
        {/* Form container  */}
        <div className="hidden md:block md:w-1/12 lg:w-1/12"></div>
        <div className="w-full md:w-7/12 lg:w-7/12 xl:w-6/12 max-w-3xl bg-white dark:bg-gray-800  shadow-2xl overflow-hidden mb-8">
          <div className="p-6">
            <div className="mb-5">
              <h2 className="text-4xl font-bold text-theme-secondary-text mb-2">
                Get in Touch
              </h2>
              <div className="flex items-center my-4">
                <div className="w-40 h-1 bg-theme-accent"></div>
              </div>
              {/*               <p className="opacity-80 text-theme">
                Send me a message and I'll get back to you as soon as possible.
              </p> */}
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name input, no label  */}
                <div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-accent"
                    placeholder="Your name"
                  />
                </div>

                {/* Email input, no label */}
                <div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-accent"
                    placeholder="Your email address"
                  />
                </div>
              </div>

              {/* Subject input, no label */}
              <div>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-accent"
                  placeholder="Subject"
                />
              </div>

              {/* Message input, no label */}
              <div>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-accent resize-none"
                  placeholder="Your message"
                />
              </div>

              {/* Submit button */}
              <div>
                <button
                  type="submit"
                  disabled={status.submitting}
                  className="w-full px-6 py-3 bg-theme-accent text-theme-secondary-text rounded-lg hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-accent focus:ring-offset-2 disabled:opacity-50">
                  {status.submitting ? "Sending..." : "Send Message"}
                </button>
              </div>

              {/* Status message */}
              {status.info.msg && (
                <div
                  className={`mt-4 ${status.info.error ? "text-red-500" : "text-green-500"}`}>
                  {status.info.error
                    ? "There was a problem sending your message. Please try again."
                    : "Your message has been sent successfully. I'll get back to you soon!"}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Let's Connect section */}
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

            <div className="space-y-5 ">
              <div className="flex items-start">
                {location && (
                  <div className="w-full md:w-1/2 flex items-center gap-2 text-theme opacity-80">
                    <FaMapMarkerAlt className="h-5 w-5" />
                    <span>{location}</span>
                  </div>
                )}
              </div>
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
      </div>
    </section>
  );
}
