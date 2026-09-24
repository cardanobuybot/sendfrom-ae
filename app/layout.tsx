import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { site } from "@/config/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsentBanner from "@/components/ConsentBanner";
import ClarityLoader from "@/components/ClarityLoader";
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
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.tagline,
    description: site.description,
    images: ["/og.png"],
  },
  icons: {
    // Modern browsers pick SVG first — crisp at every zoom, then fall
    // back to ICO for older ones. apple-touch-icon = iOS home-screen.
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
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
        {/* Impact affiliate network site-verification.
            MUST use attribute "value" (not "content") — Next.js Metadata API
            would emit "content=", which Impact rejects, so we render raw. */}
        <meta name="impact-site-verification" {...({ value: "f325391d-3f95-4347-9ecd-b1b0701a63cc" } as { value: string })} />
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
        <ClarityLoader />
        <Analytics />
      </body>
    </html>
  );
}
