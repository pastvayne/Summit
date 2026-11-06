import type { MetadataRoute } from "next";
import { brand } from "@/lib/brand";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: brand.url, changeFrequency: "weekly", priority: 1 },
    { url: `${brand.url}/ascent`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${brand.url}/record`, changeFrequency: "monthly", priority: 0.6 },
  ];
}
