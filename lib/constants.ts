/**
 * lib/constants.ts
 * Fuente única de verdad para todos los datos del ecosistema Total Repair.
 * Modificar aquí actualiza automáticamente todo el sitio.
 */

export const COMPANY = {
  name: "Total Repair Ltda.",
  shortName: "Total Repair",
  phone: "+56999195521",
  phoneDisplay: "(+56) 9 9919 5521",
  email: "contacto@totalrepair.cl",
  address: "Villasana 1398, Quinta Normal, Santiago",
  addressShort: "Quinta Normal, Santiago",
  whatsappUrl: "https://wa.me/56999195521",
  whatsappMessage: encodeURIComponent(
    "Hola, me contacto desde totalrepair.cl. Quisiera obtener más información."
  ),
  linkedin: "https://www.linkedin.com/in/javieradasme/",
  author: "Javier Adasme",
  founded: "2006",
  yearsExperience: "20+",
  projectsDelivered: "500+",
} as const;

export const LOGOS = [
  { src: "/img/logos/claro.png",  alt: "Claro",    height: "h-10" },
  { src: "/img/logos/wom.png",    alt: "WOM",      height: "h-10" },
  { src: "/img/logos/enjoy.png",  alt: "Enjoy",    height: "h-10" },
  { src: "/img/logos/usm.png",    alt: "UTFSM",    height: "h-12" },
  { src: "/img/logos/duoc.png",   alt: "Duoc UC",  height: "h-10" },
] as const;

export const NAV_LINKS = [
  { href: "/",           label: "Inicio"        },
  { href: "/empresas",   label: "Empresas"      },
  { href: "/hogar",      label: "Hogar"         },
  { href: "/nosotros",   label: "Nosotros"      },
  { href: "/servicios",  label: "Servicios"     },
] as const;

export const SOCIAL_LINKS = {
  linkedin: COMPANY.linkedin,
  whatsapp: COMPANY.whatsappUrl,
} as const;
