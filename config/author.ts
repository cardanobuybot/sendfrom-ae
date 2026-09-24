import { site } from "./site";

/**
 * Single source of truth for the site's author. Referenced by:
 *   - /about/author page (renders bio + Person JSON-LD)
 *   - <AuthorByline /> — appears on every blog post + provider page
 *   - Article JSON-LD blocks (author.author = this Person)
 *
 * Keep it factual and modest. No claims of being a licensed financial
 * adviser — this site publishes information, not advice.
 */

export const author = {
  slug: "author",
  name: "Pavels S.",
  role: "Editor",
  location: "Latvia",
  shortBio:
    "Latvia-based merchant seafarer. Sends money across borders often — writes this guide from real experience.",
  longBio: [
    "Pavels S. is a Latvia-based merchant seafarer who works abroad on long rotations. Sending money across borders — from ports, from ships and from home — is part of daily life, and the small differences between apps add up fast over a career.",
    "Pavels started sendfrom.ae as an independent guide for other expats living in the UAE who send money home to their families. Everything on this site is based on hands-on use of the apps described here, on public information from each provider, and on the sources cited at the bottom of each page.",
    "Pavels is not a licensed financial adviser and does not give financial advice. sendfrom.ae is an information website, not a money-transfer service, and does not hold or move funds. See our /affiliate-disclosure and /terms pages for how we handle affiliate links and liability.",
  ],
  urlPath: "/about/author",
  fullUrl: `${site.url}/about/author`,
};
