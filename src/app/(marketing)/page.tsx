import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { ScrollNeonAnimation } from "@/components/sections/ScrollNeonAnimation";
import { DraggableWork } from "@/components/sections/DraggableWork";
import { Testimonials } from "@/components/sections/Testimonials";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { Services } from "@/components/sections/Services";
import { CTASection } from "@/components/sections/CTASection";
import { Marquee } from "@/components/ui/Marquee";

export const metadata: Metadata = {
  title: "Nexus | High-End Digital Innovation Agency",
  description: "Award-winning digital agency specialized in futuristic, immersive experiences. We architect, design, and develop industry-leading digital products for forward-thinking brands.",
  keywords: ["digital agency", "web design", "brand strategy", "UX/UI", "3D design", "motion design", "immersive experiences"],
  authors: [{ name: "Nexus Digital Agency" }],
  openGraph: {
    title: "Nexus | High-End Digital Innovation Agency",
    description: "Award-winning digital agency specialized in futuristic, immersive experiences.",
    type: "website",
    url: "https://nexus-agency.com",
    locale: "en_US",
    images: [
      {
        url: "/api/og?page=default",
        width: 1200,
        height: 630,
        alt: "Nexus Digital Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Nexus | High-End Digital Innovation Agency",
    description: "Award-winning digital agency specialized in futuristic, immersive experiences.",
    images: ["/api/og?page=default"],
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Marquee divider */}
      <div className="py-12 md:py-16 bg-background overflow-hidden">
        <Marquee
          texts={["Strategy", "Design", "Development", "Motion", "3D", "Branding"]}
          speed={40}
        />
      </div>

      <Stats />

      {/* Scroll-controlled neon animation */}
      <ScrollNeonAnimation />

      <DraggableWork />
      <Testimonials />

      {/* Process Timeline */}
      <ProcessTimeline />

      {/* Second marquee */}
      <div className="py-12 md:py-16 bg-background overflow-hidden border-y border-muted/30">
        <Marquee
          texts={["Innovation", "Excellence", "Craft", "Precision", "Vision"]}
          speed={35}
          direction="right"
        />
      </div>

      <Services />
      <CTASection />
    </>
  );
}
