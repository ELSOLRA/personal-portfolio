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
      name: "logoMobile",
      title: "Mobile Logo (Optional)",
      type: "image",
      description: "Smaller/simplified logo for mobile devices (if different)",
      options: {
        hotspot: true,
      },
    }),
  ],
});
