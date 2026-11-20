"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFAB } from "@/components/shared/WhatsAppFAB";
import { buildThemeCssVars } from "@/lib/theme-css";
import type { SiteCompany, SiteTheme } from "@/lib/types/cms";

interface SiteChromeProps {
  children: React.ReactNode;
  company: SiteCompany;
  initialTheme: SiteTheme;
}

export function SiteChrome({
  children,
  company,
  initialTheme,
}: SiteChromeProps) {
  const [liveTheme, setLiveTheme] = useState<SiteTheme | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (window.self === window.top) return;
      if (event.origin !== window.location.origin) return;
      if (
        event.data &&
        typeof event.data === "object" &&
        !Array.isArray(event.data) &&
        event.data.type === "TR_PREVIEW_THEME" &&
        event.data.theme &&
        typeof event.data.theme === "object" &&
        !Array.isArray(event.data.theme)
      ) {
        setLiveTheme(event.data.theme as SiteTheme);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const activeTheme = liveTheme ?? initialTheme;
  const inlineVars = buildThemeCssVars(activeTheme);
  const safeScale = inlineVars["--tr-text-scale"] ?? "1";

  return (
    <div
      id="tr-public-root"
      className="tr-public-site min-h-screen flex flex-col"
      style={inlineVars as React.CSSProperties}
    >
      {liveTheme && (
        <style
          dangerouslySetInnerHTML={{
            __html: `html:has(.tr-public-site){--tr-text-scale:${safeScale};font-size:calc(16px * var(--tr-text-scale));}`,
          }}
        />
      )}
      <Navbar company={company} />
      <main className="flex-1">{children}</main>
      <Footer company={company} />
      <WhatsAppFAB company={company} />
    </div>
  );
}
