import type { Metadata } from "next";
import { PORTAL_MANIFEST_PATH } from "@/lib/portal-config";

export const metadata: Metadata = {
  title: {
    default: "Gestión Privada",
    template: "%s | Gestión Privada",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  manifest: PORTAL_MANIFEST_PATH,
};

export default function PortalRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
