import { PortableTextBlock } from "@portabletext/types";

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

export interface Project {
  _id: string;
  _type: "project";
  title: string;
  slug: {
    _type: "slug";
    current: string;
  };
  description?: string;
  mainImage?: SanityImage;
  technologies?: string[];
  projectUrl?: string;
  githubUrl?: string;
  publishedAt?: string;
}

export interface About {
  _id: string;
  _type: "about";
  name: string;
  role: string;
  profileImage?: SanityImage;
  shortBio?: string;
  fullBio?: PortableTextBlock[];
  email?: string;
  location?: string;
  resumeURL?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    twitch?: string;
  };
  skills?: string[];
}

export interface Skill {
  _id: string;
  _type: "skill";
  title: string;
  category:
    | "frontend"
    | "backend"
    | "languages"
    | "frameworks"
    | "tools"
    | "soft"
    | "other";
  proficiency: number;
  logo?: SanityImage;
  yearsOfExperience?: number;
  order?: number;
}

export interface Experience {
  _id: string;
  _type: "experience";
  company: string;
  position: string;
  companyLogo?: SanityImage;
  startDate: string;
  endDate?: string;
  isCurrentPosition?: boolean;
  location?: string;
  description?: PortableTextBlock[];
  technologies?: string[];
  order?: number;
}
