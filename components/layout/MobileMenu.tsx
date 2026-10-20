"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, COMPANY } from "@/lib/constants";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden bg-zinc-950 flex flex-col justify-between overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Menú de navegación móvil"
    >
      {/* Header del Menú */}
      <div className="p-6 flex items-center justify-between border-b border-zinc-800">
        <div className="flex flex-col">
          <span className="text-white font-extrabold tracking-tight text-lg leading-none font-heading uppercase">
            TOTAL REPAIR LTDA.
          </span>
          <span className="text-zinc-400 font-mono text-[10px] tracking-[0.2em] uppercase mt-1">
            Navegación del Sistema
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-2 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800"
          aria-label="Cerrar menú"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-6 h-6"
            aria-hidden="true"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Enlaces de Navegación */}
      <nav
        aria-label="Menú móvil"
        className="p-6 flex-1 flex flex-col justify-center gap-2"
      >
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`flex items-center justify-between py-4 px-4 border-b border-zinc-900 text-lg font-bold uppercase tracking-wider transition-colors duration-200 ${
                isActive
                  ? "text-[#FF5000] bg-zinc-900/50 border-l-4 border-l-[#FF5000]"
                  : "text-zinc-200 hover:text-white hover:bg-zinc-900/30"
              }`}
            >
              <span>{link.label}</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`w-5 h-5 ${
                  isActive ? "text-[#FF5000]" : "text-zinc-600"
                }`}
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          );
        })}
      </nav>

      {/* Panel de Contacto Directo Inferior */}
      <div className="p-6 bg-zinc-900 border-t border-zinc-800 space-y-3">
        <p className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
          Canales de Atención Inmediata
        </p>

        <Link
          href="/contacto?urgencia=true"
          onClick={onClose}
          className="w-full flex items-center justify-center gap-2 bg-[#FF5000] hover:bg-[#CC4000] text-white font-bold uppercase tracking-wider py-4 text-sm transition-colors duration-200"
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
          <span>Reportar Siniestro 24/7</span>
        </Link>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <a
            href={`tel:${COMPANY.phoneClean}`}
            className="flex items-center justify-center gap-2 bg-zinc-950 border border-zinc-800 text-zinc-200 py-3 text-xs font-mono uppercase hover:border-zinc-700"
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
            <span>Llamar</span>
          </a>

          <a
            href={COMPANY.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-zinc-950 border border-zinc-800 text-zinc-200 py-3 text-xs font-mono uppercase hover:border-zinc-700"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4 text-emerald-500"
              aria-hidden="true"
            >
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
