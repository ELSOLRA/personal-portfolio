"use client";

import { useState } from "react";
import { useThemeSetter } from "@/hooks/useThemeSetter";
import { ContactFormProps } from "@/types";

export default function ContactForm({ theme }: ContactFormProps) {
  useThemeSetter(theme);

  if (!theme) return null;

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
    <section className="py-16 bg-theme-bg">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-theme-secondary-text mb-4">
            Get in Touch
          </h2>
          <p className="text-theme opacity-80 max-w-2xl mx-auto">
            Feel free to reach out if you're looking for a developer, have a
            question, or just want to connect.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name input */}
            <div>
              <label
                htmlFor="name"
                className="block text-theme font-medium mb-2">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-accent text-theme-secondary-text placeholder:text-theme-secondary-text/25"
                placeholder="Your name"
              />
            </div>

            {/* Email input */}
            <div>
              <label
                htmlFor="email"
                className="block text-theme font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-accent"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          {/* Subject input */}
          <div>
            <label
              htmlFor="subject"
              className="block text-theme font-medium mb-2">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-accent"
              placeholder="What is this regarding?"
            />
          </div>

          {/* Message input */}
          <div>
            <label
              htmlFor="message"
              className="block text-theme font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-accent resize-none"
              placeholder="Your message here..."
            />
          </div>

          {/* Submit button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={status.submitting}
              className="px-6 py-3 bg-theme-accent text-theme-secondary-text rounded-lg hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-accent focus:ring-offset-2 disabled:opacity-50">
              {status.submitting ? "Sending..." : "Send Message"}
            </button>
          </div>

          {/* Status message */}
          {status.info.msg && (
            <div
              className={`text-center mt-4 ${status.info.error ? "text-red-500" : "text-green-500"}`}>
              {status.info.msg}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
