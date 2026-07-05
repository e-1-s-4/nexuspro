import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { PageTransition } from "@/components/layout/PageTransition";
import { Preloader } from "@/components/layout/Preloader";
import { Noise } from "@/components/ui/Noise";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nexus-agency.com"),
  title: "Nexus | High-End Digital Innovation Agency",
  description: "Award-winning digital agency specialized in futuristic, immersive experiences. We architect, design, and develop industry-leading digital products.",
  keywords: ["digital agency", "web design", "brand strategy", "UX/UI", "3D design", "motion design"],
  authors: [{ name: "Nexus Digital Agency" }],
  openGraph: {
    title: "Nexus | High-End Digital Innovation Agency",
    description: "Architecting the future of digital interaction.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased overflow-x-hidden bg-background text-foreground">
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[10002] focus:bg-accent focus:text-background focus:px-4 focus:py-2 focus:text-sm focus:uppercase focus:tracking-widest focus:font-bold"
        >
          Skip to main content
        </a>

        <Preloader />
        <Noise opacity={0.035} />
        <CustomCursor />
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <SmoothScroll>
          <div id="main-content" className="flex flex-col min-h-screen">
            <PageTransition>
              {children}
            </PageTransition>
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
