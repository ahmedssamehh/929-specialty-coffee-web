import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://929coffee.com";
  const now = new Date();

  const routes = [
    "",
    "/menu",
    "/origins",
    "/locations",
    "/experiences",
    "/journal",
    "/about",
    "/contact",
    "/order",
    "/gift-cards",
    "/proposal",
    "/club",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : route === "/proposal" ? 0.9 : 0.7,
  }));
}
