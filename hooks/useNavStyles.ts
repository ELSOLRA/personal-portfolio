"use client";

import { usePathname } from "next/navigation";

export function useNavStyles(isScrolled: boolean) {
  const pathname = usePathname();

  // regex to check if we're on a specific project page
  const isProjectPage = pathname?.match(/^\/projects\/[^\/]+$/);
  const isAboutPage = pathname?.match(/^\/about$/);
  const isProjectListPage = pathname?.match(/^\/projects$/);
  const isStudioPage = pathname?.match(/^\/studio(\/.*)?$/);

  if (isStudioPage) {
    return {
      isProjectPage,
      isAboutPage,
      headerClasses: "hidden",
      isProjectListPage,
      isStudioPage,
    };
  }

  const headerClasses =
    isProjectPage || isScrolled || isAboutPage || isProjectListPage
      ? "fixed w-full top-0 bg-theme-accent/90 backdrop-blur-sm shadow-md"
      : "absolute top-4 left-[2.5%] w-[95%] bg-theme-accent";

  return {
    isProjectPage,
    isAboutPage,
    headerClasses,
    isProjectListPage,
    isStudioPage,
  };
}
