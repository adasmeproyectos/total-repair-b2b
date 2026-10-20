import Image from "next/image";
import Link from "next/link";
import { LogoCarousel } from "@/components/shared/LogoCarousel";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { EmergencyCTA } from "@/components/ui/EmergencyCTA";
import { generateMetadata as buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "División Empresas e Instituciones B2B",
  description:
    "Habilitación comercial, remodelaciones corporativas y gestión de siniestros 24/7 para empresas, centros comerciales, clínicas y aseguradoras. Más de 22 años de experiencia en Chile.",
  path: "/empresas",
});

export default function EmpresasPage() {
  return (
    <div className="min-h-screen bg-white text-[#0F172A] overflow-x-hidden pt-20">
      {/* ── HERO — Cohesive Light Corporate Split ─────────────────────── */}
      <section className="relative border-b border-zinc-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-14 sm:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <SectionLabel label="División Empresas e Instituciones" />
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-[#0F172A] leading-[1.08] mb-6 tracking-tight uppercase">
              CONSTRUIMOS TUS <br className="hidden sm:inline" /> PROYECTOS.{" "}
              <span className="text-[#FF5000] block sm:inline">SIN DEMORAS.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-zinc-600 mb-8 sm:mb-10 max-w-xl font-light leading-relaxed">
              Tu espacio listo para funcionar. Especialistas en remodelación, obras civiles y habilitación de locales comerciales con más de 22 años de experiencia en Chile.
            </p>
            <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4">
              <Link
                href="/contacto"
                className="bg-[#FF5000] text-white px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-[#CC4000] transition-colors duration-200 text-center"
              >
                Agendar Reunión
              </Link>
              <Link
                href="/servicios"
                className="border border-zinc-300 bg-[#F8FAFC] text-[#0F172A] px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-widest hover:border-[#FF5000] hover:text-[#FF5000] transition-colors duration-200 text-center"
              >
                Ver Servicios
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-[4/3] w-full overflow-hidden border border-zinc-200 bg-zinc-100 shadow-xs">
            <Image
              src="/img/fotos/hero-corporativo.jpg"
              alt="Oficina Corporativa en Construcción — Total Repair Ltda."
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover origin-top-left scale-[1.08]"
              priority
            />
          </div>
        </div>
      </section>

      {/* ── CARRUSEL CLIENTES (#F8FAFC) ──────────────────────────────────────── */}
      <LogoCarousel />

      {/* ── BENTO GRID SERVICIOS (#FFFFFF) ───────────────────────────────────── */}
      <section className="py-20 sm:py-24 max-w-7xl px-4 sm:px-6 md:px-12 mx-auto bg-white">
        <div className="mb-14">
          <SectionLabel label="Especialidades de Ejecución" />
          <h2 className="font-display text-3xl sm:text-4xl font-black text-[#0F172A] mb-3 tracking-tight uppercase">
            Soluciones Corporativas Integrales
          </h2>
          <p className="text-zinc-600 max-w-2xl font-light">
            Coordinamos todos los gremios bajo una supervisión logística y administrativa unificada para garantizar continuidad operacional.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured: Centros Comerciales (Light Mode Card) */}
          <article className="lg:col-span-2 border border-zinc-200 bg-[#F8FAFC] overflow-hidden flex flex-col justify-between hover:border-[#FF5000] transition-colors duration-200">
            <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-zinc-100 border-b border-zinc-200">
              <Image
                src="/img/fotos/arquitectura-B2B.jpg"
                alt="Habilitación de Centros Comerciales y Oficinas Corporativas"
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover origin-top-left scale-[1.08]"
              />
            </div>
            <div className="p-6 sm:p-10">
              <span className="text-[#FF5000] text-xs font-mono font-bold uppercase tracking-widest mb-3 block">
                Especialidad Principal
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A] mb-3">
                Centros Comerciales y Habilitación B2B
              </h3>
              <p className="text-zinc-600 max-w-2xl font-light leading-relaxed text-sm sm:text-base">
                Desde la planificación técnica hasta la entrega final. Remodelamos locales comerciales, oficinas corporativas, instituciones educativas y centros médicos garantizando que tus operaciones no se detengan.
              </p>
            </div>
          </article>

          {/* Right Column: Mantenimiento + Emergencias */}
          <div className="flex flex-col gap-6">
            {/* Mantenimiento */}
            <article className="flex-1 border border-zinc-200 bg-[#F8FAFC] p-6 sm:p-8 flex flex-col justify-between hover:border-[#FF5000] transition-colors duration-200">
              <div className="w-12 h-12 bg-white border border-zinc-200 flex items-center justify-center text-[#FF5000] mb-6">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-[#0F172A] mb-2">
                  Mantenimiento Corporativo
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed font-light">
                  Reparación de techumbres, pisos industriales, redes eléctricas SEC y muros en zonas de alta circulación.
                </p>
              </div>
            </article>

            {/* Emergencias (Light Mode High-Priority Card) */}
            <article className="flex-1 border border-zinc-200 border-l-4 border-l-[#FF5000] bg-white p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-[#FF5000] transition-colors duration-200">
              <div>
                <span className="inline-block bg-[#FF5000]/10 text-[#FF5000] border border-[#FF5000]/30 px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest mb-5">
                  Atención 24/7
                </span>
                <h3 className="font-display text-xl font-bold text-[#0F172A] mb-2">
                  Liquidación y Siniestros
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed font-light">
                  Inundaciones, daños por fuego o sismos. Presupuestos técnicos e informes directos para compañías de seguros.
                </p>
              </div>
              <Link
                href="/contacto?urgencia=true"
                className="mt-6 text-[#FF5000] text-xs sm:text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:text-[#CC4000] transition-colors duration-200"
              >
                Línea Directa <span className="text-lg">→</span>
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* ── GESTIÓN DE SINIESTROS (#F8FAFC) ──────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-[#F8FAFC] border-t border-zinc-200">
        <div className="max-w-7xl px-4 sm:px-6 md:px-12 mx-auto">
          <div className="mb-12">
            <SectionLabel label="Unidad de Reacción Inmediata (URI)" />
            <h2 className="font-display text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight uppercase">
              Gestión de Siniestros Corporativos
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                id: "01",
                title: "Inundación y Daño por Agua",
                desc: "Extracción industrial, secado técnico y reparación ultra-rápida de locales operativos tras roturas de matrices o temporales.",
                image: "/img/fotos/dano-agua.jpg",
              },
              {
                id: "02",
                title: "Siniestros por Incendio",
                desc: "Retiro de escombros, descontaminación de hollín y reconstrucción estructural certificada pos-fuego.",
                image: "/img/fotos/dano-incendio.jpg",
              },
              {
                id: "03",
                title: "Impacto y Daño Estructural",
                desc: "Evaluación SEC inmediata y reparación de muros, fachadas, pilares y techumbres por sismos o colisiones.",
                image: "/img/fotos/otros-siniestros.jpg",
              },
            ].map((claim) => (
              <article
                key={claim.id}
                className="group border border-zinc-200 bg-white overflow-hidden hover:border-[#FF5000] hover:shadow-md transition-all duration-200"
              >
                <div className="relative h-52 overflow-hidden bg-zinc-100 border-b border-zinc-200">
                  <Image
                    src={claim.image}
                    alt={claim.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover origin-top-left scale-[1.08]"
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <span className="text-[#FF5000] text-xs font-mono font-bold mb-2 block">
                    PROTOCOLO {claim.id}
                  </span>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-3">
                    {claim.title}
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed font-light">
                    {claim.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA EMERGENCIAS ──────────────────────────────────────────────────── */}
      <EmergencyCTA variant="empresas" />
    </div>
  );
}
