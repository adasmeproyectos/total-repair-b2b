"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_LINKS, COMPANY } from "@/lib/constants";
import MobileMenu from "./MobileMenu";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ${
          isScrolled
            ? "bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 py-3 shadow-lg"
            : "bg-zinc-950 border-b border-zinc-900 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo Corporativo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-11 h-11 overflow-hidden bg-white p-1 rounded-sm flex items-center justify-center">
              <Image
                src="/img/logos/logo.png"
                alt="Total Repair Ltda. Logo"
                fill
                sizes="44px"
                className="object-contain p-0.5"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-extrabold tracking-tight text-xl leading-none font-display uppercase">
                TOTAL <span className="text-[#FF5000]">REPAIR</span>
              </span>
              <span className="text-zinc-400 font-mono text-[10px] tracking-[0.2em] uppercase mt-1">
                Construcción & Siniestros
              </span>
            </div>
          </Link>

          {/* Navegación Desktop */}
          <nav
            aria-label="Navegación principal"
            className="hidden lg:flex items-center gap-7"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide uppercase transition-colors duration-200 relative py-1 ${
                    isActive
                      ? "text-[#FF5000] font-bold"
                      : "text-zinc-300 hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF5000]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Acciones Derecha (Emergencia & Contacto) */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <a
              href={`tel:${COMPANY.phoneClean}`}
              className="flex items-center gap-2 text-zinc-300 hover:text-white text-sm font-mono transition-colors duration-200 px-3 py-2"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4 text-[#FF5000]"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
              <span>{COMPANY.phoneDisplay}</span>
            </a>

            <Link
              href="/contacto?urgencia=true"
              className="flex items-center gap-2 bg-[#FF5000] hover:bg-[#CC4000] text-white text-xs font-bold uppercase tracking-wider px-5 py-3 transition-colors duration-200 shadow-sm"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
              <span>Cotizar / Siniestros</span>
            </Link>
          </div>

          {/* Botón Menú Móvil */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-zinc-300 hover:text-white focus:outline-none"
            aria-label="Abrir menú de navegación"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-7 h-7"
              aria-hidden="true"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}

export default Navbar;
