import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { EmergencyCTA } from "@/components/ui/EmergencyCTA";
import { COMPANY } from "@/lib/constants";

const services = [
  {
    id: "gasfiteria",
    title: "Gasfitería y Redes",
    desc: "Instalación, mantención y reparación de redes de agua caliente, fría y gas. Detección de fugas y trabajo certificado SEC.",
    image: "/img/fotos/gasfiteria-redes.jpg",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-6 h-6"
      >
        <path d="M12 2a3 3 0 013 3v1h2a1 1 0 011 1v3a1 1 0 01-1 1h-1v7a2 2 0 01-2 2H8a2 2 0 01-2-2V11H5a1 1 0 01-1-1V7a1 1 0 011-1h2V5a3 3 0 013-3h2z" />
      </svg>
    ),
  },
  {
    id: "electricidad",
    title: "Electricidad SEC",
    desc: "Instalaciones eléctricas residenciales certificadas. Tableros eléctricos, empalmes, enchufes, iluminación LED y certificación TE1.",
    image: "/img/fotos/electricidad-sec.jpg",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-6 h-6"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    id: "remodelacion",
    title: "Remodelación Interior",
    desc: "Transformamos cocinas, baños y espacios integrales. Diseño funcional, provisión de materiales y ejecución con garantía escrita.",
    image: "/img/fotos/remodelacion-interior.jpg",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-6 h-6"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    id: "pintura",
    title: "Pintura y Terminaciones",
    desc: "Pintura interior y exterior, empaste, estuco, porcelanatos, pisos flotantes y terminaciones de alto estándar.",
    image: "/img/fotos/split-servicios.jpg",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-6 h-6"
      >
        <path d="M20 19.5v.5a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2h8.5L20 7.5v12zM14 2v6h6" />
      </svg>
    ),
  },
];

const projects = [
  {
    id: "p1",
    title: "Remodelación Integral de Cocina y Comedor",
    location: "Las Condes",
    image: "/img/fotos/remodelacion-interior.jpg",
  },
  {
    id: "p2",
    title: "Renovación de Baño Suite y Red Sanitaria",
    location: "Providencia",
    image: "/img/fotos/gasfiteria-redes.jpg",
  },
  {
    id: "p3",
    title: "Modernización Eléctrica SEC e Iluminación",
    location: "La Florida",
    image: "/img/fotos/electricidad-sec.jpg",
  },
];

