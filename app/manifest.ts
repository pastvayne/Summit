import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PaperMill",
    short_name: "PaperMill",
    description:
      "A Solana-native treasury strategy built around the Papertrade ecosystem.",
    start_url: "/",
    display: "standalone",
    background_color: "#0c0b09",
    theme_color: "#0c0b09",
  };
}
