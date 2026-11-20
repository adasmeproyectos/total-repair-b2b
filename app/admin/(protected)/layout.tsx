import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Panel de Administración",
  robots: { index: false, follow: false },
};

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await requireAdmin();

  if (!auth) {
    redirect("/admin/login");
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
