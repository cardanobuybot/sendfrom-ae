import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { site } from "@/config/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsentBanner from "@/components/ConsentBanner";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name + " — " + site.tagline, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: {
    siteName: site.name,
    title: site.tagline,
    description: site.description,
    url: site.url,
    type: "website",
  },
  twitter: { card: "summary_large_image", title: site.tagline, description: site.description },
  alternates: { canonical: site.url },
  robots: { index: true, follow: true },
  // Google Search Console placeholder — replace once you claim the site
  verification: site.googleSiteVerification
    ? { google: site.googleSiteVerification }
    : undefined,
};

export const viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          // Read theme early to avoid flash. No cookies — reads a preference key only.
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('sf.theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark');}catch(e){}`,
          }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-black focus:text-white focus:px-3 focus:py-2 focus:rounded"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="mx-auto max-w-3xl px-4 pb-24 pt-4">
          {children}
        </main>
        <Footer />
        <ConsentBanner />
        <Analytics />
      </body>
    </html>
  );
}
