"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";
import { DEFAULT_SITE_CONFIG } from "@/lib/default-site-config";
import type { SiteCompany } from "@/lib/types/cms";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  company?: SiteCompany;
}

export function MobileMenu({
  isOpen,
  onClose,
  company = DEFAULT_SITE_CONFIG.company,
}: MobileMenuProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  const nameParts = company.shortName.split(" ");
  const firstWord = nameParts[0] || "Total";
  const restWords = nameParts.slice(1).join(" ") || "Repair";

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Menú de navegación móvil"
    >
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#141413]/45"
        aria-hidden="true"
      />

      <div
        style={{ backgroundColor: "var(--color-surface-white, #FFFFFF)" }}
        className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] border-l border-[#D6D3CD] flex flex-col justify-between overflow-y-auto z-10"
      >
        <div className="p-6 flex items-center justify-between tr-divider-b">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2.5"
          >
            <div className="relative w-8 h-8 shrink-0">
              <Image
                src={company.logoUrl || "/img/logos/logo.png"}
                alt={company.legalName}
                fill
                sizes="32px"
                className="object-contain"
              />
            </div>
            <span
              style={{ color: "var(--color-ink-anthracite, #141413)" }}
              className="font-display font-bold text-lg tracking-tight"
            >
              {firstWord}{" "}
              <span style={{ color: "var(--color-brand-orange, #E8490F)" }}>
                {restWords}
              </span>
            </span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            style={{ color: "var(--color-ink-anthracite, #141413)" }}
            className="p-2 bg-[#F7F6F2] border border-[#D6D3CD]"
            aria-label="Cerrar menú"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              className="w-5 h-5"
              aria-hidden="true"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav
          aria-label="Menú móvil"
          className="p-6 flex-1 flex flex-col divide-y divide-[#D6D3CD]"
        >
          {NAV_LINKS.map((link, idx) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                style={{
                  color: isActive
                    ? "var(--color-brand-orange, #E8490F)"
                    : "var(--color-ink-anthracite, #141413)",
                }}
                className={`flex items-center justify-between py-4 px-2 text-sm font-semibold tracking-tight transition-colors duration-150 ${
                  isActive ? "" : "hover:bg-[#F7F6F2]"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#57534E]">
                    0{idx + 1}
                  </span>
                  <span>{link.label}</span>
                </span>
                <span className="font-mono text-xs">→</span>
              </Link>
            );
          })}
        </nav>

        <div
          style={{ backgroundColor: "var(--color-surface-cream, #F7F6F2)" }}
          className="p-6 tr-divider-t space-y-3"
        >
          <p
            style={{ color: "var(--color-ink-mid, #57534E)" }}
            className="text-[11px] font-mono uppercase tracking-wider"
          >
            Atención directa y urgencias 24/7
          </p>

          <Link
            href="/contacto"
            onClick={onClose}
            style={{
              backgroundColor: "var(--color-brand-orange, #E8490F)",
              borderRadius: "var(--tr-btn-radius, 0px)",
            }}
            className="w-full flex items-center justify-center text-white font-semibold uppercase tracking-wider py-3.5 text-xs transition-opacity hover:opacity-90"
          >
            Solicitar presupuesto
          </Link>

          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <a
              href={`tel:${company.phoneClean}`}
              className="flex items-center justify-center bg-white border border-[#D6D3CD] text-[#141413] py-2.5 text-xs font-mono uppercase"
            >
              Llamar
            </a>

            <a
              href={company.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-white border border-[#D6D3CD] text-[#141413] py-2.5 text-xs font-mono uppercase hover:border-[#141413]"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
