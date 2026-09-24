import Link from "next/link";
import { site } from "@/config/site";

const legalLinks = [
  { href: "/about", label: "About" },
  { href: "/about/author", label: "Author" },
  { href: "/contact", label: "Contact" },
  { href: "/how-we-compare", label: "How we compare" },
  { href: "/affiliate-disclosure", label: "Affiliate disclosure" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--card-border)]">
      <div className="mx-auto max-w-3xl px-4 py-8 text-sm text-[color:var(--muted)]">
        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
          {legalLinks.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-[color:var(--fg)]">
              {l.label}
            </Link>
          ))}
        </div>
        <p className="max-w-prose">
          {site.name} is an independent guide. We are not a money-transfer service.
          We do not hold or move funds. Content here is general information only,
          not financial advice. We may earn a commission if you use some of the
          links on this site — see our{" "}
          <Link href="/affiliate-disclosure" className="underline">affiliate disclosure</Link>.
        </p>
        <p className="mt-4 text-xs opacity-70">© {new Date().getFullYear()} {site.name}. All product names are trademarks of their respective owners.</p>
      </div>
    </footer>
  );
}
