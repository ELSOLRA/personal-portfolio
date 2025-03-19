import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";
import { colorInput } from "@sanity/color-input";

export default defineConfig({
  name: "personal-portfolio",
  title: "Portfolio Next.js",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-03-11",
  basePath: "/studio",

  plugins: [structureTool(), visionTool(), colorInput()],

  schema: {
    types: schemaTypes,
  },
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        return prev.filter(
          (templateItem) =>
            templateItem.templateId != "themeSelector" &&
            templateItem.templateId !== "siteElements"
        );
      }
      return prev;
    },
    actions: (prev, { schemaType }) => {
      if (schemaType === "themeSelector" || schemaType === "siteElements") {
        return prev.filter(({ action }) => {
          // a type guard to check if action is defined
          return (
            action !== undefined &&
            !["unpublish", "delete", "duplicate"].includes(action)
          );
        });
      }
      return prev;
    },
  },
});
