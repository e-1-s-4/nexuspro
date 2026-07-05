import type { ScriptProps } from "next/script";
import Script from "next/script";

interface OrganizationJsonLdProps {
  url?: string;
  name?: string;
  logo?: string;
  sameAs?: string[];
  contactPoint?: {
    email?: string;
    phone?: string;
    contactType?: string;
    areaServed?: string;
  };
}

export function OrganizationJsonLd({
  url = "https://nexus-agency.com",
  name = "Nexus Digital Agency",
  logo = "https://nexus-agency.com/logo.png",
  sameAs = [
    "https://instagram.com/nexusagency",
    "https://twitter.com/nexusagency",
    "https://linkedin.com/company/nexusagency",
    "https://dribbble.com/nexusagency",
  ],
  contactPoint = {
    email: "hello@nexus-agency.com",
    phone: "+1 (555) 0123 4567",
    contactType: "sales",
    areaServed: "Worldwide",
  },
}: OrganizationJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    sameAs,
    contactPoint: {
      "@type": "ContactPoint",
      email: contactPoint.email,
      telephone: contactPoint.phone,
      contactType: contactPoint.contactType,
      areaServed: contactPoint.areaServed,
      availableLanguage: ["English"],
    },
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Brand Strategy",
          description:
            "Defining the unique position and voice of your brand in the digital landscape.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "UX/UI Design",
          description:
            "Creating immersive digital interfaces that prioritize usability and visual delight.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Web Development",
          description:
            "Building high-performance, accessible, and scalable digital products.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "3D & Motion Design",
          description:
            "Bringing brands to life through motion design and interactive 3D elements.",
        },
      },
    ],
  };

  return (
    <Script
      id="organization-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      strategy="afterInteractive"
    />
  );
}

interface WebSiteJsonLdProps {
  url?: string;
  name?: string;
  alternateName?: string;
  searchUrl?: string;
}

export function WebSiteJsonLd({
  url = "https://nexus-agency.com",
  name = "Nexus Digital Agency",
  alternateName = "Nexus",
}: WebSiteJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    alternateName,
    url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${url}/work?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Script
      id="website-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      strategy="afterInteractive"
    />
  );
}

interface BreadcrumbJsonLdProps {
  items: {
    position: number;
    name: string;
    item: string;
  }[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item) => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      item: item.item,
    })),
  };

  return (
    <Script
      id="breadcrumb-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      strategy="afterInteractive"
    />
  );
}

interface ArticleJsonLdProps {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  publisher?: string;
  url?: string;
}

export function ArticleJsonLd({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author = "Nexus Digital Agency",
  publisher = "Nexus Digital Agency",
  url,
}: ArticleJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: publisher,
      logo: {
        "@type": "ImageObject",
        url: "https://nexus-agency.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <Script
      id="article-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      strategy="afterInteractive"
    />
  );
}
