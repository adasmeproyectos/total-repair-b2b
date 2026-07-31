"use client";

/**
 * components/layout/Navbar.tsx — Paleta v2 (Blanco / Naranjo)
 * Navbar sobre fondo blanco con texto oscuro y acento naranja.
 * Al hacer scroll: fondo blanco sólido con sombra sutil.
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-sm border-b border-zinc-200"
            : "bg-white/95 border-b border-zinc-200"
        }`}
      >
        <div className="max-w-full px-8 md:px-16 mx-auto h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="hover:opacity-90 transition-opacity"
            aria-label="Total Repair — Inicio"
          >
            <Image
              src="/img/logos/logo.png"
              alt="Total Repair Logo"
              width={160}
              height={40}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors ${
                    isActive
                      ? "text-[#E85B0C] border-b-2 border-[#E85B0C] pb-1"
                      : "text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/contacto"
              className="bg-[#E85B0C] text-white px-6 py-3 uppercase tracking-widest text-xs font-bold hover:bg-[#C4470A] transition-colors"
            >
              Cotizar Proyecto
            </Link>
          </div>

          {/* Mobile Hamburguer */}
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menú"
            className="md:hidden w-10 h-10 flex items-center justify-center text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="w-6 h-6"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
