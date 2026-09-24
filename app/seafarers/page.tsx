import type { Metadata } from "next";
import Link from "next/link";
import FAQ from "@/components/FAQ";
import DataDisclaimer from "@/components/DataDisclaimer";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Money guide for seafarers",
  description: "Allotment basics, cards to use abroad, and how to send money from a UAE port — for merchant-navy crew.",
  alternates: { canonical: `${site.url}/seafarers` },
};

const seafarerFaq = [
  {
    q: "What is an allotment?",
    a: "An allotment is a standing instruction on your seafarer employment contract that automatically pays a portion of your monthly wage to a nominated bank account back home. It usually costs nothing and is set up through your manning agent or employer.",
  },
  {
    q: "Do I still need a remittance app if I have an allotment?",
    a: "Often yes. Allotments are great for the fixed monthly household budget, but they are slow and inflexible. Remittance apps are for the rest — top-ups, gifts, emergencies, or when you get off in port.",
  },
  {
    q: "What card should I take on board?",
    a: "A no-FX-fee debit card that accepts online top-ups from a phone. This lets your family top up when needed and lets you draw cash in port at reasonable ATM rates. Wise multi-currency, Revolut (from your home country if applicable) and some local UAE banks issue suitable cards.",
  },
];

export default function Page() {
  return (
    <>
      <h1 className="text-3xl font-bold">Money guide for seafarers</h1>
      <p className="muted mt-2">
        A short, practical guide to moving money while at sea and in UAE ports.
      </p>

      <h2 className="text-2xl font-bold mt-8">Allotment basics</h2>
      <p className="mt-2 leading-relaxed">
        Your employer's allotment sends a fixed monthly amount from your wage
        directly to a nominated bank account at home. Set it high enough to
        cover the essentials your family relies on — rent, school fees, loans —
        and keep the rest for on-hand needs.
      </p>

      <h2 className="text-2xl font-bold mt-8">Cards to use abroad</h2>
      <ul className="list-disc pl-5 mt-2 space-y-1">
        <li>A card with low or no foreign-transaction fees.</li>
        <li>The ability for family to top it up online (multi-currency wallets are ideal).</li>
        <li>Contactless + chip + PIN (some ports still prefer chip + PIN).</li>
        <li>App-based freezing / unfreezing — safer if the card gets left in a taxi.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8">Sending money from a UAE port</h2>
      <p className="mt-2 leading-relaxed">
        You have a narrow window on shore leave — pick a provider that works
        from your phone:
      </p>
      <ul className="list-disc pl-5 mt-2 space-y-1">
        <li>
          <Link href="/wise" className="underline">Wise</Link> — best if your family has a bank account and speed can wait a few hours.
        </li>
        <li>
          <Link href="/remitly" className="underline">Remitly</Link> — best if you need it in minutes or your family uses GCash / Maya.
        </li>
        <li>
          <Link href="/al-ansari" className="underline">Al Ansari</Link> or <Link href="/lulu-exchange" className="underline">LuLu</Link> — walk in with your Emirates ID and cash.
        </li>
      </ul>

      <div className="mt-8 flex gap-2 flex-wrap">
        <Link href="/compare" className="btn btn-primary">Compare all providers</Link>
      </div>

      <FAQ items={seafarerFaq} />
      <DataDisclaimer />
    </>
  );
}
