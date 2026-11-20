import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { isAllowedOrigin } from "@/lib/security";
import { requireAdmin } from "@/lib/supabase/server";

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Origen no autorizado" }, { status: 403 });
  }

  const auth = await requireAdmin();
  if (!auth) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  revalidateTag("site-config", "max");
  revalidateTag("projects", "max");

  const paths = [
    "/",
    "/empresas",
    "/hogar",
    "/servicios",
    "/proyectos",
    "/nosotros",
    "/contacto",
  ];
  for (const path of paths) {
    revalidatePath(path);
  }
  revalidatePath("/", "layout");

  return NextResponse.json(
    { revalidated: true, timestamp: Date.now() },
    { headers: { "Cache-Control": "no-store" } }
  );
}
