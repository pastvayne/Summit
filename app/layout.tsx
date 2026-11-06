import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import { Footer } from "@/components/footer";
import { MotionProvider } from "@/components/motion-provider";
import { Nav } from "@/components/nav";
import { site } from "@/lib/protocol";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "PaperMill is a Solana-native treasury strategy built around the Papertrade ecosystem.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "PaperMill — The Mill Never Stops",
    template: "%s · PaperMill",
  },
  description,
  applicationName: "PaperMill",
  keywords: ["PaperMill", "MILL", "Solana", "Papertrade", "treasury"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    title: "PaperMill — The Mill Never Stops",
    description,
    siteName: "PaperMill",
  },
  twitter: {
    card: "summary_large_image",
    title: "PaperMill — The Mill Never Stops",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#f4ecd8",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PaperMill",
    url: site.url,
    description,
  };

  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-cream text-paper">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <MotionProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-paper focus:px-3 focus:py-2 focus:text-ink"
          >
            Skip to content
          </a>
          <Nav />
          <main id="main" className="pt-16">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
