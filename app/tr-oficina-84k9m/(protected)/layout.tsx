import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { PORTAL_LOGIN_PATH } from "@/lib/portal-config";
import { requireAdmin } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Panel de Control",
  robots: { index: false, follow: false },
};

export default async function ProtectedPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await requireAdmin();

  if (!auth) {
    redirect(PORTAL_LOGIN_PATH);
  }

  return (
    <AdminShell
      userEmail={auth.userEmail}
      adminName={auth.admin.display_name}
    >
      {children}
    </AdminShell>
  );
}
