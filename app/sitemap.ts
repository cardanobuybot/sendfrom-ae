import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { providers } from "@/config/providers";
import { corridors } from "@/config/corridors";
import { posts } from "@/config/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const base = site.url;
  const staticPages = [
    "",
    "/compare",
    "/blog",
    "/about",
    "/about/author",
    "/contact",
    "/privacy",
    "/terms",
    "/affiliate-disclosure",
    "/how-we-compare",
  ];
  return [
    ...staticPages.map((p) => ({
      url: `${base}${p}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1 : 0.7,
    })),
    ...providers.map((p) => ({
      url: `${base}/${p.slug}`,
      lastModified: p.dataLastUpdated,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...corridors.map((c) => ({
      url: `${base}/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: p.date,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
