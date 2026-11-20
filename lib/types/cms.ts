/**
 * lib/types/cms.ts
 * Tipos TypeScript completos del sistema autoadministrable de Total Repair.
 */

export type DisplayFontKey =
  | "outfit"
  | "barlow"
  | "montserrat"
  | "playfair"
  | "inter";

export type BodyFontKey =
  | "plus_jakarta"
  | "inter"
  | "dm_sans"
  | "roboto"
  | "lato";

export type CardShadowKey = "none" | "sm" | "md" | "lg";

export type HomeSectionKey =
  | "hero"
  | "logos"
  | "timeline"
  | "spotlight"
  | "cta"
  | "emergency";

export interface SiteTheme {
  displayFont: DisplayFontKey;
  bodyFont: BodyFontKey;
  textScale: number;
  headingScale: number;
  lineHeight: number;

  brandOrange: string;
  brandOrangeDark: string;
  heroDarkBg: string;
  inkAnthracite: string;
  inkMid: string;
  surfaceWhite: string;
  surfaceCream: string;
  dividerColor: string;

  sectionPy: number;
  gridGap: number;
  containerMax: number;
  borderWidth: number;
  dividerWidth: number;
  cardRadius: number;
  cardShadow: CardShadowKey;
  cardPadding: number;
  btnRadius: number;
}

export interface SiteCompany {
  name: string;
  legalName: string;
  shortName: string;
  tagline: string;
  founder: string;
  founded: string;
  yearsExperience: string;
  projectsDelivered: string;
  phone: string;
  phoneClean: string;
  phoneDisplay: string;
  email: string;
  notificationEmail: string;
  notificationCcEmail: string;
  autoReplyEnabled: boolean;
  autoReplySubject: string;
  autoReplyGreeting: string;
  address: string;
  addressShort: string;
  hours: string;
  emergencyHours: string;
  whatsappUrl: string;
  whatsappMessage: string;
  linkedin: string;
  logoUrl: string;
  bannerUrl: string;
}

export interface LogoItem {
  id: string;
  src: string;
  alt: string;
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  description: string;
  isHighlight?: boolean;
}

export interface SpotlightItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badges: string[];
  align: "left" | "right";
}

export interface UriProtocolItem {
  id: string;
  code: string;
  title: string;
  description: string;
  image: string;
}

export interface HogarServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: "plumbing" | "electric" | "remodel" | "paint";
}

export interface FaqItem {
  id: string;
  q: string;
  a: string;
}

export interface ServiceSpecialityItem {
  id: string;
  name: string;
  description: string;
  icon: "carpentery" | "paint" | "sec" | "data";
}

export interface ServiceClaimItem {
  id: string;
  code: string;
  title: string;
  description: string;
}

export interface GuaranteeItem {
  id: string;
  title: string;
  description: string;
  icon: "shield" | "user" | "clipboard";
}

export interface SiteContent {
  home: {
    badge: string;
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
    descriptionPrefix: string;
    descriptionBold: string;
    ctaPrimaryLabel: string;
    ctaEmpresasLabel: string;
    ctaHogarLabel: string;
    finalCtaEyebrow: string;
    finalCtaTitle: string;
    finalCtaHighlight: string;
    finalCtaDescription: string;
    finalCtaButtonLabel: string;
    sectionsOrder: HomeSectionKey[];
    sectionsVisible: Record<HomeSectionKey, boolean>;
  };
  logosTitle: string;
  logos: LogoItem[];
  timeline: {
    eyebrow: string;
    titlePrefix: string;
    titleHighlight: string;
    titleSuffix: string;
    description: string;
    items: TimelineItem[];
  };
  spotlight: {
    eyebrow: string;
    titlePrefix: string;
    titleHighlight: string;
    description: string;
    items: SpotlightItem[];
  };
  emergency: {
    badge: string;
    empresasTitle: string;
    empresasDescription: string;
    hogarTitle: string;
    hogarDescription: string;
    callLabelPrefix: string;
    reportLabel: string;
  };
  empresas: {
    eyebrow: string;
    titleLine1: string;
    titleHighlight: string;
    description: string;
    heroImage: string;
    ctaPrimary: string;
    ctaSecondary: string;
    bentoEyebrow: string;
    bentoTitle: string;
    bentoDescription: string;
    featuredLabel: string;
    featuredTitle: string;
    featuredDescription: string;
    featuredImage: string;
    maintTitle: string;
    maintDescription: string;
    claimsBadge: string;
    claimsTitle: string;
    claimsDescription: string;
    claimsCta: string;
    uriEyebrow: string;
    uriTitle: string;
    uriItems: UriProtocolItem[];
  };
  hogar: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    description: string;
    heroImage: string;
    ctaPrimary: string;
    ctaWhatsapp: string;
    stats: Array<{ value: string; label: string }>;
    servicesEyebrow: string;
    servicesTitle: string;
    servicesDescription: string;
    services: HogarServiceItem[];
    portfolioEyebrow: string;
    portfolioTitle: string;
    faqsEyebrow: string;
    faqsTitle: string;
    faqs: FaqItem[];
  };
  servicios: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    description: string;
    heroImage: string;
    specEyebrow: string;
    specTitle: string;
    specDescription: string;
    specialities: ServiceSpecialityItem[];
    claimsBadge: string;
    claimsTitle: string;
    claims: ServiceClaimItem[];
  };
  nosotros: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    description: string;
    coreImage: string;
    coreQuote: string;
    coreDescription: string;
    guaranteesEyebrow: string;
    guaranteesTitle: string;
    guaranteesDescription: string;
    guarantees: GuaranteeItem[];
  };
  proyectos: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    description: string;
    ctaEyebrow: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  contacto: {
    eyebrow: string;
    titlePrefix: string;
    titleHighlight: string;
    description: string;
    submitLabel: string;
    privacyNote: string;
  };
}

export interface SiteConfig {
  id: string;
  theme: SiteTheme;
  company: SiteCompany;
  content: SiteContent;
  updated_at?: string;
  updated_by?: string | null;
}

export interface SiteRevision {
  id: string;
  label: string;
  theme: SiteTheme;
  company: SiteCompany;
  content: SiteContent;
  created_by: string | null;
  created_at: string;
}

export type ProjectDivision = "empresas" | "hogar" | "siniestros";

export type ProjectPhotoType = "gallery" | "before" | "after";

export interface ProjectImageRecord {
  id: string;
  project_id: string;
  image_url: string;
  storage_path: string | null;
  caption: string;
  photo_type: ProjectPhotoType;
  sort_order: number;
  created_at?: string;
}

export interface ProjectRecord {
  id: string;
  slug: string;
  title: string;
  category: string;
  division: ProjectDivision;
  location: string;
  year: string;
  description: string;
  tags: string[];
  cover_image_url: string;
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
  images?: ProjectImageRecord[];
}

export type LeadStatus =
  | "nuevo"
  | "contactado"
  | "cotizado"
  | "cerrado"
  | "archivado";

export interface ContactLeadRecord {
  id: string;
  folio: string;
  nombre: string;
  empresa: string;
  telefono: string;
  correo: string;
  tipo_requerimiento: string;
  especificaciones: string;
  is_urgent: boolean;
  status: LeadStatus;
  admin_notes: string;
  email_status: string;
  email_error: string | null;
  telegram_sent: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminUserRecord {
  id: string;
  email: string;
  display_name: string;
  role: "owner" | "admin";
  is_active: boolean;
  created_at: string;
}
