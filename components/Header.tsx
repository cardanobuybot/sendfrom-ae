import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { site } from "@/config/site";

const nav = [
  { href: "/compare", label: "Compare" },
  { href: "/send-money-to-philippines", label: "Philippines" },
  { href: "/send-money-to-india", label: "India" },
  { href: "/send-money-to-pakistan", label: "Pakistan" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  return (
    /* Solid background: the semi-transparent + backdrop-blur combo made
       any green content scrolling underneath (btn-primary, accent
       border-l cards) bleed as a soft green blob behind the "sendfrom.ae"
       logo on mobile in both dark and light mode. */
    <header className="sticky top-0 z-30 border-b border-[var(--card-border)] bg-[color:var(--bg)]">
      <div className="mx-auto max-w-3xl px-4 py-3 flex items-center gap-3">
        <Link href="/" className="font-bold tracking-tight text-lg hover:no-underline flex items-center gap-2">
          {/* Same icon as the favicon — inline <img> so it loads without
              JS. The site's accent (--accent = #1f6a52) matches the
              green square inside the SVG so the brand looks unified. */}
          <img src="/icon.svg" alt="" width={28} height={28} aria-hidden="true" />
          {site.name}
        </Link>
        <nav className="ml-auto flex items-center gap-1 overflow-x-auto text-[13px]">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="px-2 py-1 rounded-md whitespace-nowrap hover:bg-[var(--card)] hover:no-underline"
            >
              {n.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
