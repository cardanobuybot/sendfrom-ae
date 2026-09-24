import Link from "next/link";
import { author } from "@/config/author";

/**
 * Tiny byline shown on every blog post and provider page.
 * Links to the author bio page so search engines can crawl the
 * author → Person schema chain.
 */
export default function AuthorByline({
  dateISO,
  updatedISO,
  className,
}: {
  /** ISO date string — "published on". */
  dateISO?: string;
  /** ISO date string — "updated on". Falls back to dateISO. */
  updatedISO?: string;
  className?: string;
}) {
  return (
    <p className={"muted text-sm " + (className ?? "")}>
      By{" "}
      <Link href={author.urlPath} className="underline" rel="author">
        {author.name}
      </Link>
      {dateISO ? (
        <>
          {" · "}Published <time dateTime={dateISO}>{dateISO}</time>
        </>
      ) : null}
      {updatedISO && updatedISO !== dateISO ? (
        <>
          {" · "}Updated <time dateTime={updatedISO}>{updatedISO}</time>
        </>
      ) : null}
    </p>
  );
}

/**
 * Shape used inside Article JSON-LD. Kept in this file so callers
 * import from one place.
 */
export function authorJsonLd() {
  return {
    "@type": "Person",
    name: author.name,
    url: author.fullUrl,
  };
}
