import { About, Experience, Hero, Project, Skill } from "@/types";
import { client } from "./client";
import { cache } from "react";
import { groq } from "next-sanity";
//   groq is optional and more for syntax highlighting

// gets all projects, ordered/sorted by publishedAt
export const getProjects = cache(async (): Promise<Project[]> => {
  return client.fetch(
    groq`*[_type == "project"] | order(publishedAt desc) {    
      _id,
      _type,
      title,
      slug,
      description,
      mainImage,
      technologies,
      projectUrl,
      githubUrl,
      publishedAt
    }`
  );
});

// gets single about data document
export const getAbout = cache(async (): Promise<About | null> => {
  try {
    const result = await client.fetch(
      groq`*[_type == "about"][0] {
      _id,
      _type,
      name,
      role,
      profileImage,
      shortBio,
      fullBio,
      email,
      location,
      resumeURL,
      socialLinks,
      skills
    }`
    );
    console.log("About query result:", result);
    return result;
  } catch (error) {
    console.error("Error fetching about data:", error);
    return null;
  }
});

// gets a single project by slug
export const getProjectBySlug = cache(
  async (slug: string): Promise<Project> => {
    return client.fetch(
      groq`*[_type == "project" && slug.current == $slug][0] {
      _id,
      _type,
      title,
      slug,
      description,
      mainImage,
      technologies,
      projectUrl,
      githubUrl,
      publishedAt
    }`,
      { slug }
    );
  }
);

// gets all skills, ordered/sorted by category
export const getSkills = cache(async (): Promise<Skill[]> => {
  return client.fetch(
    groq`*[_type == "skill"] | order(category asc) {
      _id,
      _type,
      title,
      category,
      proficiency,
      logo,
      yearsOfExperience
    }`
  );
});

// gets skills grouped by category
export const getSkillsByCategory = cache(
  async (): Promise<Record<string, Skill[]>> => {
    const skills = await getSkills();
    return skills.reduce(
      (acc, skill) => {
        const category = skill.category;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(skill);
        return acc;
      },
      {} as Record<string, Skill[]>
    );
  }
);

// gets all work experiences, ordered by startDate (most recent first)
export const getExperiences = cache(async (): Promise<Experience[]> => {
  return client.fetch(
    groq`*[_type == "experience"] | order(startDate desc) {
      _id,
      _type,
      company,
      position,
      companyLogo,
      startDate,
      endDate,
      isCurrentPosition,
      location,
      description,
      technologies
    }`
  );
});

// gets hero styles and content
export const getHero = cache(async (): Promise<Hero | null> => {
  return client.fetch(
    groq`*[_type == "hero"][0] {
      _id,
      _type,
      title,
      subtitle,
      description,
      mainImage,
      logo,
      backgroundColor,
      textColor,
      accentColor,
      primaryButtonText,
      primaryButtonUrl,
      secondaryButtonText,
      secondaryButtonUrl,
      layout
    }`
  );
});
