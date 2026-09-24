import Link from "next/link";
import { partners } from "@/config/partners";

/**
 * Renders the primary CTA for a provider.
 * - Affiliate providers → /go/<slug> redirect with rel="sponsored nofollow".
 * - Non-affiliate providers → direct link to official site with rel="noopener".
 */
export default function AffiliateButton({
  slug,
  children,
  className,
}: {
  slug: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const p = partners[slug];
  if (!p) return null;
  const label = children ?? `Open ${p.name}`;
  if (p.affiliate) {
    return (
      <Link
        href={`/go/${slug}`}
        className={"btn btn-primary " + (className ?? "")}
        rel="sponsored nofollow"
        target="_blank"
      >
        {label}
      </Link>
    );
  }
  return (
    <a
      href={p.url}
      className={"btn btn-primary " + (className ?? "")}
      rel="noopener nofollow"
      target="_blank"
    >
      {label}
    </a>
  );
}
