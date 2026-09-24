"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean>(false);
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);
  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem("sf.theme", next ? "dark" : "light"); } catch { /* noop */ }
  }
  return (
    <button
      type="button"
      onClick={toggle}
      className="ml-2 px-2 py-1 rounded-md text-[13px] hover:bg-[var(--card)]"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light" : "Dark"}
    >
      {dark ? "☀" : "☾"}
    </button>
  );
}
