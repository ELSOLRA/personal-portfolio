import ThumbnailPreview from "@/app/components/global/sanity/ThumbnailPreview";
import React from "react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "theme",
  title: "Theme colors",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Theme name",
      type: "string",
    }),
    defineField({
      name: "backgroundColor",
      title: "Background Color",
      type: "color",
      description: "Select a background color for the content side",
    }),
    defineField({
      name: "secondaryBackgroundColor",
      title: "Secondary Background Color",
      type: "color",
      description:
        "Select the secondary background color used for sidebars or alternate sections.",
    }),
    defineField({
      name: "textColor",
      title: "Text Color",
      type: "color",
      description: "Select a color for the main text",
    }),
    defineField({
      name: "secondaryTextColor",
      title: "Secondary Text Color",
      type: "color",
      description: "Select the secondary color for text in alternate sections.",
    }),
    defineField({
      name: "accentColor",
      title: "Accent Color",
      type: "color",
      description: "Select a color for buttons and accents",
    }),
    defineField({
      name: "secondaryAccentColor",
      title: "Secondary Accent Color",
      type: "color",
      description:
        "Select the secondary color for buttons and accents in alternate sections.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      backgroundColor: "backgroundColor",
      textColor: "textColor",
      accentColor: "accentColor",
    },

    prepare(selection) {
      const { title, backgroundColor, textColor, accentColor } = selection;

      return {
        title: title || "Unnamed Theme",
        subtitle: `BG:${backgroundColor?.hex || "N/A"} - Text:${textColor?.hex || "N/A"} - Accent:${accentColor?.hex || "N/A"}`,
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
