import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SUMMIT",
    short_name: "SUMMIT",
    description: "Beyond the Horizon.",
    start_url: "/",
    display: "standalone",
    background_color: "#0B0C13",
    theme_color: "#0B0C13",
    icons: [
      { src: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { src: "/icons/favicon-48.png", sizes: "48x48", type: "image/png" },
      { src: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
