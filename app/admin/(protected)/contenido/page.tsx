import { ContentEditor } from "@/components/admin/ContentEditor";
import { requireAdmin } from "@/lib/supabase/server";
import { normalizeSiteConfig } from "@/lib/site-data";
import type { SiteConfig } from "@/lib/types/cms";

export const dynamic = "force-dynamic";

export default async function AdminContenidoPage() {
  const auth = await requireAdmin();
  if (!auth) return null;

  const { data } = await auth.supabase
    .from("site_config")
    .select("*")
    .eq("id", "main")
    .maybeSingle();

  const initialConfig = normalizeSiteConfig(data as Partial<SiteConfig> | null);

  return (
    <ContentEditor initialConfig={initialConfig} userEmail={auth.userEmail} />
  );
}
