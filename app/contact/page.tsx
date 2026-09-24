import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with sendfrom.ae for feedback, corrections, or partnerships.",
  alternates: { canonical: `${site.url}/contact` },
};

export default function Page() {
  return (
    <>
      <h1 className="text-3xl font-bold">Contact</h1>
      <p className="mt-4 leading-relaxed">
        Email us at{" "}
        <a href={`mailto:${site.ownerEmail}`} className="underline">
          {site.ownerEmail}
        </a>. We read every message.
      </p>
      <p className="mt-4 muted text-sm">
        For corrections to fees, delivery times, or provider information,
        please include a screenshot from the provider's app if you can — it
        speeds things up considerably.
      </p>
    </>
  );
}
