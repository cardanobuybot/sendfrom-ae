"use client";
import { useEffect, useState } from "react";
import Script from "next/script";

/**
 * Microsoft Clarity loader gated on the same localStorage consent flag
 * that <ConsentBanner /> writes (`sf.consent === "1"`).
 *
 * - No consent yet → this component renders nothing. No Clarity tag hits
 *   the DOM, nothing is loaded from Microsoft.
 * - User clicks "OK" in ConsentBanner → banner fires the custom event
 *   `sf-consent-changed`. This component listens and re-checks, so the
 *   script mounts within the same page load (no reload needed).
 * - Consent withdrawn (localStorage cleared or set to something else) →
 *   the check on next mount returns false, script is not re-loaded on the
 *   next page load. We do not attempt to unload an already-loaded Clarity
 *   in the current tab (Clarity doesn't support that cleanly); the guard
 *   is per page load.
 * - Cross-tab: the browser `storage` event fires in *other* tabs when
 *   the consent value changes, so if a user accepts in one tab another
 *   open tab picks it up on the next render tick.
 *
 * Privacy: Clarity masks form input values by default (mask="content"
 * plus a strict rule for inputs). We do NOT loosen this — the email
 * field on /revolut stays masked in session recordings.
 *
 * We call `window.clarity('consent')` once after the script loads so that
 * Clarity's own consent-mode records this session under "consent granted".
 */

const CLARITY_PROJECT_ID = "yn88gbonmh";

function hasConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem("sf.consent") === "1";
  } catch {
    return false;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[] };
declare global {
  interface Window {
    clarity?: ClarityFn;
  }
}

export default function ClarityLoader() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    setConsented(hasConsent());
    const refresh = () => setConsented(hasConsent());
    window.addEventListener("storage", refresh);
    window.addEventListener("sf-consent-changed", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("sf-consent-changed", refresh);
    };
  }, []);

  if (!consented) return null;

  return (
    <Script
      id="ms-clarity"
      strategy="afterInteractive"
      src={`https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`}
      onLoad={() => {
        // Signal Clarity consent-mode: user granted analytics consent.
        try {
          window.clarity?.("consent");
        } catch {
          /* noop */
        }
      }}
    />
  );
}
