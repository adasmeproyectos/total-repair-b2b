import React from "react";

interface ImageWrapperProps {
  children: React.ReactNode;
  className?: string;
  overlayOpacity?: "light" | "medium" | "dark" | "heavy" | "none";
}

export function ImageWrapper({
  children,
  className = "",
  overlayOpacity = "none",
}: ImageWrapperProps) {
  const overlays = {
    none: "",
    light: "bg-slate-900/10",
    medium: "bg-slate-900/25",
    dark: "bg-slate-900/45",
    heavy: "bg-slate-900/65",
  };

  return (
    <div
      className={`relative overflow-hidden bg-zinc-100 [&_img]:origin-top-left [&_img]:scale-[1.08] [&_img]:object-cover ${className}`}
    >
      <div className="w-full h-full relative z-0 filter contrast-[1.03]">
        {children}
      </div>

      {overlayOpacity !== "none" && (
        <div
          className={`absolute inset-0 pointer-events-none z-10 transition-opacity duration-300 ${overlays[overlayOpacity]}`}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export default ImageWrapper;
