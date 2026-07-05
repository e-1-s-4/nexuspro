import { MetadataRoute } from "next";

const BASE_URL = "https://nexus-agency.com";

// Static pages
const staticPages = ["/", "/work", "/about", "/contact"];

// Case study slugs (must match the PROJECTS data)
const caseStudySlugs = [
  "neurosphere",
  "aura-labs",
  "vortex-motion",
  "zephyr-cloud",
  "pulse-analytics",
  "flux-studio",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudyUrls = caseStudySlugs.map(
    (slug) =>
      ({
        url: `${BASE_URL}/work/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      }) as MetadataRoute.Sitemap[number]
  );

  const staticUrls = staticPages.map(
    (page) =>
      ({
        url: `${BASE_URL}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "/" ? "daily" : "weekly",
        priority: page === "/" ? 1.0 : 0.9,
      }) as MetadataRoute.Sitemap[number]
  );

  return [...staticUrls, ...caseStudyUrls];
}
