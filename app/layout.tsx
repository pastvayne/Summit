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
  "SUMMIT is an independent project exploring new possibilities within the Ascend ecosystem. Beyond the Horizon.";

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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icons/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
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
