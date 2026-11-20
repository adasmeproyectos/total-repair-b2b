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
  const firstWord = nameParts[0] || "Total";
  const restWords = nameParts.slice(1).join(" ") || "Repair";

  return (
    <footer
      style={{
        backgroundColor: "var(--color-surface-dark, #141413)",
        borderTopColor: "var(--color-brand-orange, #E8490F)",
      }}
      className="text-zinc-400 border-t-2 font-sans"
    >
      <div className="tr-container px-4 sm:px-6 md:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Columna 1: Identidad Corporativa */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10 flex items-center justify-center shrink-0 bg-white p-1">
                <Image
                  src={company.logoUrl || "/img/logos/logo.png"}
                  alt={`${company.legalName} Logo`}
                  fill
                  sizes="40px"
                  className="object-contain p-0.5"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold tracking-tight text-lg leading-none font-display">
                  {firstWord}{" "}
                  <span style={{ color: "var(--color-brand-orange, #E8490F)" }}>
                    {restWords}
                  </span>
                </span>
                <span className="text-zinc-400 font-mono text-[10px] tracking-[0.14em] uppercase mt-1">
                  {company.tagline}
                </span>
              </div>
            </Link>

            <p className="text-sm text-zinc-300 leading-relaxed max-w-sm">
              Constructora y contratista general con más de{" "}
              {company.yearsExperience.replace("+", "")} años de trayectoria en
              rehabilitación de siniestros, obras civiles corporativas y
              remodelación residencial en Chile.
            </p>

            <p className="text-xs font-mono text-zinc-400 border-l-2 border-[#E8490F] pl-3">
              Cumplimiento normativo SEC · OGUC · ACHS
            </p>
          </div>

          {/* Columna 2: Sitio */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-[0.16em] text-zinc-400">
              Navegación
            </h3>
            <ul className="space-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-zinc-200 hover:text-white transition-colors duration-150 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contacto"
                  className="text-zinc-200 hover:text-white transition-colors duration-150 inline-block"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Especialidades */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-[0.16em] text-zinc-400">
              Áreas de ejecución
            </h3>
            <ul className="space-y-2.5 text-sm text-zinc-200">
              <li>
                <Link
                  href="/servicios"
                  className="hover:text-white transition-colors duration-150"
                >
                  Reconstrucción post-incendio
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios"
                  className="hover:text-white transition-colors duration-150"
                >
                  Secado industrial y daño por agua
                </Link>
              </li>
              <li>
                <Link
                  href="/empresas"
                  className="hover:text-white transition-colors duration-150"
                >
                  Habilitación comercial y oficinas B2B
                </Link>
              </li>
              <li>
                <Link
                  href="/hogar"
                  className="hover:text-white transition-colors duration-150"
                >
                  Remodelación residencial
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios"
                  className="hover:text-white transition-colors duration-150"
                >
                  Electricidad y redes certificadas SEC
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Coordenadas */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-[0.16em] text-zinc-400">
              Contacto directo
            </h3>
            <dl className="space-y-3 text-sm text-zinc-200">
              <div>
                <dt className="text-[11px] font-mono text-zinc-400 uppercase">
                  Dirección
                </dt>
                <dd>{company.address}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-mono text-zinc-400 uppercase">
                  Teléfono / Emergencias 24/7
                </dt>
                <dd>
                  <a
                    href={`tel:${company.phoneClean}`}
                    className="hover:text-white transition-colors font-mono tabular-nums"
                  >
                    {company.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-mono text-zinc-400 uppercase">
                  Correo
                </dt>
                <dd>
                  <a
                    href={`mailto:${company.email}`}
                    className="hover:text-white transition-colors font-mono break-all"
                  >
                    {company.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-mono text-zinc-400 uppercase">
                  Horario oficina
                </dt>
                <dd className="text-xs text-zinc-300">{company.hours}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Barra Inferior Legal & Créditos */}
      <div className="border-t border-white/10">
        <div className="tr-container px-4 sm:px-6 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left">
            <p>
              © {currentYear} {company.legalName} Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/privacidad"
                className="hover:text-white transition-colors duration-150"
              >
                Política de Privacidad
              </Link>
              <span>·</span>
              <Link
                href="/terminos"
                className="hover:text-white transition-colors duration-150"
              >
                Términos de Uso
              </Link>
            </div>
          </div>

          <a
            href={COMPANY.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-zinc-300 hover:text-white transition-colors duration-150 font-mono text-[11px]"
          >
            <span>Desarrollado por {COMPANY.developerName}</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
