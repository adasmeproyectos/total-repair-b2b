import type {
  ProjectRecord,
  SiteConfig,
  SiteTheme,
} from "./types/cms";

export const DEFAULT_THEME: SiteTheme = {
  displayFont: "archivo",
  bodyFont: "ibm_plex",
  textScale: 1,
  headingScale: 1,
  lineHeight: 1.65,

  brandOrange: "#E8490F",
  brandOrangeDark: "#C23908",
  heroDarkBg: "#141413",
  inkAnthracite: "#141413",
  inkMid: "#57534E",
  surfaceWhite: "#FFFFFF",
  surfaceCream: "#F7F6F2",
  dividerColor: "#D6D3CD",

  sectionPy: 88,
  gridGap: 24,
  containerMax: 1280,
  borderWidth: 1,
  dividerWidth: 1,
  cardRadius: 0,
  cardShadow: "none",
  cardPadding: 28,
  btnRadius: 0,
};

export const DESIGN_PRESETS: Array<{
  id: string;
  name: string;
  description: string;
  theme: SiteTheme;
}> = [
  {
    id: "editorial",
    name: "Editorial Arquitectónico (Recomendado)",
    description:
      "Grilla suiza limpia en piedra #F7F6F2, tinta carbón #141413, filetes finos y cero sombras decorativas.",
    theme: DEFAULT_THEME,
  },
  {
    id: "classic",
    name: "Ingeniería Clásica Estructural",
    description:
      "Tipografía Barlow Condensed con mayor aire y líneas divisorias marcadas.",
    theme: {
      ...DEFAULT_THEME,
      displayFont: "barlow",
      bodyFont: "inter",
      heroDarkBg: "#1C1C1A",
      surfaceCream: "#F5F4F0",
      dividerColor: "#C8C4BC",
      textScale: 1.04,
      headingScale: 1.06,
      sectionPy: 100,
      gridGap: 28,
      borderWidth: 1,
      dividerWidth: 2,
      cardRadius: 0,
      cardShadow: "none",
      btnRadius: 0,
    },
  },
  {
    id: "modern",
    name: "Residencial Cálido",
    description:
      "Esquinas levemente suavizadas con tipografía Montserrat y DM Sans para proyectos de hogar.",
    theme: {
      ...DEFAULT_THEME,
      displayFont: "montserrat",
      bodyFont: "dm_sans",
      sectionPy: 88,
      gridGap: 24,
      cardRadius: 6,
      cardShadow: "sm",
      cardPadding: 30,
      btnRadius: 4,
    },
  },
  {
    id: "accessible",
    name: "Lectura Grande (Accesible)",
    description:
      "Letra más grande, alto contraste y espaciado cómodo pensado para lectura sin esfuerzo.",
    theme: {
      ...DEFAULT_THEME,
      displayFont: "archivo",
      bodyFont: "ibm_plex",
      textScale: 1.16,
      headingScale: 1.05,
      lineHeight: 1.8,
      sectionPy: 96,
      gridGap: 28,
      borderWidth: 2,
      cardRadius: 2,
      cardShadow: "none",
      cardPadding: 32,
      btnRadius: 2,
    },
  },
];

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  id: "main",
  theme: DEFAULT_THEME,
  company: {
    name: "Total Repair Ltda.",
    legalName: "Total Repair Ltda.",
    shortName: "Total Repair",
    tagline: "Construcción & Siniestros",
    founder: "Patricia Cecilia Gallardo",
    founded: "2004",
    yearsExperience: "22+",
    projectsDelivered: "500+",
    phone: "+56999195521",
    phoneClean: "+56999195521",
    phoneDisplay: "(+56) 9 9919 5521",
    email: "contacto@totalrepair.cl",
    notificationEmail: "contacto@totalrepair.cl",
    notificationCcEmail: "",
    autoReplyEnabled: true,
    autoReplySubject: "Recibimos su solicitud en Total Repair Ltda.",
    autoReplyGreeting:
      "Hemos recibido correctamente su solicitud de presupuesto. Un especialista técnico de nuestro equipo revisará los antecedentes y se comunicará con usted dentro de las próximas 24 horas hábiles.",
    address: "Villasana 1398, Quinta Normal, Santiago",
    addressShort: "Quinta Normal, Santiago",
    hours: "Lunes a Viernes: 08:30 – 18:30 hrs",
    emergencyHours: "Emergencias y Siniestros: 24/7",
    whatsappUrl: "https://wa.me/56999195521",
    whatsappMessage:
      "Hola, me contacto desde totalrepair.cl. Quisiera obtener más información.",
    linkedin: "https://www.linkedin.com/in/javieradasme/",
    logoUrl: "/img/logos/logo.png",
    bannerUrl: "/img/logos/banner.png",
  },
  content: {
    home: {
      badge: "Más de 22 años de experiencia en Chile",
      titlePrefix: "TOTAL",
      titleHighlight: "REPAIR",
      subtitle: "Construimos Confianza Desde 2004",
      descriptionPrefix: "Cuando la continuidad de su operación es crítica,",
      descriptionBold: "Total Repair responde.",
      ctaPrimaryLabel: "Solicitar Presupuesto",
      ctaEmpresasLabel: "División Empresas",
      ctaHogarLabel: "División Hogar",
      finalCtaEyebrow: "¿Listo para comenzar?",
      finalCtaTitle: "HABLEMOS DE SU",
      finalCtaHighlight: "PROYECTO.",
      finalCtaDescription:
        "Cuéntenos su requerimiento y un especialista técnico se comunicará dentro de las próximas 24 horas hábiles.",
      finalCtaButtonLabel: "Contactar Ahora",
      sectionsOrder: [
        "hero",
        "logos",
        "timeline",
        "spotlight",
        "cta",
        "emergency",
      ],
      sectionsVisible: {
        hero: true,
        logos: true,
        timeline: true,
        spotlight: true,
        cta: true,
        emergency: true,
      },
    },
    logosTitle: "Empresas e Instituciones que confían en nosotros",
    logos: [
      { id: "claro", src: "/img/logos/claro.png", alt: "Claro Chile" },
      { id: "wom", src: "/img/logos/wom.png", alt: "WOM" },
      { id: "enjoy", src: "/img/logos/enjoy.png", alt: "Enjoy" },
      {
        id: "usm",
        src: "/img/logos/usm.png",
        alt: "Universidad Técnica Federico Santa María (UTFSM)",
      },
      { id: "duoc", src: "/img/logos/duoc.png", alt: "Duoc UC" },
    ],
    timeline: {
      eyebrow: "Nuestra Historia en Obras",
      titlePrefix: "CONSTRUIMOS",
      titleHighlight: "CONFIANZA",
      titleSuffix: "DESDE 2004",
      description:
        "Un recorrido por nuestros hitos y proyectos más exigentes, demostrando capacidad de respuesta y excelencia técnica a lo largo de más de dos décadas.",
      items: [
        {
          id: "2004",
          year: "2004",
          title: "Nacimiento de Total Repair Ltda.",
          description:
            "Fundada el 4 de agosto de 2004 por Patricia Cecilia Gallardo, iniciando operaciones enfocadas en la reparación integral de inmuebles, obras civiles y respuesta a siniestros.",
          isHighlight: false,
        },
        {
          id: "2008",
          year: "2008",
          title: "Hotel del Mar Enjoy",
          description:
            "Ampliamos nuestra cartera de proyectos corporativos, marcando un estándar de alta exigencia técnica en el sector hotelero e institucional.",
          isHighlight: false,
        },
        {
          id: "2009",
          year: "2009",
          title: "Hospital Clínico UC",
          description:
            "Habilitación e intervenciones técnicas en recintos clínicos y hospitalarios donde la continuidad operacional y la bioseguridad son vitales.",
          isHighlight: false,
        },
        {
          id: "2010",
          year: "2010",
          title: "Hito 27F: Reconstrucción 24/7",
          description:
            "Reconstrucción post-terremoto trabajando 24/7 en 8 centros IntegraMédica de forma simultánea, destacando la coordinación logística en Plaza Norte junto a Icafal.",
          isHighlight: true,
        },
        {
          id: "2013",
          year: "2013–2014",
          title: "Chilevisión Machasa",
          description:
            "Proyecto emblemático de terminaciones de alta precisión técnica, revestimientos acústicos e interiorismo corporativo para estudios de televisión.",
          isHighlight: true,
        },
        {
          id: "2015",
          year: "2015–2020",
          title: "Expansión Nacional",
          description:
            "Consolidación en retail, telecomunicaciones (Claro, WOM), educación superior (Duoc UC, UTFSM) y obras mayores como la sobrecubierta del Hotel Park Lake (3.000 m²).",
          isHighlight: false,
        },
        {
          id: "actualidad",
          year: "Actualidad",
          title: "Más de 22 Años de Respaldo B2B y Hogar",
          description:
            "Liderazgo consolidado en construcción, habilitación corporativa y respuesta a siniestros en Chile, operando bajo normativa SEC y OGUC.",
          isHighlight: true,
        },
      ],
    },
    spotlight: {
      eyebrow: "Proyectos Insignia",
      titlePrefix: "OBRAS QUE DEJAN",
      titleHighlight: "HUELLA",
      description:
        "Nuestra experiencia se forja en proyectos donde la precisión, los plazos críticos y la excelencia técnica son innegociables.",
      items: [
        {
          id: "machasa",
          title: "Chilevisión Machasa",
          subtitle: "Proyecto Emblemático",
          description:
            "Ejecución de terminaciones de alta precisión técnica, revestimientos especializados e interiorismo detallado para estudios de televisión, cumpliendo con los más altos estándares acústicos y visuales de la industria.",
          image: "/img/fotos/remodelacion-interior.jpg",
          badges: ["Alta Precisión", "Interiorismo", "Estudios TV"],
          align: "left",
        },
        {
          id: "integramedica",
          title: "IntegraMédica Post-27F",
          subtitle: "Reconstrucción Crítica 24/7",
          description:
            "Reconstrucción simultánea de 8 centros médicos post-terremoto operando en turnos 24/7. Destaca la alta coordinación logística en Plaza Norte trabajando en conjunto con constructora Icafal.",
          image: "/img/fotos/historia-27f.jpg",
          badges: ["24/7", "Logística Crítica", "Salud"],
          align: "right",
        },
        {
          id: "parklake",
          title: "Hotel Park Lake",
          subtitle: "Sobrecubierta a Gran Escala",
          description:
            "Intervención mayor consistente en el recambio completo de 3.000 m² de cubierta en pleno invierno en la región lacustre, garantizando impermeabilidad total sin interrumpir la operación del hotel.",
          image: "/img/fotos/arquitectura-B2B.jpg",
          badges: ["3.000 m²", "Cubiertas", "Hotelería"],
          align: "left",
        },
      ],
    },
    emergency: {
      badge: "Unidad de Reacción Inmediata 24/7",
      empresasTitle: "¿Siniestro Activo o Emergencia Estructural?",
      empresasDescription:
        "Desplegamos cuadrillas de contención, extracción de agua, apuntalamiento y mitigación en tiempo récord para detener el daño progresivo y asegurar la continuidad operacional.",
      hogarTitle: "¿Emergencia en tu Hogar o Siniestro Domiciliario?",
      hogarDescription:
        "Atendemos filtraciones graves, cortocircuitos, daños por incendio o sismos en viviendas. Emitimos informes y presupuestos técnicos válidos para tu compañía de seguros.",
      callLabelPrefix: "Llamar",
      reportLabel: "Reportar Siniestro",
    },
    empresas: {
      eyebrow: "División Empresas e Instituciones",
      titleLine1: "CONSTRUIMOS TUS PROYECTOS.",
      titleHighlight: "SIN DEMORAS.",
      description:
        "Tu espacio listo para funcionar. Especialistas en remodelación, obras civiles y habilitación de locales comerciales con más de 22 años de experiencia en Chile.",
      heroImage: "/img/fotos/hero-corporativo.jpg",
      ctaPrimary: "Agendar Reunión",
      ctaSecondary: "Ver Servicios",
      bentoEyebrow: "Especialidades de Ejecución",
      bentoTitle: "Soluciones Corporativas Integrales",
      bentoDescription:
        "Coordinamos todos los gremios bajo una supervisión logística y administrativa unificada para garantizar continuidad operacional.",
      featuredLabel: "Especialidad Principal",
      featuredTitle: "Centros Comerciales y Habilitación B2B",
      featuredDescription:
        "Desde la planificación técnica hasta la entrega final. Remodelamos locales comerciales, oficinas corporativas, instituciones educativas y centros médicos garantizando que tus operaciones no se detengan.",
      featuredImage: "/img/fotos/arquitectura-B2B.jpg",
      maintTitle: "Mantenimiento Corporativo",
      maintDescription:
        "Reparación de techumbres, pisos industriales, redes eléctricas SEC y muros en zonas de alta circulación.",
      claimsBadge: "Atención 24/7",
      claimsTitle: "Liquidación y Siniestros",
      claimsDescription:
        "Inundaciones, daños por fuego o sismos. Presupuestos técnicos e informes directos para compañías de seguros.",
      claimsCta: "Línea Directa",
      uriEyebrow: "Unidad de Reacción Inmediata (URI)",
      uriTitle: "Gestión de Siniestros Corporativos",
      uriItems: [
        {
          id: "uri-01",
          code: "01",
          title: "Inundación y Daño por Agua",
          description:
            "Extracción industrial, secado técnico y reparación ultra-rápida de locales operativos tras roturas de matrices o temporales.",
          image: "/img/fotos/dano-agua.jpg",
        },
        {
          id: "uri-02",
          code: "02",
          title: "Siniestros por Incendio",
          description:
            "Retiro de escombros, descontaminación de hollín y reconstrucción estructural certificada pos-fuego.",
          image: "/img/fotos/dano-incendio.jpg",
        },
        {
          id: "uri-03",
          code: "03",
          title: "Impacto y Daño Estructural",
          description:
            "Evaluación SEC inmediata y reparación de muros, fachadas, pilares y techumbres por sismos o colisiones.",
          image: "/img/fotos/otros-siniestros.jpg",
        },
      ],
    },
    hogar: {
      eyebrow: "División Hogar / Total Construye",
      title: "TU HOGAR,",
      titleHighlight: "RENOVADO.",
      description:
        "Gasfitería, electricidad certificada SEC, remodelación de cocinas, baños y reparación de siniestros domiciliarios. Materiales de calidad y garantía escrita en cada trabajo.",
      heroImage: "/img/fotos/hero-hogar.jpg",
      ctaPrimary: "Solicitar Presupuesto",
      ctaWhatsapp: "Cotizar por WhatsApp",
      stats: [
        { value: "22+", label: "Años de Trayectoria" },
        { value: "500+", label: "Proyectos Ejecutados" },
        { value: "100%", label: "Trabajos con Garantía" },
      ],
      servicesEyebrow: "Nuestros Servicios",
      servicesTitle: "Todo lo que tu hogar necesita",
      servicesDescription:
        "Un solo equipo técnico para todas las especialidades. Sin improvisaciones.",
      services: [
        {
          id: "gasfiteria",
          title: "Gasfitería y Redes",
          description:
            "Instalación, mantención y reparación de redes de agua caliente, fría y gas. Detección de fugas y trabajo certificado SEC.",
          image: "/img/fotos/gasfiteria-redes.jpg",
          icon: "plumbing",
        },
        {
          id: "electricidad",
          title: "Electricidad SEC",
          description:
            "Instalaciones eléctricas residenciales certificadas. Tableros eléctricos, empalmes, enchufes, iluminación LED y certificación TE1.",
          image: "/img/fotos/electricidad-sec.jpg",
          icon: "electric",
        },
        {
          id: "remodelacion",
          title: "Remodelación Interior",
          description:
            "Transformamos cocinas, baños y espacios integrales. Diseño funcional, provisión de materiales y ejecución con garantía escrita.",
          image: "/img/fotos/remodelacion-interior.jpg",
          icon: "remodel",
        },
        {
          id: "pintura",
          title: "Pintura y Terminaciones",
          description:
            "Pintura interior y exterior, empaste, estuco, porcelanatos, pisos flotantes y terminaciones de alto estándar.",
          image: "/img/fotos/split-servicios.jpg",
          icon: "paint",
        },
      ],
      portfolioEyebrow: "Portafolio Residencial",
      portfolioTitle: "Proyectos Realizados en Hogares",
      faqsEyebrow: "Preguntas Frecuentes",
      faqsTitle: "Lo que más nos preguntan",
      faqs: [
        {
          id: "faq-1",
          q: "¿Trabajan con materiales del cliente?",
          a: "Sí. Podemos ejecutar la obra con materiales que tú proveas, o bien nos encargamos de toda la provisión y logística con precios convenidos y transparentes.",
        },
        {
          id: "faq-2",
          q: "¿Tienen garantía en los trabajos?",
          a: "Todos nuestros trabajos tienen garantía mínima de 6 meses en mano de obra estipulada por contrato. Las garantías de fabricante sobre materiales son adicionales.",
        },
        {
          id: "faq-3",
          q: "¿En cuánto tiempo parten?",
          a: "Una vez aprobado el presupuesto, coordinamos el inicio dentro de los próximos 5 a 10 días hábiles dependiendo de la envergadura de la obra. Para emergencias domiciliarias contamos con atención 24/7.",
        },
        {
          id: "faq-4",
          q: "¿Hacen trabajos en departamentos habitados?",
          a: "Sí. Trabajamos tanto en casas como en departamentos habitados y aplicamos protocolos especiales de aislación de polvo, horarios comunitarios y mínima interferencia con vecinos.",
        },
        {
          id: "faq-5",
          q: "¿Cómo solicito presupuesto?",
          a: "Puedes usar el formulario de contacto, llamarnos directamente al (+56) 9 9919 5521 o enviarnos un mensaje directo por WhatsApp.",
        },
      ],
    },
    servicios: {
      eyebrow: "Catálogo Técnico",
      title: "SOLUCIONES ESTRUCTURALES",
      titleHighlight: "B2B & HOGAR.",
      description:
        "Abarcamos toda la gama de servicios de ingeniería civil, remodelación y respuesta a siniestros, desde el levantamiento técnico hasta la recepción conforme bajo normativa chilena.",
      heroImage: "/img/fotos/arquitectura-B2B.jpg",
      specEyebrow: "Gremios Integrados",
      specTitle: "Especialidades de Ejecución",
      specDescription:
        "Coordinamos todos los gremios bajo una misma supervisión logística y administrativa para garantizar cumplimiento de plazos y calidad.",
      specialities: [
        {
          id: "carpinteria",
          name: "Carpintería Industrial",
          description:
            "Tabiquería estructural y acústica, puertas cortafuego, cielos modulares y mobiliario técnico corporativo.",
          icon: "carpentery",
        },
        {
          id: "pintura",
          name: "Pintura Alta Gama",
          description:
            "Revestimientos epóxicos, intumescentes, esmaltes industriales y terminaciones arquitectónicas de alto tráfico.",
          icon: "paint",
        },
        {
          id: "electricidad",
          name: "Electricidad SEC",
          description:
            "Proyectos eléctricos en baja tensión, tableros generales, bancos de condensadores, iluminación LED y certificación TE1.",
          icon: "sec",
        },
        {
          id: "redes",
          name: "Redes de Datos y Clima",
          description:
            "Cableado estructurado, canalización industrial, salas de servidores y climatización HVAC para oficinas y locales.",
          icon: "data",
        },
      ],
      claimsBadge: "Unidad de Reacción Inmediata",
      claimsTitle: "Manejo de Emergencias y Siniestros",
      claims: [
        {
          id: "claim-01",
          code: "01",
          title: "Inundación y Daño por Agua",
          description:
            "Extracción mecanizada de agua, deshumidificación industrial, secado de losas y reparación integral de locales comerciales, oficinas y viviendas tras roturas de matrices o eventos climáticos.",
        },
        {
          id: "claim-02",
          code: "02",
          title: "Siniestros por Incendio",
          description:
            "Retiro normado de escombros, encapsulamiento y limpieza técnica de hollín, evaluación estructural y reconstrucción certificada pos-fuego en coordinación directa con liquidadores de seguros.",
        },
        {
          id: "claim-03",
          code: "03",
          title: "Impacto y Daño Estructural",
          description:
            "Apuntalamiento de emergencia, evaluación SEC/OGUC inmediata y reconstrucción de muros perimetrales, fachadas, escaparates comerciales y techumbres afectadas por sismos o colisiones.",
        },
      ],
    },
    nosotros: {
      eyebrow: "Filosofía Corporativa",
      title: "RESPUESTAS BAJO",
      titleHighlight: "PRESIÓN.",
      description:
        "Fundada el 4 de agosto de 2004 por Patricia Cecilia Gallardo, Total Repair Ltda. nació con la convicción de ofrecer respuestas reales cuando los tiempos apremian. Con más de 22 años de trayectoria en Chile, nos especializamos en ejecutar obras complejas en espacios ocupados, garantizando la continuidad operacional de su empresa y la tranquilidad de su hogar.",
      coreImage: "/img/fotos/historia-27f.jpg",
      coreQuote:
        '"Nuestra especialidad es operar donde otros se detienen: espacios habitados y recintos críticos."',
      coreDescription:
        "Desde reconstrucciones por siniestros graves hasta remodelaciones corporativas y domiciliarias de alta exigencia, entendemos que su vida y su operación no se detienen por una obra. Entregamos la administración y supervisión total del proyecto bajo estándares SEC y OGUC.",
      guaranteesEyebrow: "Certificaciones y Garantías",
      guaranteesTitle: "Seguridad Certificada",
      guaranteesDescription:
        "Trabajamos bajo los más altos estándares normativos y de prevención de riesgos en Chile.",
      guarantees: [
        {
          id: "trc",
          title: "Seguros TRC y RC",
          description:
            "Contamos con Seguros de Todo Riesgo Construcción y Responsabilidad Civil, protegiendo tu patrimonio desde el día uno de la obra.",
          icon: "shield",
        },
        {
          id: "achs",
          title: "Prevención ACHS",
          description:
            "Trabajamos bajo estrictos protocolos de seguridad laboral y prevención de riesgos respaldados por la Asociación Chilena de Seguridad.",
          icon: "user",
        },
        {
          id: "sec",
          title: "Cumplimiento SEC / OGUC",
          description:
            "Todas nuestras instalaciones eléctricas, sanitarias y de gas son ejecutadas por profesionales acreditados ante la Superintendencia (SEC).",
          icon: "clipboard",
        },
      ],
    },
    proyectos: {
      eyebrow: "Portafolio de Obras",
      title: "PROYECTOS",
      titleHighlight: "EJECUTADOS.",
      description:
        "Más de 22 años transformando y recuperando espacios. Empresas, aseguradoras, instituciones y hogares en la Región Metropolitana confían en nosotros para cada etapa de su proyecto.",
      ctaEyebrow: "¿Tienes un proyecto?",
      ctaTitle: "CUÉNTANOS TU IDEA.",
      ctaDescription:
        "Desde la remodelación de un baño o cocina hasta la habilitación de un centro comercial completo. Evaluamos tu proyecto en terreno.",
      ctaPrimary: "Solicitar Presupuesto",
      ctaSecondary: "Ver Servicios",
    },
    contacto: {
      eyebrow: "Contacto Directo",
      titlePrefix: "INICIAMOS SU",
      titleHighlight: "PROYECTO",
      description:
        "Complete los detalles a continuación y nuestro equipo técnico se comunicará dentro de las próximas 24 horas hábiles (o de inmediato para emergencias 24/7).",
      submitLabel: "Enviar Solicitud de Presupuesto",
      privacyNote:
        "Al enviar este formulario, usted acepta nuestra Política de Privacidad acorde a la Ley N° 19.628.",
    },
  },
};

