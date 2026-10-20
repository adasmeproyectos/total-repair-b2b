import React from "react";

interface ImageWrapperProps {
  children: React.ReactNode;
  className?: string;
  overlayOpacity?: "light" | "medium" | "dark" | "heavy" | "none";
}

export function ImageWrapper({
  children,
  className = "",
  overlayOpacity = "dark",
}: ImageWrapperProps) {
  const overlays = {
    none: "",
    light: "bg-zinc-950/20",
    medium: "bg-zinc-950/40",
    dark: "bg-zinc-950/60",
    heavy: "bg-zinc-950/80",
  };

  return (
    <div
      className={`relative overflow-hidden bg-zinc-900 [&_img]:origin-top-left [&_img]:scale-[1.08] [&_img]:object-cover ${className}`}
    >
      <div className="w-full h-full relative z-0 filter contrast-[1.05]">
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
