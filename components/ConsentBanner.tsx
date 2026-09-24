"use client";
import { useEffect, useState } from "react";

/**
 * Minimal GDPR-friendly consent notice. We do not run analytics before
 * consent — Vercel Analytics respects DNT and does not use cookies, so the
 * banner is informational rather than a hard gate.
 */
export default function ConsentBanner() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    try {
      if (!localStorage.getItem("sf.consent")) setOpen(true);
    } catch { /* noop */ }
  }, []);
  if (!open) return null;
  function accept() {
    try { localStorage.setItem("sf.consent", "1"); } catch { /* noop */ }
    setOpen(false);
  }
  return (
    <div className="fixed bottom-3 left-3 right-3 z-50 max-w-3xl mx-auto card p-4 text-sm shadow-lg">
      <p className="mb-3">
        We use privacy-friendly analytics to count page views (no cross-site
        tracking). See our <a href="/privacy" className="underline">privacy policy</a>.
      </p>
      <div className="flex gap-2">
        <button className="btn btn-primary" onClick={accept}>OK</button>
        <a className="btn" href="/privacy">Learn more</a>
      </div>
    </div>
  );
}
