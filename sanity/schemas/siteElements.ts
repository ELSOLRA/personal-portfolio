import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteElements",
  title: "Site Elements",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site Title",
      type: "string",
      initialValue: "My Website",
    }),
    defineField({
      name: "logo",
      title: "Site Logo",
      type: "image",
      description: "Logo used in navigation and footer",
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
      name: "logoSecondary",
      title: "Logo (Optional)",
      type: "image",
      description: "Add a logo to display in component",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "logoMobile",
      title: "Mobile Logo (Optional)",
      type: "image",
      description: "Smaller/simplified logo for mobile devices (if different)",
      options: {
        hotspot: true,
      },
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
  ],
});
