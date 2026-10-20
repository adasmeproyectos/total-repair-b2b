/**
 * lib/constants.ts
 * Fuente única de verdad para todos los datos del ecosistema Total Repair.
 * Modificar aquí actualiza automáticamente todo el sitio.
 */

export const COMPANY = {
  name: "Total Repair Ltda.",
  legalName: "Total Repair Ltda.",
  shortName: "Total Repair",
  founder: "Patricia Cecilia Gallardo",
  founded: "2004",
  foundingDate: "2004-08-04",
  yearsExperience: "22+",
  projectsDelivered: "500+",
  phone: "+56999195521",
  phoneClean: "+56999195521",
  phoneDisplay: "(+56) 9 9919 5521",
  email: "contacto@totalrepair.cl",
  address: "Villasana 1398, Quinta Normal, Santiago",
  addressShort: "Quinta Normal, Santiago",
  hours: "Lunes a Viernes: 08:30 – 18:30 hrs",
  emergencyHours: "Emergencias y Siniestros: 24/7",
  whatsappUrl: "https://wa.me/56999195521",
  whatsappMessage: encodeURIComponent(
    "Hola, me contacto desde totalrepair.cl. Quisiera obtener más información."
  ),
  linkedin: "https://www.linkedin.com/in/javieradasme/",
  author: "Javier Adasme",
  developerName: "Javier Adasme",
} as const;

export const LOGOS = [
  { src: "/img/logos/claro.png", alt: "Claro Chile", height: "h-10" },
  { src: "/img/logos/wom.png", alt: "WOM", height: "h-10" },
  { src: "/img/logos/enjoy.png", alt: "Enjoy", height: "h-10" },
  { src: "/img/logos/usm.png", alt: "Universidad Técnica Federico Santa María (UTFSM)", height: "h-12" },
  { src: "/img/logos/duoc.png", alt: "Duoc UC", height: "h-10" },
] as const;

export const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/empresas", label: "Empresas" },
  { href: "/hogar", label: "Hogar" },
  { href: "/servicios", label: "Servicios" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/nosotros", label: "Nosotros" },
] as const;

export const SOCIAL_LINKS = {
  linkedin: COMPANY.linkedin,
  whatsapp: COMPANY.whatsappUrl,
} as const;
