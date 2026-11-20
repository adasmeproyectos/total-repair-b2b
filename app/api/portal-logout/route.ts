import { NextResponse } from "next/server";
import { isAllowedOrigin } from "@/lib/security";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json(
      { error: "Origen no autorizado." },
      { status: 403, headers: { "Cache-Control": "no-store" } }
    );
  }

  try {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  } catch {
    // Continuar con limpieza incluso si la sesión ya expiró
  }

  return NextResponse.json(
    { ok: true },
    { status: 200, headers: { "Cache-Control": "no-store" } }
  );
}
