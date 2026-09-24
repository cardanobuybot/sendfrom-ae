import type { MetadataRoute } from "next";
import { site } from "@/config/site";

/**
 * robots.txt policy:
 * - Allow everything, including search bots and modern AI crawlers, explicitly.
 *   Named UAs get their own block so bots that ignore the "*" rule still see us.
 * - Disallow /go/ (affiliate redirects — no indexing value, would just leak
 *   partner-URL fingerprints).
 * - Disallow /api/ (server-only routes).
 */
export default function robots(): MetadataRoute.Robots {
  const disallow = ["/api/", "/go/"];
  // AI + search bots we want to explicitly welcome.
  const namedBots = [
    "Googlebot",
    "Bingbot",
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-SearchBot",
    "Claude-User",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Applebot-Extended",
  ];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...namedBots.map((userAgent) => ({ userAgent, allow: "/", disallow })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
