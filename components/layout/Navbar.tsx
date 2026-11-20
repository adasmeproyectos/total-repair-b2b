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
            "var(--tr-divider-width, 1px) solid var(--color-divider, #E4E4E7)",
          backgroundColor: isScrolled
            ? "color-mix(in srgb, var(--color-surface-white, #FFFFFF) 95%, transparent)"
            : "var(--color-surface-white, #FFFFFF)",
        }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
          isScrolled ? "backdrop-blur-md py-3 shadow-sm" : "py-4"
        }`}
      >
        <div className="tr-container px-4 sm:px-6 md:px-12 flex items-center justify-between">
          {/* Logo Corporativo */}
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
                style={{ color: "var(--color-ink-anthracite, #0F172A)" }}
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

          {/* Navegación Desktop */}
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
                      : "var(--color-ink-mid, #52525B)",
                  }}
                  className={`text-sm tracking-wide uppercase transition-colors duration-200 relative py-1 hover:opacity-100 ${
                    isActive ? "font-bold" : "font-medium opacity-90"
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

          {/* Acciones Derecha (Teléfono & Cotizar) */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <a
              href={`tel:${company.phoneClean}`}
              style={{ color: "var(--color-ink-mid, #52525B)" }}
              className="flex items-center gap-2 text-sm font-mono transition-colors duration-200 px-2 py-2 hover:opacity-100"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ color: "var(--color-brand-orange, #FF5000)" }}
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
              <span>{company.phoneDisplay}</span>
            </a>

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

          {/* Botón Menú Móvil */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            style={{ color: "var(--color-ink-anthracite, #0F172A)" }}
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
