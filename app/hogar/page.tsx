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
    <div className="min-h-screen bg-white text-zinc-900 overflow-x-hidden pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ── HERO RESIDENCIAL ──────────────────────────────────────────────── */}
      <section className="relative h-[85vh] min-h-[580px] flex items-center bg-zinc-950">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/img/fotos/hero-hogar.jpg"
            alt="Remodelación de hogar moderno — Total Repair Ltda."
            fill
            sizes="100vw"
            className="object-cover opacity-55 origin-top-left scale-[1.08]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/75 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl px-6 md:px-12 mx-auto w-full">
          <div className="max-w-2xl">
            <SectionLabel label="División Hogar / Total Construye" dark />
            <h1 className="font-display text-5xl md:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tight">
              TU HOGAR,
              <br />
              <span className="text-[#FF5000]">RENOVADO.</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-200 mb-10 max-w-xl font-light leading-relaxed">
              Gasfitería, electricidad certificada SEC, remodelación de cocinas, baños y siniestros domiciliarios. Materiales de calidad y garantía real en cada trabajo.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contacto?modo=hogar"
                className="bg-[#FF5000] text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#CC4000] transition-colors duration-200"
              >
                Solicitar Presupuesto
              </Link>
              <a
                href={COMPANY.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-emerald-500 text-emerald-400 px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-colors duration-200"
              >
                Cotizar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS HOGAR ──────────────────────────────────────────────────── */}
      <div className="border-y border-zinc-200 bg-[#F8FAFC] py-10">
        <div className="max-w-7xl px-6 md:px-12 mx-auto grid grid-cols-3 gap-8 text-center">
          {[
            { value: COMPANY.yearsExperience, label: "Años de Trayectoria" },
            { value: COMPANY.projectsDelivered, label: "Proyectos Ejecutados" },
            { value: "100%", label: "Trabajos con Garantía" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl md:text-4xl font-black text-[#FF5000]">
                {stat.value}
              </p>
              <p className="text-xs font-mono text-zinc-600 uppercase tracking-wider mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── SERVICIOS RESIDENCIALES ───────────────────────────────────────── */}
      <section className="py-28 max-w-7xl px-6 md:px-12 mx-auto">
        <div className="mb-16">
          <SectionLabel label="Nuestros Servicios" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0F172A] mb-4 tracking-tight">
            Todo lo que tu hogar necesita
          </h2>
          <p className="text-zinc-600 max-w-xl">
            Un solo equipo técnico para todas las especialidades. Sin improvisaciones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <article
              key={service.id}
              className="group flex flex-col sm:flex-row gap-6 border border-zinc-200 bg-[#F8FAFC] p-8 hover:border-[#FF5000] transition-colors duration-200"
            >
              {/* Imagen miniatura */}
              <div className="relative w-full sm:w-28 h-40 sm:h-28 shrink-0 overflow-hidden bg-zinc-900">
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
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── GALERÍA DE PROYECTOS ──────────────────────────────────────────── */}
      <section className="py-24 bg-[#F8FAFC] border-y border-zinc-200">
        <div className="max-w-7xl px-6 md:px-12 mx-auto">
          <div className="mb-12">
            <SectionLabel label="Portafolio Residencial" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0F172A] tracking-tight">
              Proyectos Realizados en Hogares
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project) => (
              <article
                key={project.id}
                className="group relative h-72 overflow-hidden border border-zinc-200 bg-zinc-900"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover origin-top-left scale-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-[#FF5000] text-xs font-mono font-bold uppercase tracking-wider mb-1">
                    {project.location}
                  </p>
                  <h3 className="text-white font-bold text-lg">
                    {project.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ (SSR Native Details/Summary) ──────────────────────────────── */}
      <section className="py-28 max-w-4xl mx-auto px-6 md:px-12">
        <div className="mb-16 text-center">
          <SectionLabel label="Preguntas Frecuentes" className="justify-center" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0F172A] tracking-tight">
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
              <summary className="w-full flex items-center justify-between p-6 text-left cursor-pointer list-none">
                <span className="font-bold text-[#0F172A] pr-4">{faq.q}</span>
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
              <div className="px-6 pb-6 text-zinc-600 leading-relaxed border-t border-zinc-200/60 pt-4">
                <p>{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ── EMERGENCIAS HOGAR ──────────────────────────────────────────────── */}
      <EmergencyCTA variant="hogar" />
    </div>
  );
}
