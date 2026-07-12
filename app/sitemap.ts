import type { MetadataRoute } from "next";

const siteUrl = "https://drorbrook.com";

// Single-page site - one canonical URL. Sections are in-page tabs (#blogs, #talks, …).
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
