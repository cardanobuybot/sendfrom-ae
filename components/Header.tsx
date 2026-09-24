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
    <header className="sticky top-0 z-30 border-b border-[var(--card-border)] bg-[color:var(--bg)]/95 backdrop-blur">
      <div className="mx-auto max-w-3xl px-4 py-3 flex items-center gap-3">
        <Link href="/" className="font-bold tracking-tight text-lg hover:no-underline">
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
