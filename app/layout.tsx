import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, Sora } from "next/font/google";
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

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plex-mono",
  weight: ["400", "500"],
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
    <html lang="en" className={`${sora.variable} ${fraunces.variable} ${frauncesItalic.variable} ${plexMono.variable} h-full antialiased`}>
      <head>
        <link
          rel="preload"
          as="image"
          type="image/webp"
          imageSrcSet="/summit/peak-wide-960.webp 960w, /summit/peak-wide-1600.webp 1600w, /summit/peak-wide-2560.webp 2560w"
          imageSizes="(min-aspect-ratio: 16/9) 100vw, 177.8vh"
          media="(min-width: 768px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          type="image/webp"
          imageSrcSet="/summit/peak-tall-780.webp 780w, /summit/peak-tall-1170.webp 1170w"
          imageSizes="(max-aspect-ratio: 9/16) 56.25vh, 100vw"
          media="(max-width: 767px)"
          fetchPriority="high"
        />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
