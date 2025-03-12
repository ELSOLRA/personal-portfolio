import { defineField, defineType } from "sanity";

export default defineType({
  name: "about",
  title: "About Me",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role/Position",
      type: "string",
      description: "In short, what do you do?",
      validation: (Rule) => Rule.required().min(3).max(40),
    }),
    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      description: "Upload a profile picture",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "shortBio",
      title: "Short Bio",
      type: "text",
      description: "Brief introduction (1-2 sentences)",
      rows: 4,
    }),
    defineField({
      name: "fullBio",
      title: "Full Bio",
      type: "array",
      of: [{ type: "block" }],
      description: "Detailed information about yourself",
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "City, Country",
    }),
    defineField({
      name: "resumeURL",
      title: "Resume/CV URL",
      type: "url",
      description: "Link to downloadable resume",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      description: "Add your social media links:",
      fields: [
        {
          name: "github",
          title: "Github URL",
          type: "url",
          initialValue: "https://github.com/",
        },
        {
          name: "linkedin",
          title: "Linkedin URL",
          type: "url",
          initialValue: "https://linkedin.com/in/",
        },
        /*         {
          name: "twitter",
          title: "Twitter URL",
          type: "url",
          initialValue: "https://twitter.com/",
        },
        {
          name: "twitch",
          title: "Twitch URL",
          type: "url",
          initialValue: "https://twitch.com/",
        }, */
      ],
      options: {
        collapsed: false,
        collapsible: true,
        columns: 2,
      },
    }),
    /*     defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      description: "Add a list of skills",
      of: [{ type: "string" }],
    }), */
  ],
});
