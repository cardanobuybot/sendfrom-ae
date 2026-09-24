"use client";
import { useState } from "react";

/**
 * Small email capture form used only on /revolut.
 * Posts to /api/notify-revolut — server-side endpoint (no email service
 * wired up yet; it logs and returns 202). Swap in your ESP later.
 */
export default function RevolutNotify() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "busy" | "ok" | "err">("idle");
  const [err, setErr] = useState<string>("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setErr("Please enter a valid email address.");
      setStatus("err");
      return;
    }
    setStatus("busy"); setErr("");
    try {
      const r = await fetch("/api/notify-revolut", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      setStatus("ok");
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
      setStatus("err");
    }
  }

  if (status === "ok") {
    return (
      <div className="card p-4">
        <p><b>Thanks — you're on the list.</b> We'll email you when Revolut opens in the UAE.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card p-4">
      <label htmlFor="ru-email" className="block text-sm font-medium mb-2">
        Notify me when Revolut launches in the UAE
      </label>
      <div className="flex gap-2 flex-wrap">
        <input
          id="ru-email"
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-3 py-2 rounded-lg border border-[var(--card-border)] bg-[var(--card)] flex-1 min-w-[220px]"
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={status === "busy"}
        >
          {status === "busy" ? "Sending…" : "Notify me"}
        </button>
      </div>
      {status === "err" && <p className="text-red-500 text-sm mt-2">{err}</p>}
      <p className="muted text-xs mt-2">
        We use your email only for this notification. See our{" "}
        <a href="/privacy" className="underline">privacy policy</a>.
      </p>
    </form>
  );
}
