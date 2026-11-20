import Link from "next/link";
import Image from "next/image";
import { COMPANY, NAV_LINKS } from "@/lib/constants";
import { DEFAULT_SITE_CONFIG } from "@/lib/default-site-config";
import type { SiteCompany } from "@/lib/types/cms";

interface FooterProps {
  company?: SiteCompany;
}

export function Footer({
  company = DEFAULT_SITE_CONFIG.company,
}: FooterProps) {
  const currentYear = new Date().getFullYear();
  const nameParts = company.shortName.split(" ");
  const firstWord = nameParts[0] || "TOTAL";
  const restWords = nameParts.slice(1).join(" ") || "REPAIR";

  return (
    <footer
      style={{
        backgroundColor: "var(--color-surface-dark, #141413)",
      }}
      className="text-zinc-400 border-t-4 border-[#FF5000] font-sans tr-blueprint-grid"
    >
      <div className="tr-container px-4 sm:px-6 md:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Columna 1: Identidad Corporativa */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-11 h-11 flex items-center justify-center shrink-0 bg-white/95 p-1 rounded-xs">
                <Image
                  src={company.logoUrl || "/img/logos/logo.png"}
                  alt={`${company.legalName} Logo`}
                  fill
                  sizes="44px"
                  className="object-contain p-0.5"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-extrabold tracking-tight text-xl leading-none font-display uppercase">
                  {firstWord}{" "}
                  <span style={{ color: "var(--color-brand-orange, #FF5000)" }}>
                    {restWords}
                  </span>
                </span>
                <span className="text-zinc-400 font-mono text-[10px] tracking-[0.2em] uppercase mt-1">
                  {company.tagline}
                </span>
              </div>
            </Link>

            <p className="text-sm text-zinc-300 leading-relaxed max-w-sm font-light">
              Empresa constructora y contratista general con más de{" "}
              {company.yearsExperience.replace("+", "")} años de experiencia en
              liquidación y reconstrucción de siniestros, obras civiles B2B y
              remodelaciones residenciales en Chile.
            </p>

            <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/5 border border-white/15 text-xs font-mono text-zinc-200">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ color: "var(--color-brand-orange, #FF5000)" }}
                className="w-4 h-4 shrink-0"
                aria-hidden="true"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              <span>Cumplimiento Normativo SEC / OGUC</span>
            </div>
          </div>

          {/* Columna 2: Navegación Rápida */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white font-bold">
              Ecosistema
            </h3>
            <ul className="space-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-zinc-300 hover:text-[#FF5000] transition-colors duration-200 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contacto"
                  className="text-zinc-300 hover:text-[#FF5000] transition-colors duration-200 inline-block"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Especialidades Técnicas */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white font-bold">
              Líneas de Acción
            </h3>
            <ul className="space-y-2.5 text-sm text-zinc-300">
              <li>
                <Link
                  href="/servicios"
                  className="hover:text-[#FF5000] transition-colors duration-200"
                >
                  Reconstrucción Post-Incendio
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios"
                  className="hover:text-[#FF5000] transition-colors duration-200"
                >
                  Secado Industrial y Daño por Agua
                </Link>
              </li>
              <li>
                <Link
                  href="/empresas"
                  className="hover:text-[#FF5000] transition-colors duration-200"
                >
                  Habilitación de Oficinas y Retail B2B
                </Link>
              </li>
              <li>
                <Link
                  href="/hogar"
                  className="hover:text-[#FF5000] transition-colors duration-200"
                >
                  Remodelación Integral de Viviendas
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios"
                  className="hover:text-[#FF5000] transition-colors duration-200"
                >
                  Instalaciones Eléctricas Certificadas SEC
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Coordenadas Operativas */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white font-bold">
              Central de Operaciones
            </h3>
            <ul className="space-y-3 text-sm text-zinc-300">
              <li className="flex items-start gap-3">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ color: "var(--color-brand-orange, #FF5000)" }}
                  className="w-4 h-4 shrink-0 mt-1"
                  aria-hidden="true"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{company.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ color: "var(--color-brand-orange, #FF5000)" }}
                  className="w-4 h-4 shrink-0"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                <a
                  href={`tel:${company.phoneClean}`}
                  className="hover:text-[#FF5000] transition-colors duration-200 font-mono text-white"
                >
                  {company.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ color: "var(--color-brand-orange, #FF5000)" }}
                  className="w-4 h-4 shrink-0"
                  aria-hidden="true"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
                </svg>
                <a
                  href={`mailto:${company.email}`}
                  className="hover:text-[#FF5000] transition-colors duration-200 font-mono break-all"
                >
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-3 pt-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ color: "var(--color-brand-orange, #FF5000)" }}
                  className="w-4 h-4 shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                <div className="text-xs space-y-1">
                  <p className="text-zinc-200 font-medium">{company.hours}</p>
                  <p
                    style={{ color: "var(--color-brand-orange, #FF5000)" }}
                    className="font-mono font-semibold uppercase"
                  >
                    {company.emergencyHours}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Barra Inferior Legal & Créditos */}
      <div className="border-t border-white/10 bg-black/30">
        <div className="tr-container px-4 sm:px-6 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left">
            <p>
              © {currentYear} {company.legalName} Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/privacidad"
                className="hover:text-white transition-colors duration-200"
              >
                Política de Privacidad
              </Link>
              <span>•</span>
              <Link
                href="/terminos"
                className="hover:text-white transition-colors duration-200"
              >
                Términos de Uso
              </Link>
            </div>
          </div>

          <a
            href={COMPANY.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-zinc-300 hover:text-[#FF5000] transition-colors duration-200 font-mono text-[11px]"
          >
            <span>Desarrollado por {COMPANY.developerName}</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-3 h-3"
              aria-hidden="true"
            >
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
