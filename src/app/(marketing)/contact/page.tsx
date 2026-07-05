import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Nexus | Start Your Project Today",
  description: "Ready to elevate your digital presence? Get in touch with our team to discuss your vision and explore how we can bring it to life.",
  openGraph: {
    title: "Contact Us | Nexus Digital Agency",
    description: "Ready to elevate your digital presence? Let's create something extraordinary.",
    type: "website",
    url: "https://nexus-agency.com/contact",
    images: [
      {
        url: "/api/og?page=contact",
        width: 1200,
        height: 630,
        alt: "Nexus — Contact Us",
      },
    ],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Contact Us | Nexus Digital Agency",
    description: "Ready to elevate your digital presence? Let's talk.",
    images: ["/api/og?page=contact"],
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
