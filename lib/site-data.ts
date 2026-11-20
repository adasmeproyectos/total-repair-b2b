import { unstable_cache } from "next/cache";
import {
  DEFAULT_PROJECTS,
  DEFAULT_SITE_CONFIG,
} from "@/lib/default-site-config";
import { createSupabasePublicClient } from "@/lib/supabase/server";
import type {
  ProjectImageRecord,
  ProjectRecord,
  SiteConfig,
  SiteContent,
} from "@/lib/types/cms";

function mergeRecord<T extends Record<string, unknown>>(
  base: T,
  override: unknown
): T {
  if (!override || typeof override !== "object" || Array.isArray(override)) {
    return base;
  }
  const src = override as Record<string, unknown>;
  const result: Record<string, unknown> = { ...base };

  for (const key of Object.keys(base)) {
    const baseVal = base[key];
    const overVal = src[key];
    if (overVal === undefined || overVal === null) continue;

    if (
      typeof baseVal === "object" &&
      baseVal !== null &&
      !Array.isArray(baseVal) &&
      typeof overVal === "object" &&
      overVal !== null &&
      !Array.isArray(overVal)
    ) {
      result[key] = mergeRecord(
        baseVal as Record<string, unknown>,
        overVal
      );
    } else if (Array.isArray(baseVal)) {
      result[key] = Array.isArray(overVal) ? overVal : baseVal;
    } else {
      result[key] = overVal;
    }
  }

  return result as T;
}

export function normalizeSiteConfig(
  raw: Partial<SiteConfig> | null | undefined
): SiteConfig {
  if (!raw) return DEFAULT_SITE_CONFIG;

  const theme = mergeRecord(
    DEFAULT_SITE_CONFIG.theme as unknown as Record<string, unknown>,
    raw.theme
  ) as unknown as SiteConfig["theme"];

  const company = mergeRecord(
    DEFAULT_SITE_CONFIG.company as unknown as Record<string, unknown>,
    raw.company
  ) as unknown as SiteConfig["company"];

  const content = mergeRecord(
    DEFAULT_SITE_CONFIG.content as unknown as Record<string, unknown>,
    raw.content
  ) as unknown as SiteContent;

  return {
    id: raw.id || "main",
    theme,
    company,
    content,
    updated_at: raw.updated_at,
    updated_by: raw.updated_by,
  };
}

const fetchCachedSiteConfig = unstable_cache(
  async (): Promise<SiteConfig> => {
    try {
      const supabase = createSupabasePublicClient();
      if (!supabase) return DEFAULT_SITE_CONFIG;

      const { data, error } = await supabase
        .from("site_config")
        .select("id, theme, company, content, updated_at, updated_by")
        .eq("id", "main")
        .maybeSingle();

      if (error || !data) {
        return DEFAULT_SITE_CONFIG;
      }

      return normalizeSiteConfig(data as Partial<SiteConfig>);
    } catch {
      return DEFAULT_SITE_CONFIG;
    }
  },
  ["site-config-main"],
  { tags: ["site-config"], revalidate: 60 }
);

export async function getSiteConfig(): Promise<SiteConfig> {
  return fetchCachedSiteConfig();
}

const fetchCachedProjects = unstable_cache(
  async (): Promise<ProjectRecord[]> => {
    try {
      const supabase = createSupabasePublicClient();
      if (!supabase) return DEFAULT_PROJECTS;

      const { data, error } = await supabase
        .from("projects")
        .select(
          "id, slug, title, category, division, location, year, description, tags, cover_image_url, is_featured, is_published, sort_order, created_at, updated_at, project_images(id, project_id, image_url, storage_path, caption, photo_type, sort_order, created_at)"
        )
        .eq("is_published", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (error) {
        return DEFAULT_PROJECTS;
      }

      return (data ?? []).map((row) => {
        const rawImages = (
          (row as { project_images?: ProjectImageRecord[] }).project_images ??
          []
        )
          .slice()
          .sort((a, b) => a.sort_order - b.sort_order);

        const images: ProjectImageRecord[] =
          rawImages.length > 0
            ? rawImages
            : row.cover_image_url
              ? [
                  {
                    id: `${row.id}-cover`,
                    project_id: row.id,
                    image_url: row.cover_image_url,
                    storage_path: null,
                    caption: row.title,
                    photo_type: "gallery",
                    sort_order: 1,
                  },
                ]
              : [];

        return {
          id: row.id,
          slug: row.slug,
          title: row.title,
          category: row.category,
          division: row.division,
          location: row.location,
          year: row.year,
          description: row.description,
          tags: Array.isArray(row.tags) ? row.tags : [],
          cover_image_url:
            row.cover_image_url || images[0]?.image_url || "/img/fotos/hero-corporativo.jpg",
          is_featured: Boolean(row.is_featured),
          is_published: Boolean(row.is_published),
          sort_order: Number(row.sort_order ?? 0),
          created_at: row.created_at,
          updated_at: row.updated_at,
          images,
        };
      });
    } catch {
      return DEFAULT_PROJECTS;
    }
  },
  ["published-projects"],
  { tags: ["projects"], revalidate: 60 }
);

export async function getPublishedProjects(): Promise<ProjectRecord[]> {
  return fetchCachedProjects();
}
