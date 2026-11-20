"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  ExternalLink,
  FileText,
  FolderKanban,
  Home,
  Inbox,
  LogOut,
  Palette,
  Settings,
} from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { PwaInstallBanner } from "./PwaInstallBanner";

interface AdminShellProps {
  children: React.ReactNode;
  userEmail: string;
  adminName: string;
}

const NAV_ITEMS = [
  { href: "/admin", label: "Inicio", short: "Inicio", icon: Home },
  {
    href: "/admin/proyectos",
    label: "Proyectos y Fotos",
    short: "Proyectos",
    icon: FolderKanban,
  },
  {
    href: "/admin/contenido",
    label: "Textos e Imágenes",
    short: "Textos",
    icon: FileText,
  },
  {
    href: "/admin/diseno",
    label: "Diseño Visual",
    short: "Diseño",
    icon: Palette,
  },
  {
    href: "/admin/solicitudes",
    label: "Solicitudes",
    short: "Mensajes",
    icon: Inbox,
  },
  {
    href: "/admin/configuracion",
    label: "Ajustes y Respaldos",
    short: "Ajustes",
    icon: Settings,
  },
];

export function AdminShell({
  children,
  userEmail,
  adminName,
}: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    }
  }, []);

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      const supabase = createSupabaseBrowserClient();
      await supabase.auth.signOut();
      router.push("/admin/login");
      router.refresh();
    } finally {
      setSigningOut(false);
    }
  };

  const isRouteActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col lg:flex-row">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 bg-white border-r border-zinc-200 z-30">
        <div className="p-6 border-b border-zinc-200 flex items-center gap-3">
          <div className="relative w-10 h-10 shrink-0">
            <Image
              src="/img/logos/logo.png"
              alt="Total Repair"
              fill
              sizes="40px"
              className="object-contain"
            />
          </div>
          <div>
            <p className="font-display font-black text-lg leading-none">
              TOTAL <span className="text-[#FF5000]">REPAIR</span>
            </p>
            <p className="text-xs font-mono text-zinc-500 mt-1">
              Panel de Control
            </p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isRouteActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3.5 px-4 py-3.5 min-h-[52px] text-[15px] font-semibold transition-colors ${
                  active
                    ? "bg-[#FF5000] text-white shadow-xs"
                    : "text-zinc-700 hover:bg-zinc-100 hover:text-[#0F172A]"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-200 space-y-2.5 bg-zinc-50/70">
          <div className="px-2 py-1">
            <p className="text-xs text-zinc-500 font-medium">Conectado como:</p>
            <p className="text-sm font-bold text-[#0F172A] truncate">
              {adminName || userEmail}
            </p>
            <p className="text-xs text-zinc-500 truncate">{userEmail}</p>
          </div>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-[48px] bg-white border border-zinc-300 hover:border-[#FF5000] text-[#0F172A] font-bold text-sm px-4 py-2.5 flex items-center justify-center gap-2 transition-colors"
          >
            <span>Ver mi web pública</span>
            <ExternalLink className="w-4 h-4 text-[#FF5000]" />
          </a>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="w-full min-h-[44px] bg-white border border-zinc-200 hover:border-red-300 hover:text-red-700 text-zinc-600 font-semibold text-sm px-4 py-2 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>{signingOut ? "Saliendo..." : "Cerrar sesión"}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen pb-24 lg:pb-10">
        {/* Top Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 bg-white border-b border-zinc-200 px-4 py-3 flex items-center justify-between gap-2">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 shrink-0">
              <Image
                src="/img/logos/logo.png"
                alt="Total Repair"
                fill
                sizes="32px"
                className="object-contain"
              />
            </div>
            <span className="font-display font-black text-base">
              TR <span className="text-[#FF5000]">ADMIN</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/configuracion"
              className={`p-2.5 border text-xs font-bold inline-flex items-center gap-1 ${
                isRouteActive("/admin/configuracion")
                  ? "bg-[#FF5000] text-white border-[#FF5000]"
                  : "bg-zinc-50 text-zinc-700 border-zinc-200"
              }`}
              aria-label="Ajustes"
            >
              <Settings className="w-4 h-4" />
              <span>Ajustes</span>
            </Link>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-zinc-50 border border-zinc-200 text-zinc-700 text-xs font-bold inline-flex items-center gap-1"
            >
              <span>Web</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#FF5000]" />
            </a>
            <button
              type="button"
              onClick={handleSignOut}
              disabled={signingOut}
              className="p-2.5 bg-zinc-50 border border-zinc-200 text-zinc-600"
              aria-label="Cerrar sesión"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <PwaInstallBanner />
          {children}
        </main>
      </div>

      {/* Bottom Mobile Navigation (5 big touch targets) */}
      <nav
        aria-label="Navegación rápida de administración"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-zinc-200 grid grid-cols-5 shadow-lg"
      >
        {NAV_ITEMS.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const active = isRouteActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-2.5 px-1 min-h-[60px] text-[11px] font-bold transition-colors ${
                active ? "text-[#FF5000] bg-orange-50/50" : "text-zinc-600"
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="truncate max-w-full">{item.short}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
