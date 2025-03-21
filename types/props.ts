import {
  About,
  Hero as HeroType,
  Project,
  SiteElements,
} from "./sanity-content";
import { Theme } from "./sanity-theme";

export interface NavigationClientProps {
  elements: SiteElements | null;
  theme: Theme | null;
}

export interface HeroClientProps {
  hero: HeroType | null;
  about?: About | null;
  theme: Theme | null;
  elements: SiteElements | null;
}

export interface AboutClientProps {
  about: About | null;
  theme: Theme | null;
  elements: SiteElements | null;
}

export interface PageProps {
  hero: HeroType | null;
  about: About | null;
  theme: Theme | null;
}

export interface ThumbnailPreviewProps {
  backgroundColor?: { hex?: string };
  textColor?: { hex?: string };
  accentColor?: { hex?: string };
}

export interface ProjectClientProps {
  project: Project | null;
  theme: Theme | null;
  elements: SiteElements | null;
  slug: string;
}

export interface ProjectsListClientProps {
  projects: Project[];
  theme: Theme | null;
  elements: SiteElements | null;
}

export interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}
