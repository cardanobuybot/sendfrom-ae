"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { site } from "@/config/site";

const nav = [
  { href: "/compare", label: "Compare" },
  { href: "/send-money-to-philippines", label: "Philippines" },
  { href: "/send-money-to-india", label: "India" },
  { href: "/send-money-to-pakistan", label: "Pakistan" },
  { href: "/blog", label: "Blog" },
];

/**
 * Sticky top bar.
 *
 * - Solid --bg background, no backdrop-filter, no /95 alpha — that combo
 *   let green content bleed through on mobile as a soft blob behind the
 *   logo. Solid colour is clean in dark and light mode.
 * - Layout:
 *     ≥ 640 px (sm+): logo left, nav row right in one line.
 *     < 640 px (mobile): logo left, ThemeToggle + hamburger right; nav
 *     collapses into a dropdown drawer that appears below the header
 *     when tapped. Nothing overflows or scrolls horizontally, so the
 *     old grey scrollbar artefact under the nav is gone.
 * - The hamburger drawer closes on outside click, on Escape and on any
 *   nav-item tap. Focus is not trapped — it's a very small nav.
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      ref={ref}
      className="sticky top-0 z-30 border-b border-[var(--card-border)] bg-[color:var(--bg)]"
    >
      <div className="mx-auto max-w-3xl px-4 py-3 flex items-center gap-3">
        <Link
          href="/"
          className="font-bold tracking-tight text-lg hover:no-underline flex items-center gap-2 shrink-0"
        >
          <img src="/icon.svg" alt="" width={28} height={28} aria-hidden="true" />
          {site.name}
        </Link>

        {/* Desktop nav */}
        <nav className="ml-auto hidden sm:flex items-center gap-1 text-[13px]">
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

        {/* Mobile toolbar — theme toggle + hamburger */}
        <div className="ml-auto flex sm:hidden items-center gap-1">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="p-2 rounded-md hover:bg-[var(--card)] focus-visible:bg-[var(--card)]"
          >
            <svg
              width="22" height="22" viewBox="0 0 22 22" fill="none"
              aria-hidden="true"
              style={{ display: "block" }}
            >
              {open ? (
                <path d="M4 4 L18 18 M18 4 L4 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              ) : (
                <>
                  <path d="M3 6 H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M3 11 H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M3 16 H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer — anchored to the sticky header so it slides in
          right below the top bar. Solid bg so nothing bleeds through. */}
      {open && (
        <nav
          id="mobile-nav"
          className="sm:hidden border-t border-[var(--card-border)] bg-[color:var(--bg)]"
        >
          <ul className="mx-auto max-w-3xl px-2 py-1 flex flex-col text-[15px]">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-3 rounded-md hover:bg-[var(--card)] hover:no-underline"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
