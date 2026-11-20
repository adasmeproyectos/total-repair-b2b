import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const nextParam = searchParams.get("next") ?? "/admin";
  const safeNext = nextParam.startsWith("/") ? nextParam : "/admin";

  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto") ?? "https";
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? origin
      : forwardedHost
        ? `${forwardedProto}://${forwardedHost}`
        : origin;

  if (!code) {
    return NextResponse.redirect(`${baseUrl}/admin/login?error=auth_failed`);
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(`${baseUrl}/admin/login?error=auth_failed`);
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.email) {
      await supabase.auth.signOut();
      return NextResponse.redirect(`${baseUrl}/admin/login?error=unauthorized`);
    }

    const { data: adminRow } = await supabase
      .from("admin_users")
      .select("id, is_active")
      .eq("email", user.email.toLowerCase())
      .eq("is_active", true)
      .maybeSingle();

    if (!adminRow) {
      await supabase.auth.signOut();
      return NextResponse.redirect(`${baseUrl}/admin/login?error=unauthorized`);
    }

    return NextResponse.redirect(`${baseUrl}${safeNext}`);
  } catch {
    return NextResponse.redirect(`${baseUrl}/admin/login?error=auth_failed`);
  }
}
