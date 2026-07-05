import type { Metadata } from "next";
import WorkPageClient from "./WorkPageClient";

export const metadata: Metadata = {
  title: "Selected Work | Case Studies — Nexus Digital Agency",
  description: "Explore our portfolio of award-winning digital products. From AI platforms to brand identities, see how we architect the future of digital.",
  openGraph: {
    title: "Our Work | Nexus Digital Agency",
    description: "Explore our portfolio of award-winning digital products.",
    type: "website",
    url: "https://nexus-agency.com/work",
    images: [
      {
        url: "/api/og?page=work",
        width: 1200,
        height: 630,
        alt: "Nexus — Selected Work",
      },
    ],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Selected Work | Nexus Digital Agency",
    description: "Explore our portfolio of award-winning digital products.",
    images: ["/api/og?page=work"],
  },
};

export default function WorkPage() {
  return <WorkPageClient />;
}
