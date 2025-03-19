import { About, Hero as HeroType } from "./sanity-content";
import { Theme } from "./sanity-theme";

export interface HeroClientProps {
  hero: HeroType | null;
  about?: About | null;
  theme: Theme | null;
}

export interface AboutClientProps {
  about: About | null;
  theme: Theme | null;
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
