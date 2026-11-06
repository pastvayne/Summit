import type { MetadataRoute } from "next";
import { site } from "@/lib/protocol";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/strategy`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/treasury`, changeFrequency: "daily", priority: 0.8 },
  ];
}
