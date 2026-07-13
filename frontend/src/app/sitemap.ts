import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ccsrr.manipal.in";

  const routes = [
    { url: baseUrl, changeFrequency: "monthly" as const, priority: 1 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/members`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${baseUrl}/projects`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/devices`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${baseUrl}/events`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${baseUrl}/publications`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/gallery`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/contact`, changeFrequency: "yearly" as const, priority: 0.6 },
  ];

  return routes.map((route) => ({
    url: route.url,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
