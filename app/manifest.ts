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
  };
}
