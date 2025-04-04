import { About, Experience, Hero, Project, Skill, Theme } from "@/types";
import { client } from "./client";
import { cache } from "react";
import { groq } from "next-sanity";
//   groq here is optional and more for syntax highlighting

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
      layout
    }`
  );
});

export const getTheme = cache(async (): Promise<Theme | null> => {
  return client.fetch(
    groq`*[_type == "theme"][0] {
      _id,
      _type,
      title,
      backgroundColor,
      secondaryBackgroundColor,
      thirdBackgroundColor,
      textColor,
      secondaryTextColor,
      thirdTextColor,
      accentColor,
      secondaryAccentColor,
      thirdAccentColor
    }`
  );
});

export const getActiveTheme = cache(async (): Promise<Theme | null> => {
  return client.fetch(
    groq`*[_type == "themeSelector"][0] {
      "theme": activeTheme-> {
        _id,
        _type,
        title,
        backgroundColor,
        secondaryBackgroundColor,
        thirdBackgroundColor,
        textColor,
        secondaryTextColor,
         thirdTextColor,
        accentColor,
        secondaryAccentColor,
        thirdAccentColor
      }
    }.theme`
  );
});

export const getSiteElements = cache(async () => {
  return client.fetch(
    groq`*[_type == "siteElements"][0] {
      title,
      logo,
      logoSecondary,
      logoMobile,
      primaryButtonText,
      primaryButtonUrl,
      secondaryButtonText,
      secondaryButtonUrl
      
    }`
  );
});
