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
    <div className="min-h-screen bg-white text-zinc-900 overflow-x-hidden pt-20">
      {/* ── HERO — Oscuro intencional con imagen real ─────────────────────── */}
      <section className="relative h-[85vh] min-h-[580px] flex items-center bg-zinc-950">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/img/fotos/hero-corporativo.jpg"
            alt="Oficina Corporativa en Construcción — Total Repair Ltda."
            fill
            sizes="100vw"
            className="object-cover opacity-50 origin-top-left scale-[1.08]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl px-6 md:px-12 mx-auto w-full">
          <div className="max-w-3xl">
            <SectionLabel label="División Empresas e Instituciones" dark />
            <h1 className="font-display text-5xl md:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tight">
              CONSTRUIMOS TUS <br /> PROYECTOS. <br />
              <span className="text-[#FF5000]">SIN DEMORAS.</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-200 mb-10 max-w-xl font-light leading-relaxed">
              Tu espacio listo para funcionar. Especialistas en remodelación, obras civiles y habilitación de locales comerciales con más de 22 años de experiencia.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contacto"
                className="bg-[#FF5000] text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#CC4000] transition-colors duration-200"
              >
                Agendar Reunión
              </Link>
              <Link
                href="/servicios"
                className="border border-zinc-400 text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:border-[#FF5000] hover:text-[#FF5000] transition-colors duration-200"
              >
                Ver Servicios
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CARRUSEL CLIENTES ────────────────────────────────────────────────── */}
      <LogoCarousel />

      {/* ── BENTO GRID SERVICIOS ─────────────────────────────────────────────── */}
      <section className="py-28 max-w-7xl px-6 md:px-12 mx-auto">
        <div className="mb-16">
          <SectionLabel label="Especialidades de Ejecución" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0F172A] mb-4 tracking-tight">
            Soluciones Corporativas Integrales
          </h2>
          <p className="text-zinc-600 max-w-2xl">
            Coordinamos todos los gremios bajo una supervisión logística y administrativa unificada para garantizar continuidad operacional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 md:h-[600px]">
          {/* Featured: Centros Comerciales */}
          <div className="md:col-span-2 md:row-span-2 relative border border-zinc-200 bg-zinc-950 overflow-hidden group p-10 flex flex-col justify-end hover:border-[#FF5000] transition-colors duration-200">
            <Image
              src="/img/fotos/arquitectura-B2B.jpg"
              alt="Habilitación de Centros Comerciales y Oficinas Corporativas"
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover opacity-35 group-hover:opacity-45 origin-top-left scale-[1.08] transition-opacity duration-200"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
            <div className="relative z-10">
              <span className="text-[#FF5000] text-xs font-mono font-bold uppercase tracking-widest mb-4 block">
                Especialidad Principal
              </span>
              <h3 className="font-display text-3xl font-bold text-white mb-4">
                Centros Comerciales y Habilitación
              </h3>
              <p className="text-zinc-200 max-w-md font-light leading-relaxed">
                Desde la planificación técnica hasta la entrega final. Remodelamos locales comerciales, oficinas y centros médicos garantizando que tus operaciones no se detengan.
              </p>
            </div>
          </div>

          {/* Mantenimiento */}
          <div className="border border-zinc-200 bg-[#F8FAFC] p-8 flex flex-col justify-between hover:border-[#FF5000] transition-colors duration-200">
            <div className="w-12 h-12 bg-white border border-zinc-200 flex items-center justify-center text-[#FF5000]">
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
              <p className="text-sm text-zinc-600 leading-relaxed">
                Reparación de techumbres, pisos industriales, redes eléctricas SEC y muros en zonas de alta circulación.
              </p>
            </div>
          </div>

          {/* Emergencias */}
          <div className="relative border border-zinc-800 bg-zinc-950 p-8 flex flex-col justify-between overflow-hidden hover:border-[#FF5000] transition-colors duration-200">
            <div className="relative z-10">
              <span className="inline-block bg-[#FF5000]/20 text-[#FF5000] border border-[#FF5000]/40 px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest mb-6">
                Atención 24/7
              </span>
              <h3 className="font-display text-xl font-bold text-white mb-2">
                Liquidación y Siniestros
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Inundaciones, daños por fuego o sismos. Presupuestos técnicos e informes directos para compañías de seguros.
              </p>
            </div>
            <Link
              href="/contacto?urgencia=true"
              className="relative z-10 mt-8 text-[#FF5000] text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors duration-200"
            >
              Línea Directa <span className="text-lg">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── GESTIÓN DE SINIESTROS ─────────────────────────────────────────────── */}
      <section className="py-24 bg-[#F8FAFC] border-y border-zinc-200">
        <div className="max-w-7xl px-6 md:px-12 mx-auto">
          <div className="mb-12">
            <SectionLabel label="Unidad de Reacción Inmediata (URI)" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0F172A] tracking-tight">
              Gestión de Siniestros Corporativos
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <div className="relative h-52 overflow-hidden bg-zinc-900">
                  <Image
                    src={claim.image}
                    alt={claim.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover origin-top-left scale-[1.08]"
                  />
                </div>
                <div className="p-8">
                  <span className="text-[#FF5000] text-xs font-mono font-bold mb-2 block">
                    PROTOCOLO {claim.id}
                  </span>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-3">
                    {claim.title}
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">
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