const faqs = [
  {
    q: "¿Trabajan con materiales del cliente?",
    a: "Sí. Podemos ejecutar la obra con materiales que tú proveas, o bien nos encargamos de toda la provisión y logística con precios convenidos y transparentes.",
  },
  {
    q: "¿Tienen garantía en los trabajos?",
    a: "Todos nuestros trabajos tienen garantía mínima de 6 meses en mano de obra estipulada por contrato. Las garantías de fabricante sobre materiales son adicionales.",
  },
  {
    q: "¿En cuánto tiempo parten?",
    a: "Una vez aprobado el presupuesto, coordinamos el inicio dentro de los próximos 5 a 10 días hábiles dependiendo de la envergadura de la obra. Para emergencias domiciliarias contamos con atención 24/7.",
  },
  {
    q: "¿Hacen trabajos en departamentos habitados?",
    a: "Sí. Trabajamos tanto en casas como en departamentos habitados y aplicamos protocolos especiales de aislación de polvo, horarios comunitarios y mínima interferencia con vecinos.",
  },
  {
    q: "¿Cómo solicito presupuesto?",
    a: `Puedes usar el formulario de contacto, llamarnos directamente al ${COMPANY.phoneDisplay} o enviarnos un mensaje directo por WhatsApp.`,
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function HogarPage() {
  return (
    <div className="min-h-screen bg-white text-[#0F172A] overflow-x-hidden pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ── HERO RESIDENCIAL — Cohesive Light Corporate Split ────────────── */}
      <section className="relative border-b border-zinc-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-14 sm:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <SectionLabel label="División Hogar / Total Construye" />
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-[#0F172A] leading-[1.08] mb-6 tracking-tight uppercase">
              TU HOGAR,{" "}
              <span className="text-[#FF5000] block sm:inline">RENOVADO.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-zinc-600 mb-8 sm:mb-10 max-w-xl font-light leading-relaxed">
              Gasfitería, electricidad certificada SEC, remodelación de cocinas, baños y reparación de siniestros domiciliarios. Materiales de calidad y garantía escrita en cada trabajo.
            </p>
            <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4">
              <Link
                href="/contacto?modo=hogar"
                className="bg-[#FF5000] text-white px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-[#CC4000] transition-colors duration-200 text-center"
              >
                Solicitar Presupuesto
              </Link>
              <a
                href={COMPANY.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-emerald-600 bg-emerald-50/50 text-emerald-700 px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-colors duration-200 text-center"
              >
                Cotizar por WhatsApp
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-[4/3] w-full overflow-hidden border border-zinc-200 bg-zinc-100 shadow-xs">
            <Image
              src="/img/fotos/hero-hogar.jpg"
              alt="Remodelación de hogar moderno — Total Repair Ltda."
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover origin-top-left scale-[1.08]"
              priority
            />
          </div>
        </div>
      </section>

      {/* ── STATS HOGAR (#F8FAFC) ────────────────────────────────────────── */}
      <div className="border-b border-zinc-200 bg-[#F8FAFC] py-10">
        <div className="max-w-7xl px-4 sm:px-6 md:px-12 mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
          {[
            { value: COMPANY.yearsExperience, label: "Años de Trayectoria" },
            { value: COMPANY.projectsDelivered, label: "Proyectos Ejecutados" },
            { value: "100%", label: "Trabajos con Garantía" },
          ].map((stat) => (
            <div key={stat.label} className="py-2">
              <p className="text-3xl md:text-4xl font-black text-[#FF5000] font-display">
                {stat.value}
              </p>
              <p className="text-xs font-mono text-zinc-600 uppercase tracking-wider mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── SERVICIOS RESIDENCIALES (#FFFFFF) ─────────────────────────────── */}
      <section className="py-20 sm:py-24 max-w-7xl px-4 sm:px-6 md:px-12 mx-auto bg-white">
        <div className="mb-14">
          <SectionLabel label="Nuestros Servicios" />
          <h2 className="font-display text-3xl sm:text-4xl font-black text-[#0F172A] mb-3 tracking-tight uppercase">
            Todo lo que tu hogar necesita
          </h2>
          <p className="text-zinc-600 max-w-xl font-light">
            Un solo equipo técnico para todas las especialidades. Sin improvisaciones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <article
              key={service.id}
              className="group flex flex-col sm:flex-row gap-6 border border-zinc-200 bg-[#F8FAFC] p-6 sm:p-8 hover:border-[#FF5000] transition-colors duration-200"
            >
              <div className="relative w-full sm:w-28 h-44 sm:h-28 shrink-0 overflow-hidden bg-zinc-100 border border-zinc-200">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 112px"
                  className="object-cover origin-top-left scale-[1.08]"
                />
              </div>
              <div>
                <div className="text-[#FF5000] mb-3">{service.icon}</div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-2 group-hover:text-[#FF5000] transition-colors duration-200">
                  {service.title}
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed font-light">
                  {service.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── GALERÍA DE PROYECTOS (#F8FAFC) ────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-[#F8FAFC] border-y border-zinc-200">
        <div className="max-w-7xl px-4 sm:px-6 md:px-12 mx-auto">
          <div className="mb-12">
            <SectionLabel label="Portafolio Residencial" />
            <h2 className="font-display text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight uppercase">
              Proyectos Realizados en Hogares
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project) => (
              <article
                key={project.id}
                className="group border border-zinc-200 bg-white overflow-hidden hover:border-[#FF5000] hover:shadow-md transition-all duration-200"
              >
                <div className="relative h-56 overflow-hidden bg-zinc-100 border-b border-zinc-200">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover origin-top-left scale-[1.08]"
                  />
                </div>
                <div className="p-6">
                  <p className="text-[#FF5000] text-xs font-mono font-bold uppercase tracking-wider mb-1.5">
                    {project.location}
                  </p>
                  <h3 className="text-[#0F172A] font-bold text-lg group-hover:text-[#FF5000] transition-colors duration-200">
                    {project.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ (#FFFFFF) ─────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 md:px-12 bg-white">
        <div className="mb-14 text-center">
          <SectionLabel label="Preguntas Frecuentes" className="justify-center" />
          <h2 className="font-display text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight uppercase">
            Lo que más nos preguntan
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <details
              key={faq.q}
              open={idx === 0}
              className="group border border-zinc-200 bg-[#F8FAFC] open:border-[#FF5000]/50 transition-colors duration-200"
            >
              <summary className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer list-none">
                <span className="font-bold text-[#0F172A] pr-4 text-sm sm:text-base">
                  {faq.q}
                </span>
                <span className="text-zinc-500 group-open:rotate-180 group-open:text-[#FF5000] transition-transform duration-200 shrink-0">
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-5 h-5"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <div className="px-5 sm:px-6 pb-6 text-zinc-600 text-sm sm:text-base font-light leading-relaxed border-t border-zinc-200/60 pt-4 bg-white">
                <p>{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ── EMERGENCIAS HOGAR (#F8FAFC) ────────────────────────────────────── */}
      <EmergencyCTA variant="hogar" />
    </div>
  );
}
