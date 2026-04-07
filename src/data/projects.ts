export type ProjectData = {
  id: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  year: string;
  accent: string;
  image: string;
  images: string[];
  tags: string[];
  github: string;
  overview: string;
  challenges: string[];
  results: string[];
  fit?: "cover" | "contain";
  aspectRatio?: string;
  bgColor?: string;
};

export const projects: ProjectData[] = [
  {
    id: "glamstock",
    title: "GlamStock",
    subtitle: "Sistema de Inventarios para PyMEs",
    shortDesc:
      "Evolucion de monolito a SOA. Validacion con Zod que redujo margen de errores en un 70%. BD PostgreSQL normalizada con 7 entidades para +1,500 registros de inventario. Actualmente en produccion.",
    year: "Mar 2026",
    accent: "#a78bfa",
    image: "/glamstock/glamstock.png",
    images: [
      "/glamstock/glamstock.png",
      "/glamstock/glamstock2.png",
      "/glamstock/glamstock3.png",
      "/glamstock/glamstock4.png",
    ],
    tags: ["Next.js", "Express.js", "PostgreSQL", "Docker", "AWS", "Zod", "TypeScript"],
    github: "https://github.com/ArturoYJ/GlamStock",
    overview:
      "GlamStock es un sistema de gestion de inventarios disenado para pequenas y medianas empresas del sector retail y cosmetico. Nacio como un monolito y evoluciono a una Arquitectura Orientada a Servicios (SOA) para mejorar su escalabilidad y mantenimiento.",
    challenges: [
      "Migracion de monolito a SOA sin interrumpir el servicio existente.",
      "Diseno de esquemas de validacion robustos con Zod para garantizar integridad de datos.",
      "Configuracion de infraestructura cloud con alta disponibilidad en AWS.",
      "Normalizacion de base de datos PostgreSQL con 7 entidades para soportar +1,500 registros.",
    ],
    results: [
      "Reduccion de errores de integracion en un 70% tras implementar validacion con Zod.",
      "Separacion completa de infraestructura, API y cliente bajo SOA.",
      "Persistencia de datos confiable con PostgreSQL en AWS RDS.",
      "Despliegue automatizado con Docker y GitHub Actions.",
    ],
    fit: "cover",
    bgColor: "#fefeff",
  },
  {
    id: "huginmunin",
    title: "Hugin Munin",
    subtitle: "ZOOMAT - Gestion de Especies en Cautiverio",
    shortDesc:
      "Centralizacion de datos de +200 especies para el Zoologico de Chiapas. API REST en Kotlin/Ktor bajo Arquitectura Hexagonal con desacoplamiento total de logica de negocio.",
    year: "2025 - Present",
    accent: "#34d399",
    image: "/hugin/huginmunin.png",
    images: ["/hugin/huginmunin.png"],
    tags: ["Angular", "Kotlin", "Ktor", "PostgreSQL", "Hexagonal Architecture", "REST API"],
    github: "https://github.com/ArturoYJ/hugin_munin_ng",
    overview:
      "Hugin Munin es una plataforma de gestion disenada para el Zoologico Miguel Alvarez del Toro (ZOOMAT) en Chiapas. Soluciona la descentralizacion y perdida de registros de especies en cautiverio mediante una API robusta y un cliente Angular.",
    challenges: [
      "Centralizacion de datos historicamente dispersos en papel y distintos sistemas.",
      "Diseno de API desacoplada usando Arquitectura Hexagonal en Kotlin/Ktor.",
      "Colaboracion en equipo multidisciplinario con metodologia agil.",
      "Garantizar cero perdida de datos en registros de especies protegidas.",
    ],
    results: [
      "API REST completamente desacoplada de logica de negocio bajo Hexagonal Architecture.",
      "Sistema de conteo y reporte de especies en tiempo real.",
      "Reduccion del tiempo de generacion de reportes de dias a segundos.",
      "Integracion exitosa con el flujo operativo del zoologico.",
    ],
    fit: "cover",
  },
  {
    id: "pillup",
    title: "PillUp",
    subtitle: "Sistema de Salud Nativo - Android",
    shortDesc:
      "App nativa Android para gestion de medicamentos. Arquitectura MVVM estricta con ViewModel y LiveData, garantizando persistencia de estado ante cambios de configuracion.",
    year: "Nov 2025",
    accent: "#60a5fa",
    image: "/pillup/original/next.png",
    images: [
      "/pillup/vistade3/bienvenida1.png",
      "/pillup/vistade3/procesoMedicamentos.png",
      "/pillup/vistade2/medicamentos.png",
      "/pillup/vistade2/registrarMedicamento2.png",
      "/pillup/vistade2/verContacto.png",
    ],
    tags: ["Kotlin", "Jetpack Compose", "Firebase", "MVVM", "LiveData", "ViewModel", "Android"],
    github: "https://github.com/ArturoYJ/PillUp",
    overview:
      "PillUp es una aplicacion movil nativa para Android orientada a la gestion personal de medicamentos y seguimiento de salud. Implementa una Arquitectura MVVM estricta que garantiza la persistencia del estado ante cambios de configuracion del dispositivo.",
    challenges: [
      "Implementacion correcta del patron MVVM con separacion estricta de responsabilidades.",
      "Manejo de cambios de configuracion (rotacion, idioma) sin perdida de estado.",
      "Integracion con Firebase para autenticacion y base de datos en tiempo real.",
      "Diseno de interfaz accesible y fluida con Jetpack Compose.",
    ],
    results: [
      "Persistencia total del estado ante cambios de configuracion con ViewModel y LiveData.",
      "UI moderna y reactiva implementada con Jetpack Compose.",
      "Sincronizacion en tiempo real de datos de medicamentos con Firebase.",
      "Arquitectura limpia y mantenible lista para escalar con nuevas funcionalidades.",
    ],
    fit: "contain",
    aspectRatio: "16 / 9",
    bgColor: "#f8fafc",
  },
];

export const projectsById: Record<string, ProjectData> = Object.fromEntries(
  projects.map((project) => [project.id, project])
);
