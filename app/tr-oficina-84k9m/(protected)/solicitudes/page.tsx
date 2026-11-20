import { LeadsInbox } from "@/components/admin/LeadsInbox";
import { requireAdmin } from "@/lib/supabase/server";
import type { ContactLeadRecord } from "@/lib/types/cms";

export const dynamic = "force-dynamic";

export default async function PortalSolicitudesPage() {
  const auth = await requireAdmin();
  if (!auth) return null;

  const { data } = await auth.supabase
    .from("contact_leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  return <LeadsInbox initialLeads={(data ?? []) as ContactLeadRecord[]} />;
}
