import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About Nexus | The Intersection of Art & Code",
  description: "We are a team of visionary designers and engineering purists. Discover our story, values, and the minds behind the award-winning work.",
  openGraph: {
    title: "About Us | Nexus Digital Agency",
    description: "Discover our story, values, and the team behind the award-winning work.",
    type: "website",
    url: "https://nexus-agency.com/about",
    images: [
      {
        url: "/api/og?page=about",
        width: 1200,
        height: 630,
        alt: "Nexus — About Us",
      },
    ],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "About Us | Nexus Digital Agency",
    description: "Discover our story, values, and the team behind the award-winning work.",
    images: ["/api/og?page=about"],
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
