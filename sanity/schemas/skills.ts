import { defineType, defineField } from "sanity";

export default defineType({
  name: "skill",
  title: "Skills",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Skill Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Frontend", value: "frontend" },
          { title: "Backend", value: "backend" },
          { title: "Languages", value: "languages" },
          { title: "Frameworks", value: "frameworks" },
          { title: "Tools", value: "tools" },
          { title: "Soft Skills", value: "soft" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "proficiency",
      title: "Proficiency Level",
      type: "number",
      description: "Scale of 1-100",
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    defineField({
      name: "logo",
      title: "Skill Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "yearsOfExperience",
      title: "Years of Experience",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
      validation: (Rule) => Rule.integer(),
    }),
  ],
});
