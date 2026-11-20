import type { Metadata } from "next";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { getSiteConfig } from "@/lib/site-data";
import { themeToStyleString } from "@/lib/theme-css";

export const metadata: Metadata = {
  manifest: "/manifest.webmanifest",
};

export default async function PublicSiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteConfig = await getSiteConfig();
  const themeStyle = themeToStyleString(siteConfig.theme);

  return (
    <>
      <style
        id="tr-theme-vars"
        dangerouslySetInnerHTML={{ __html: themeStyle }}
      />
      <SiteChrome
        company={siteConfig.company}
        initialTheme={siteConfig.theme}
      >
        {children}
      </SiteChrome>
    </>
  );
}
