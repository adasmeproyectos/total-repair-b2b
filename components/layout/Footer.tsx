/**
 * components/layout/Footer.tsx — Paleta v2 (Antracita / Naranjo)
 * El footer mantiene fondo oscuro (#1A1A1A) para contraste con el cuerpo blanco —
 * esto es estándar en la industria construcción premium (ej. Bechtel, Turner, Sodimac Pro).
 */

import Link from "next/link";
import { COMPANY, NAV_LINKS } from "@/lib/constants";

interface FooterProps {
  variant?: "full" | "minimal";
}

export function Footer({ variant = "full" }: FooterProps) {
  return (
    <footer className="bg-zinc-900 text-zinc-400 border-t border-zinc-800">
      {variant === "full" && (
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Col 1-5: Marca */}
          <div className="md:col-span-5">
            <Link
              href="/"
              className="font-display font-bold text-xl tracking-tight text-white inline-block mb-6 hover:opacity-90 transition-opacity"
            >
              TOTAL<span className="text-[#E85B0C]">REPAIR</span>
            </Link>
            <p className="text-sm leading-relaxed font-light max-w-xs mb-6">
              Soluciones constructivas integrales para empresas y hogares.
              Supervisión total del proyecto con 20 años de experiencia en Chile.
            </p>
            <div className="flex gap-3">
              <a
                href={COMPANY.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn de Javier Adasme"
                className="w-9 h-9 border border-zinc-700 flex items-center justify-center text-zinc-500 hover:text-white hover:border-[#E85B0C] transition-all"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href={COMPANY.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 border border-zinc-700 flex items-center justify-center text-zinc-500 hover:text-green-400 hover:border-green-600/50 transition-all"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 6-8: Navegación */}
          <div className="md:col-span-3">
            <h4 className="text-white font-bold uppercase tracking-wider mb-6 text-xs">
              Navegación
            </h4>
            <ul className="space-y-3 text-sm font-light">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white hover:pl-1 transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contacto" className="hover:text-white hover:pl-1 transition-all duration-200">
                  Cotizar Proyecto
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 9-12: Contacto */}
          <div className="md:col-span-4">
            <h4 className="text-white font-bold uppercase tracking-wider mb-6 text-xs">
              Contacto Directo
            </h4>
            <ul className="space-y-4 text-sm font-light">
              <li className="flex items-start gap-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="#E85B0C" strokeWidth="2" className="w-4 h-4 mt-0.5 shrink-0">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span>{COMPANY.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="#E85B0C" strokeWidth="2" className="w-4 h-4 shrink-0">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <a href={`tel:${COMPANY.phone}`} className="hover:text-white transition-colors">
                  {COMPANY.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="#E85B0C" strokeWidth="2" className="w-4 h-4 shrink-0">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <a href={`mailto:${COMPANY.email}`} className="hover:text-white transition-colors">
                  {COMPANY.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* ─── Franja inferior — OBLIGATORIA por Manifiesto §6.1 */}
      <div className="border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light">
          <p>© {new Date().getFullYear()} {COMPANY.name}. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacidad" className="hover:text-white transition-colors">Privacidad</Link>
            <Link href="/terminos" className="hover:text-white transition-colors">Términos</Link>
            <span className="text-zinc-700">·</span>
            <span>
              Dev{" "}
              <a
                href={COMPANY.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E85B0C] hover:text-orange-400 font-medium transition-colors"
              >
                {COMPANY.author}
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
