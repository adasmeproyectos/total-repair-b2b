import { ProjectsManager } from "@/components/admin/ProjectsManager";
import { requireAdmin } from "@/lib/supabase/server";
import type { ProjectImageRecord, ProjectRecord } from "@/lib/types/cms";

export const dynamic = "force-dynamic";

export default async function AdminProyectosPage() {
  const auth = await requireAdmin();
  if (!auth) return null;

  const { data } = await auth.supabase
    .from("projects")
    .select(
      "id, slug, title, category, division, location, year, description, tags, cover_image_url, is_featured, is_published, sort_order, created_at, updated_at, project_images(id, project_id, image_url, storage_path, caption, photo_type, sort_order, created_at)"
    )
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  const initialProjects: ProjectRecord[] = (data ?? []).map((row) => {
    const imgs = (
      (row as { project_images?: ProjectImageRecord[] }).project_images ?? []
    )
      .slice()
      .sort((a, b) => a.sort_order - b.sort_order);

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
      cover_image_url: row.cover_image_url,
      is_featured: Boolean(row.is_featured),
      is_published: Boolean(row.is_published),
      sort_order: Number(row.sort_order ?? 0),
      created_at: row.created_at,
      updated_at: row.updated_at,
      images: imgs,
    };
  });

  return <ProjectsManager initialProjects={initialProjects} />;
}
