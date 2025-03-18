import { defineField, defineType } from "sanity";

export default defineType({
  name: "themeSelector",
  title: "Theme Selector",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Active Theme",
      readOnly: true,
    }),
    defineField({
      name: "activeTheme",
      title: "Active Theme",
      type: "reference",
      to: [{ type: "theme" }],
      description: "Select the theme to use for the site",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      themeName: "activeTheme.title",
    },
    prepare({ title, themeName }) {
      return {
        title: title || "Theme Selector",
        subtitle: themeName ? `Active: ${themeName}` : "No theme selected",
      };
    },
  },
});
