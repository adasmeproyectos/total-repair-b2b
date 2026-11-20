import { SettingsManager } from "@/components/admin/SettingsManager";
import { requireAdmin } from "@/lib/supabase/server";
import { normalizeSiteConfig } from "@/lib/site-data";
import type {
  AdminUserRecord,
  SiteConfig,
  SiteRevision,
} from "@/lib/types/cms";

export const dynamic = "force-dynamic";

export default async function AdminConfiguracionPage() {
  const auth = await requireAdmin();
  if (!auth) return null;

  const [configRes, adminsRes, revisionsRes] = await Promise.all([
    auth.supabase
      .from("site_config")
      .select("*")
      .eq("id", "main")
      .maybeSingle(),
    auth.supabase
      .from("admin_users")
      .select("*")
      .order("created_at", { ascending: true }),
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
      initialAdmins={(adminsRes.data ?? []) as AdminUserRecord[]}
      initialRevisions={(revisionsRes.data ?? []) as SiteRevision[]}
      userEmail={auth.userEmail}
    />
  );
}
