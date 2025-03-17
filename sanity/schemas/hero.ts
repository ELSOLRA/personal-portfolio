import { defineField, defineType } from "sanity";

export default defineType({
  name: "hero",
  title: "Hero Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Greeting Title",
      type: "string",
      description: 'The main greeting (e.g., "Hi, I\'m John Doe")',
    }),
    defineField({
      name: "subtitle",
      title: "Role/Subtitle",
      type: "string",
      description: "Your role or a brief subtitle",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "A short description or bio for the hero section",
      rows: 3,
    }),
    defineField({
      name: "mainImage",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alternative Text",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "logo",
      title: "Logo (Optional)",
      type: "image",
      description: "Add a logo to display in the hero section",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "backgroundColor",
      title: "Background Color",
      type: "color",
      description: "Select a background color for the content side",
    }),
    defineField({
      name: "textColor",
      title: "Text Color",
      type: "color",
      description: "Select a color for the main text",
    }),
    defineField({
      name: "accentColor",
      title: "Accent Color",
      type: "color",
      description: "Select a color for buttons and accents",
    }),
    defineField({
      name: "primaryButtonText",
      title: "Primary Button Text",
      type: "string",
      initialValue: "View My Work",
    }),
    defineField({
      name: "primaryButtonUrl",
      title: "Primary Button URL",
      type: "string",
      initialValue: "/projects",
    }),
    defineField({
      name: "secondaryButtonText",
      title: "Secondary Button Text",
      type: "string",
      initialValue: "Contact Me",
    }),
    defineField({
      name: "secondaryButtonUrl",
      title: "Secondary Button URL",
      type: "string",
      initialValue: "/contact",
    }),
    defineField({
      name: "layout",
      title: "Layout Style",
      type: "string",
      options: {
        list: [
          { title: "Split Screen (Image Right)", value: "split-right" },
          { title: "Split Screen (Image Left)", value: "split-left" },
          { title: "Image Background with Overlay", value: "overlay" },
          { title: "Minimal with Small Image", value: "minimal" },
        ],
      },
      initialValue: "split-right",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      media: "mainImage",
    },
  },
});
