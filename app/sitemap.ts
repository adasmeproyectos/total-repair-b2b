import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.totalrepair.cl";
  
  const routes = [
    "",
    "/empresas",
    "/hogar",
    "/nosotros",
    "/servicios",
    "/contacto",
    "/privacidad",
    "/terminos",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
