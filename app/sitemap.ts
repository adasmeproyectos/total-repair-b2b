import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.totalrepair.cl";
  const lastModified = new Date("2026-10-20T00:00:00.000Z");

  const routes: Array<{
    path: string;
    priority: number;
    changeFrequency: "weekly" | "monthly";
  }> = [
    { path: "",           priority: 1.0, changeFrequency: "weekly"  },
    { path: "/empresas",  priority: 0.9, changeFrequency: "weekly"  },
    { path: "/servicios", priority: 0.9, changeFrequency: "weekly"  },
    { path: "/hogar",     priority: 0.9, changeFrequency: "weekly"  },
    { path: "/proyectos", priority: 0.8, changeFrequency: "monthly" },
    { path: "/nosotros",  priority: 0.8, changeFrequency: "monthly" },
    { path: "/contacto",  priority: 0.8, changeFrequency: "monthly" },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
