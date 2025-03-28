import AboutDetail from "@/app/components/sections/aboutDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About me",
  description: "Learn more about my background, skills, and experience",
};

export default function AboutPage() {
  return <AboutDetail />;
}
