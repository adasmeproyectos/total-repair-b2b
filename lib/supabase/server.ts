import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import type { AdminUserRecord } from "@/lib/types/cms";

export function createSupabasePublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    return null;
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

export async function createSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Faltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"
    );
  }

  const cookieStore = await cookies();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Server Component read-only context: proxy handles cookie refresh
        }
      },
    },
  });
}

export async function requireAdmin(): Promise<{
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>;
  userEmail: string;
  admin: AdminUserRecord;
} | null> {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user?.email) {
      return null;
    }

    const { data: admin, error: adminError } = await supabase
      .from("admin_users")
      .select("id, email, display_name, role, is_active, created_at")
      .eq("email", user.email.toLowerCase())
      .eq("is_active", true)
      .maybeSingle();

    if (adminError || !admin) {
      return null;
    }

    return {
      supabase,
      userEmail: user.email.toLowerCase(),
      admin: admin as AdminUserRecord,
    };
  } catch {
    return null;
  }
}
