import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import {
  PORTAL_BASE_PATH,
  PORTAL_LOGIN_PATH,
  PORTAL_MANIFEST_PATH,
} from "@/lib/portal-config";

function applyPortalSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set(
    "X-Robots-Tag",
    "noindex, nofollow, noarchive, nosnippet"
  );
  response.headers.set("Cache-Control", "no-store, max-age=0");
  response.headers.set("Referrer-Policy", "no-referrer");
  return response;
}

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });
  const pathname = request.nextUrl.pathname;

  if (pathname === PORTAL_MANIFEST_PATH) {
    return applyPortalSecurityHeaders(supabaseResponse);
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    return applyPortalSecurityHeaders(supabaseResponse);
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (pathname.startsWith(PORTAL_BASE_PATH)) {
    const isLogin = pathname === PORTAL_LOGIN_PATH;

    if (!user?.email) {
      if (isLogin) return applyPortalSecurityHeaders(supabaseResponse);
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = PORTAL_LOGIN_PATH;
      loginUrl.search = "";
      return applyPortalSecurityHeaders(NextResponse.redirect(loginUrl));
    }

    const { data: adminRow } = await supabase
      .from("admin_users")
      .select("id, is_active")
      .eq("email", user.email.toLowerCase())
      .eq("is_active", true)
      .maybeSingle();

    if (!adminRow) {
      if (isLogin) return applyPortalSecurityHeaders(supabaseResponse);
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = PORTAL_LOGIN_PATH;
      loginUrl.searchParams.set("error", "unauthorized");
      return applyPortalSecurityHeaders(NextResponse.redirect(loginUrl));
    }

    if (isLogin && !request.nextUrl.searchParams.get("error")) {
      const adminUrl = request.nextUrl.clone();
      adminUrl.pathname = PORTAL_BASE_PATH;
      adminUrl.search = "";
      return applyPortalSecurityHeaders(NextResponse.redirect(adminUrl));
    }
  }

  return applyPortalSecurityHeaders(supabaseResponse);
}

export const config = {
  matcher: ["/tr-oficina-84k9m/:path*"],
};
