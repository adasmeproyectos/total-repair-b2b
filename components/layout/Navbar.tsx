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
      setIsScrolled(window.scrollY > 12);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nameParts = company.shortName.split(" ");
  const firstWord = nameParts[0] || "Total";
  const restWords = nameParts.slice(1).join(" ") || "Repair";

  return (
    <>
      <header
        style={{
          borderBottom:
            "var(--tr-divider-width, 1px) solid var(--color-divider, #D6D3CD)",
          backgroundColor: "var(--color-surface-white, #FFFFFF)",
        }}
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-150 ${
          isScrolled ? "border-b" : ""
        }`}
      >
        <div className="tr-container px-4 sm:px-6 md:px-12 h-[76px] flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="relative w-9 h-9 overflow-hidden flex items-center justify-center shrink-0">
              <Image
                src={company.logoUrl || "/img/logos/logo.png"}
                alt={`${company.legalName} Logo`}
                fill
                sizes="36px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span
                style={{ color: "var(--color-ink-anthracite, #141413)" }}
                className="font-bold tracking-tight text-base sm:text-lg leading-none font-display"
              >
                {firstWord}{" "}
                <span style={{ color: "var(--color-brand-orange, #E8490F)" }}>
                  {restWords}
                </span>
              </span>
              <span
                style={{ color: "var(--color-ink-mid, #57534E)" }}
                className="font-mono text-[10px] tracking-[0.12em] uppercase mt-1"
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
                      ? "var(--color-brand-orange, #E8490F)"
                      : "var(--color-ink-anthracite, #141413)",
                  }}
                  className={`text-sm tracking-tight transition-colors duration-150 relative py-1 hover:opacity-100 ${
                    isActive ? "font-semibold" : "font-medium opacity-75"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      style={{
                        backgroundColor: "var(--color-brand-orange, #E8490F)",
                      }}
                      className="absolute bottom-0 left-0 w-full h-[2px]"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-5 shrink-0">
            <a
              href={`tel:${company.phoneClean}`}
              style={{ color: "var(--color-ink-mid, #57534E)" }}
              className="hidden xl:inline-block font-mono text-xs tabular-nums hover:text-[#141413] transition-colors"
            >
              {company.phoneDisplay}
            </a>

            <Link
              href="/contacto?urgencia=true"
              style={{ color: "var(--color-ink-anthracite, #141413)" }}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-tight hover:text-[#E8490F] transition-colors"
            >
              <span
                style={{ backgroundColor: "var(--color-brand-orange, #E8490F)" }}
                className="w-2 h-2 inline-block shrink-0"
                aria-hidden="true"
              />
              <span>Urgencias 24/7</span>
            </Link>

            <Link
              href="/contacto"
              style={{
                backgroundColor: "var(--color-brand-orange, #E8490F)",
                borderRadius: "var(--tr-btn-radius, 0px)",
              }}
              className="text-white text-xs font-semibold tracking-wide uppercase px-5 py-3 transition-opacity duration-150 hover:opacity-90"
            >
              Solicitar presupuesto
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
              strokeWidth="1.75"
              className="w-6 h-6"
              aria-hidden="true"
            >
              <path d="M3 7h18M3 12h18M3 17h18" />
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
