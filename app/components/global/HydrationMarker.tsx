"use client";

import { useEffect } from "react";

export function HydrationMarker() {
  useEffect(() => {
    // a small timeout to ensure theme has been applied
    const timer = setTimeout(() => {
      document.documentElement.classList.add("hydrated");
    }, 100);

    //  shows content even if hydration fails
    const fallbackTimer = setTimeout(() => {
      document.documentElement.classList.add("hydrated");
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return null;
}
