"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";
import { DEFAULT_SITE_CONFIG } from "@/lib/default-site-config";
import type { SiteCompany } from "@/lib/types/cms";
import { MobileMenu } from "./MobileMenu";

interface NavbarProps {
  company?: SiteCompany;
}

export function Navbar({
  company = DEFAULT_SITE_CONFIG.company,
}: NavbarProps) {
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

  const nameParts = company.shortName.split(" ");
  const firstWord = nameParts[0] || "TOTAL";
  const restWords = nameParts.slice(1).join(" ") || "REPAIR";

  return (
    <>
      <header
        style={{
          borderBottom:
            "var(--tr-divider-width, 1px) solid var(--color-divider, #E2DFD7)",
          backgroundColor: isScrolled
            ? "color-mix(in srgb, var(--color-surface-white, #FFFFFF) 96%, transparent)"
            : "var(--color-surface-white, #FFFFFF)",
        }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
          isScrolled ? "backdrop-blur-md shadow-sm" : ""
        }`}
      >
        {/* Franja superior de Emergencias 24/7 */}
        <div
          style={{
            backgroundColor: "var(--color-surface-dark, #141413)",
          }}
          className="hidden sm:block text-white border-b border-white/10"
        >
          <div className="tr-container px-4 sm:px-6 md:px-12 h-8 flex items-center justify-between text-[11px] font-mono">
            <div className="flex items-center gap-2.5 text-zinc-300">
              <span className="relative flex h-2 w-2">
                <span
                  style={{ backgroundColor: "var(--color-brand-orange, #FF5000)" }}
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                />
                <span
                  style={{ backgroundColor: "var(--color-brand-orange, #FF5000)" }}
                  className="relative inline-flex rounded-full h-2 w-2"
                />
              </span>
              <span className="uppercase tracking-wider font-semibold text-white">
                {company.emergencyHours}
              </span>
              <span className="text-zinc-500 hidden md:inline">·</span>
              <span className="text-zinc-400 hidden md:inline">
                {company.addressShort}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <a
                href={`tel:${company.phoneClean}`}
                className="text-zinc-300 hover:text-white transition-colors"
              >
                Llamar: <strong className="text-white">{company.phoneDisplay}</strong>
              </a>
              <Link
                href="/contacto?urgencia=true"
                style={{ color: "var(--color-brand-orange, #FF5000)" }}
                className="font-bold uppercase tracking-wider hover:underline"
              >
                Reportar Urgencia →
              </Link>
            </div>
          </div>
        </div>

        {/* Barra principal de navegación */}
        <div
          className={`tr-container px-4 sm:px-6 md:px-12 flex items-center justify-between transition-all duration-200 ${
            isScrolled ? "py-2.5" : "py-3.5"
          }`}
        >
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 overflow-hidden flex items-center justify-center shrink-0">
              <Image
                src={company.logoUrl || "/img/logos/logo.png"}
                alt={`${company.legalName} Logo`}
                fill
                sizes="44px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span
                style={{ color: "var(--color-ink-anthracite, #141413)" }}
                className="font-extrabold tracking-tight text-lg sm:text-xl leading-none font-display uppercase"
              >
                {firstWord}{" "}
                <span style={{ color: "var(--color-brand-orange, #FF5000)" }}>
                  {restWords}
                </span>
              </span>
              <span
                style={{ color: "var(--color-ink-mid, #52525B)" }}
                className="font-mono text-[10px] tracking-[0.18em] uppercase mt-1"
              >
                {company.tagline}
              </span>
            </div>
          </Link>

          <nav
            aria-label="Navegación principal"
            className="hidden lg:flex items-center gap-7"
          >
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    color: isActive
                      ? "var(--color-brand-orange, #FF5000)"
                      : "var(--color-ink-anthracite, #141413)",
                  }}
                  className={`text-sm tracking-wide uppercase transition-colors duration-200 relative py-1 hover:opacity-100 ${
                    isActive ? "font-bold" : "font-semibold opacity-75"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      style={{
                        backgroundColor: "var(--color-brand-orange, #FF5000)",
                      }}
                      className="absolute bottom-0 left-0 w-full h-0.5"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Link
              href="/contacto?urgencia=true"
              style={{
                borderRadius: "var(--tr-btn-radius, 2px)",
                borderColor: "var(--color-ink-anthracite, #141413)",
                color: "var(--color-ink-anthracite, #141413)",
              }}
              className="border px-4 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#141413] hover:text-white transition-colors"
            >
              Siniestros 24/7
            </Link>

            <Link
              href="/contacto"
              style={{
                backgroundColor: "var(--color-brand-orange, #FF5000)",
                borderRadius: "var(--tr-btn-radius, 2px)",
              }}
              className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider px-5 py-3 transition-opacity duration-200 hover:opacity-90 shadow-xs"
            >
              <span>Cotizar Proyecto</span>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            style={{ color: "var(--color-ink-anthracite, #141413)" }}
            className="lg:hidden p-2 focus:outline-none"
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
        company={company}
      />
    </>
  );
}

export default Navbar;