export const DEFAULT_PROJECTS: ProjectRecord[] = [
  {
    id: "seed-01",
    slug: "remodelacion-local-centro-comercial-las-condes",
    title: "Remodelación de Local en Centro Comercial",
    category: "Habilitación Comercial",
    division: "empresas",
    location: "Las Condes",
    year: "2025",
    description:
      "Habilitación completa de local comercial en horario extendido para no interrumpir operaciones del mall. Carpintería, porcelanato, electricidad SEC y climatización.",
    tags: ["B2B", "Retail"],
    cover_image_url: "/img/fotos/hero-corporativo.jpg",
    is_featured: true,
    is_published: true,
    sort_order: 1,
    images: [
      {
        id: "seed-01-img-1",
        project_id: "seed-01",
        image_url: "/img/fotos/hero-corporativo.jpg",
        storage_path: null,
        caption: "Vista general del espacio comercial habilitado",
        photo_type: "after",
        sort_order: 1,
      },
    ],
  },
  {
    id: "seed-02",
    slug: "renovacion-integral-bano-cocina-providencia",
    title: "Renovación Integral de Baño y Cocina",
    category: "Remodelación Residencial",
    division: "hogar",
    location: "Providencia",
    year: "2025",
    description:
      "Modernización completa de baño y cocina en departamento habitado. Porcelanatos de gran formato, gasfitería certificada SEC y electricidad.",
    tags: ["Hogar", "Terminaciones"],
    cover_image_url: "/img/fotos/remodelacion-interior.jpg",
    is_featured: true,
    is_published: true,
    sort_order: 2,
    images: [
      {
        id: "seed-02-img-1",
        project_id: "seed-02",
        image_url: "/img/fotos/remodelacion-interior.jpg",
        storage_path: null,
        caption: "Terminaciones en baño y cocina renovados",
        photo_type: "after",
        sort_order: 1,
      },
    ],
  },
  {
    id: "seed-03",
    slug: "recuperacion-post-inundacion-oficina-santiago",
    title: "Recuperación Post-Inundación Oficina Corporativa",
    category: "Siniestro — Daño por Agua",
    division: "siniestros",
    location: "Santiago Centro",
    year: "2025",
    description:
      "Restauración completa de oficina de 800 m² tras rotura de matriz principal. Reparación en tiempo récord con recinto operativo y presupuesto coordinado con aseguradora.",
    tags: ["B2B", "Emergencia"],
    cover_image_url: "/img/fotos/dano-agua.jpg",
    is_featured: false,
    is_published: true,
    sort_order: 3,
    images: [
      {
        id: "seed-03-img-1",
        project_id: "seed-03",
        image_url: "/img/fotos/dano-agua.jpg",
        storage_path: null,
        caption: "Intervención de emergencia y secado industrial",
        photo_type: "gallery",
        sort_order: 1,
      },
    ],
  },
  {
    id: "seed-04",
    slug: "reconstruccion-pos-incendio-local-maipu",
    title: "Reconstrucción Pos-Incendio Local Comercial",
    category: "Siniestro — Incendio",
    division: "siniestros",
    location: "Maipú",
    year: "2025",
    description:
      "Retiro de escombros, limpieza técnica de hollín, recuperación de superficies y reconstrucción completa. Propiedad devuelta como nueva en 21 días hábiles.",
    tags: ["B2B", "Emergencia"],
    cover_image_url: "/img/fotos/dano-incendio.jpg",
    is_featured: false,
    is_published: true,
    sort_order: 4,
    images: [
      {
        id: "seed-04-img-1",
        project_id: "seed-04",
        image_url: "/img/fotos/dano-incendio.jpg",
        storage_path: null,
        caption: "Recuperación estructural y reconstrucción pos-fuego",
        photo_type: "gallery",
        sort_order: 1,
      },
    ],
  },
  {
    id: "seed-05",
    slug: "construccion-banos-institucion-educativa-la-florida",
    title: "Construcción de Baños para Institución Educativa",
    category: "Construcción — Salas de Baño",
    division: "empresas",
    location: "La Florida",
    year: "2025",
    description:
      "Desarrollo completo de 8 salas de baño para establecimiento educacional. Protocolos de seguridad ACHS, materiales certificados y entrega en plazo Carta Gantt.",
    tags: ["Institucional", "Obra Nueva"],
    cover_image_url: "/img/fotos/gasfiteria-redes.jpg",
    is_featured: false,
    is_published: true,
    sort_order: 5,
    images: [
      {
        id: "seed-05-img-1",
        project_id: "seed-05",
        image_url: "/img/fotos/gasfiteria-redes.jpg",
        storage_path: null,
        caption: "Red sanitaria y habilitación completa de salas de baño",
        photo_type: "after",
        sort_order: 1,
      },
    ],
  },
  {
    id: "seed-06",
    slug: "habilitacion-coworking-moderno-vitacura",
    title: "Habilitación de Espacio Co-working Moderno",
    category: "Remodelación — Co-working",
    division: "empresas",
    location: "Vitacura",
    year: "2025",
    description:
      "Transformación de oficina tradicional en espacio de co-working flexible. Diseño de zonas de trabajo colaborativo, tabiquería acústica y áreas de descanso.",
    tags: ["B2B", "Diseño Interior"],
    cover_image_url: "/img/fotos/arquitectura-B2B.jpg",
    is_featured: false,
    is_published: true,
    sort_order: 6,
    images: [
      {
        id: "seed-06-img-1",
        project_id: "seed-06",
        image_url: "/img/fotos/arquitectura-B2B.jpg",
        storage_path: null,
        caption: "Espacio corporativo remodelado con tabiquería acústica",
        photo_type: "after",
        sort_order: 1,
      },
    ],
  },
];
