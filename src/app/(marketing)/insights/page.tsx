import type { Metadata } from "next";
import { getAllPosts, getAllCategories } from "@/lib/posts";
import InsightsPageClient from "./InsightsPageClient";

export const metadata: Metadata = {
  title: "Insights | Design, Engineering & Strategy — Nexus",
  description: "Thoughts on design, engineering, and strategy from the Nexus team. Exploring the intersection of art and code.",
  openGraph: {
    title: "Insights | Nexus Digital Agency",
    description: "Thoughts on design, engineering, and strategy from the Nexus team.",
    type: "website",
    url: "https://nexus-agency.com/insights",
    images: [
      {
        url: "/api/og?page=insights",
        width: 1200,
        height: 630,
        alt: "Nexus — Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Insights | Nexus Digital Agency",
    description: "Thoughts on design, engineering, and strategy from the Nexus team.",
    images: ["/api/og?page=insights"],
  },
};

export default function InsightsPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const featuredPosts = posts.filter((p) => p.featured);
  const regularPosts = posts.filter((p) => !p.featured);

  return (
    <InsightsPageClient
      posts={posts}
      categories={categories}
      featuredPosts={featuredPosts}
      regularPosts={regularPosts}
    />
  );
}
