import ThumbnailPreview from "@/app/components/global/sanity/ThumbnailPreview";
import React from "react";
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
      backgroundColor: "activeTheme.backgroundColor",
      accentColor: "activeTheme.accentColor",
      textColor: "activeTheme.textColor",
    },
    prepare({ title, themeName, backgroundColor, accentColor, textColor }) {
      return {
        title: title || "Theme Selector",
        subtitle: themeName ? `Active: ${themeName}` : "No theme selected",
        media: () =>
          React.createElement(ThumbnailPreview, {
            backgroundColor,
            textColor,
            accentColor,
          }),
      };
    },
  },
});
