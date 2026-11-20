import { SettingsManager } from "@/components/admin/SettingsManager";
import { requireAdmin } from "@/lib/supabase/server";
import { normalizeSiteConfig } from "@/lib/site-data";
import type { SiteConfig, SiteRevision } from "@/lib/types/cms";

export const dynamic = "force-dynamic";

export default async function PortalConfiguracionPage() {
  const auth = await requireAdmin();
  if (!auth) return null;

  const [configRes, revisionsRes] = await Promise.all([
    auth.supabase
      .from("site_config")
      .select("*")
      .eq("id", "main")
      .maybeSingle(),
    auth.supabase
      .from("site_revisions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20),
  ]);

  const initialConfig = normalizeSiteConfig(
    configRes.data as Partial<SiteConfig> | null
  );

  return (
    <SettingsManager
      initialConfig={initialConfig}
      initialRevisions={(revisionsRes.data ?? []) as SiteRevision[]}
      userEmail={auth.userEmail}
    />
  );
}
