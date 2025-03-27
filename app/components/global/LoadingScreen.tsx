"use client";
import { RotateLoader } from "react-spinners";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-theme-secondary-bg/30">
      <RotateLoader color="#242DE3" />
    </div>
  );
}
