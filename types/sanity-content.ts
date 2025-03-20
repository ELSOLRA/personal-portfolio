import { SanityImage } from "./sanity-base";
import { PortableTextBlock } from "@portabletext/types";

export interface Hero {
  _id: string;
  _type: "hero";
  title?: string;
  subtitle?: string;
  description?: string;
  mainImage?: SanityImage;
  logo?: SanityImage;
  /*   backgroundColor?: {
    hex: string;
    alpha?: number;
  };
  textColor?: {
    hex: string;
    alpha?: number;
  };
  accentColor?: {
    hex: string;
    alpha?: number;
  }; */
  layout?: "split-right" | "split-left" | "overlay" | "minimal";
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

export interface SiteElements {
  _id: string;
  _type: "siteElements";
  title?: string;
  logo?: SanityImage;
  logoMobile?: SanityImage;
  primaryButtonText?: string;
  primaryButtonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
}
