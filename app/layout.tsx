import type { Metadata, Viewport } from "next";
import { Fraunces, Sora } from "next/font/google";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { brand } from "@/lib/brand";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
  weight: ["300", "400", "500", "600"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
});

const frauncesItalic = Fraunces({
  subsets: ["latin"],
  display: "swap",
  style: "italic",
  variable: "--font-fraunces-italic",
  axes: ["SOFT", "WONK", "opsz"],
});

const description =
  "Designed to turn trading fees into SUMMIT buybacks and KNTQ distributions for eligible holders.";

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: "SUMMIT — Beyond the Horizon.",
    template: "%s · SUMMIT",
  },
  description,
  applicationName: "SUMMIT",
  keywords: ["Summit", "Ascend", "horizon"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: brand.url,
    title: "SUMMIT — Beyond the Horizon.",
    description,
    siteName: "SUMMIT",
  },
  twitter: {
    card: "summary_large_image",
    title: "SUMMIT — Beyond the Horizon.",
    description,
  },
  appleWebApp: {
    capable: true,
    title: "SUMMIT",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0B0C13" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0C13" },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SUMMIT",
    url: brand.url,
    description,
  };

  return (
    <html lang="en" className={`${sora.variable} ${fraunces.variable} ${frauncesItalic.variable} h-full antialiased`}>
      <head>
        <link rel="preload" as="image" href="/summit/hero.jpg" media="(min-width: 768px)" />
        <link rel="preload" as="image" href="/summit/hero-mobile.jpg" media="(max-width: 767px)" />
      </head>
      <body className="min-h-full bg-obsidian text-ivory">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-ivory focus:px-3 focus:py-2 focus:text-obsidian">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
