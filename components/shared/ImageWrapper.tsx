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
    light: "bg-[#141413]/10",
    medium: "bg-[#141413]/25",
    dark: "bg-[#141413]/45",
    heavy: "bg-[#141413]/65",
  };

  return (
    <div
      className={`relative overflow-hidden bg-[#ECEAE3] [&_img]:origin-top-left [&_img]:scale-[1.08] [&_img]:object-cover ${className}`}
    >
      <div className="w-full h-full relative z-0">{children}</div>

      {overlayOpacity !== "none" && (
        <div
          className={`absolute inset-0 pointer-events-none z-10 transition-opacity duration-200 ${overlays[overlayOpacity]}`}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export default ImageWrapper;
