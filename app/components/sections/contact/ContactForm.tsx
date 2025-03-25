"use client";

import { FormField } from "./ContactFormField";
import { StatusMessage } from "./StatusMessage";
import { ContactInfo } from "./ContactInfo";
import { ContactFormData, ContactFormProps, FormStatus } from "@/types";
import { useThemeSetter } from "@/hooks/useThemeSetter";
import { useCallback, useEffect, useState } from "react";

export default function ContactForm({ theme, about }: ContactFormProps) {
  useThemeSetter(theme);

  if (!theme || !about) return null;

  // initial form state
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // status state
  const [status, setStatus] = useState<FormStatus>({
    submitted: false,
    submitting: false,
    error: false,
    message: null,
    visible: false,
  });

  //  useCallback to prevent unnecessary re-renders
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setStatus({
        submitted: false,
        submitting: true,
        error: false,
        message: null,
        visible: false,
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
            error: false,
            message: "Message sent successfully!",
            visible: true,
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
          error: true,
          message:
            error instanceof Error
              ? error.message
              : "Something went wrong. Please try again later.",
          visible: true,
        });
      }
    },
    [formData]
  );

  // status message visibility
  useEffect(() => {
    let visibilityTimeoutId: NodeJS.Timeout | undefined;
    let removeMessageTimeoutId: NodeJS.Timeout | undefined;

    if (status.message && status.visible) {
      visibilityTimeoutId = setTimeout(() => {
        setStatus((prev) => ({
          ...prev,
          visible: false,
        }));
      }, 5000); // timer 5 seconds
    }

    // when message invisible, removing it completely after transition
    if (status.message && !status.visible) {
      removeMessageTimeoutId = setTimeout(() => {
        setStatus((prev) => ({
          ...prev,
          message: null,
        }));
      }, 500); // duration of the fade-out
    }

    // cleaning up timeouts when component unmounts or status changes
    return () => {
      if (visibilityTimeoutId) clearTimeout(visibilityTimeoutId);
      if (removeMessageTimeoutId) clearTimeout(removeMessageTimeoutId);
    };
  }, [status.message, status.visible]);

  return (
    <section
      id="contact-form"
      className="relative overflow-hidden md:py-40 p-2">
      {/* Background elements */}
      <div className="absolute inset-0 hidden md:block">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-theme-bg"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-theme-accent"></div>
      </div>
      <div className="absolute inset-0 md:hidden bg-gradient-to-b from-theme-bg to-theme-accent/10"></div>

      {/* Main container */}
      <div className="relative z-10 max-w-[100rem] mx-auto px-4 flex flex-col md:flex-row items-start justify-center md:-mt-6">
        {/*     <div className="hidden md:block md:w-1/12 lg:w-1/12"></div> */}

        {/* Form container */}
        <div className="w-full md:w-7/12 lg:w-7/12 xl:w-7/12 max-w-4xl bg-white dark:bg-gray-800 shadow-2xl overflow-hidden mb-8 ">
          <div className="p-8">
            <div className="mb-5 mt-2">
              <h2 className="text-4xl font-bold text-theme-secondary-text mb-2">
                Get in Touch
              </h2>
              <div className="flex items-center my-4">
                <div className="w-40 h-1 bg-theme-accent"></div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <FormField
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <FormField
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email address"
                  />
                </div>
              </div>

              <div>
                <FormField
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                />
              </div>

              <div>
                <FormField
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  rows={4}
                />
              </div>

              <div className="mb-2">
                <button
                  type="submit"
                  disabled={status.submitting}
                  className="w-4/12 px-6 py-4 text-xl bg-theme-accent text-theme-secondary-text  hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-accent focus:ring-offset-2 disabled:opacity-50">
                  {status.submitting ? "Sending..." : "Send Message"}
                </button>
              </div>

              <StatusMessage status={status} />
            </form>
          </div>
        </div>

        {/* Contact info section */}
        <ContactInfo about={about} />
      </div>
    </section>
  );
}
