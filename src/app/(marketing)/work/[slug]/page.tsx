import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

interface Project {
  slug: string;
  title: string;
  category: string;
  client: string;
  year: string;
  heroImage: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  galleryImages: string[];
}

const PROJECTS: Record<string, Project> = {
  neurosphere: {
    slug: "neurosphere",
    title: "NeuroSphere",
    category: "AI / Product Design",
    client: "NeuroSphere Inc.",
    year: "2024",
    heroImage: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2000&auto=format&fit=crop",
    description: "A next-generation AI platform that redefines how enterprises interact with machine learning models.",
    challenge: "NeuroSphere needed a digital presence that reflected their cutting-edge technology. Their existing platform felt dated and failed to communicate the sophistication of their AI engine to enterprise buyers.",
    solution: "We designed and developed an immersive experience that visualizes AI processes in real-time. The interface uses WebGL data visualizations, smooth micro-interactions, and a design language that bridges the gap between complex technology and intuitive usability.",
    results: [
      "340% increase in demo requests",
      "45% improvement in time-on-site",
      "Featured in Awwwards SOTD nominations",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1676299081847-824916de030a?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  "aura-labs": {
    slug: "aura-labs",
    title: "Aura Labs",
    category: "Branding / Web Design",
    client: "Aura Labs",
    year: "2023",
    heroImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop",
    description: "Complete brand identity and website redesign for an innovative biotech startup.",
    challenge: "Aura Labs had just secured Series B funding and needed a brand and website that could compete with established players. Their visual identity felt generic and didn't convey the scientific rigor behind their research.",
    solution: "We crafted a brand system rooted in geometric precision—mirroring their molecular research—and built a website that tells their scientific story through editorial typography, generous whitespace, and subtle motion design.",
    results: [
      "Brand recognition increased 280%",
      "Successfully attracted $45M in Series C",
      "Won 3 design industry awards",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3579?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618556450994-a6a1529e6790?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  "vortex-motion": {
    slug: "vortex-motion",
    title: "Vortex Motion",
    category: "Motion / 3D Design",
    client: "Vortex Motion Studios",
    year: "2023",
    heroImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop",
    description: "An immersive 3D web experience for a motion design studio pushing creative boundaries.",
    challenge: "Vortex Motion needed a website that was itself a showcase of their capabilities. Static pages wouldn't cut it—they needed an experience that demonstrated their mastery of motion and 3D design.",
    solution: "We built a WebGL-powered portfolio where every scroll triggers a new visual narrative. 3D models morph, particle systems react to cursor movement, and transitions feel like cinematic scene changes.",
    results: [
      "12 industry award nominations",
      "Featured on Awwwards, FWA, and CSS Design Awards",
      "600% increase in inbound project inquiries",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1614851099511-773084f6911d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  "zephyr-cloud": {
    slug: "zephyr-cloud",
    title: "Zephyr Cloud",
    category: "SaaS / Interface Design",
    client: "Zephyr Technologies",
    year: "2024",
    heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop",
    description: "Design system and product interface for a cloud infrastructure platform serving millions.",
    challenge: "Zephyr Cloud's dashboard was powerful but overwhelming. Users struggled with information density and inconsistent patterns across modules.",
    solution: "We designed a comprehensive design system with 200+ components, rebuilt the dashboard with progressive disclosure patterns, and created a visual hierarchy that makes complex data feel simple and actionable.",
    results: [
      "78% reduction in support tickets",
      "4.8/5 user satisfaction score",
      "Adopted across 15 product modules",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  "pulse-analytics": {
    slug: "pulse-analytics",
    title: "Pulse Analytics",
    category: "Dashboard / Data Viz",
    client: "Pulse Analytics Corp.",
    year: "2024",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
    description: "Real-time analytics dashboard that transforms complex data into actionable insights.",
    challenge: "Pulse Analytics needed a dashboard that could handle millions of data points while remaining performant and visually clear.",
    solution: "We built custom D3-based chart components with WebGL rendering for large datasets, designed an intuitive filtering system, and created a dark-mode-first interface that reduces eye strain during extended analysis sessions.",
    results: [
      "Processing 10M+ events per second",
      "Sub-100ms query response times",
      "Adopted by 50+ enterprise clients in Q1",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  "flux-studio": {
    slug: "flux-studio",
    title: "Flux Studio",
    category: "Branding / Motion",
    client: "Flux Creative Studio",
    year: "2023",
    heroImage: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=2000&auto=format&fit=crop",
    description: "Dynamic brand identity and portfolio site for a creative studio at the intersection of art and technology.",
    challenge: "Flux Studio needed a website that served as both portfolio and brand statement—something that would immediately communicate their creative philosophy.",
    solution: "We designed a minimalist canvas that lets their work speak for itself, with dramatic full-screen transitions, a custom cursor, and an editorial approach to typography and spacing.",
    results: [
      "Featured on Awwwards Site of the Day",
      "200% increase in inbound inquiries",
      "Press coverage in Design Week and It's Nice That",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1200&auto=format&fit=crop",
    ],
  },
};

function getAdjacentProjects(currentSlug: string) {
  const slugs = Object.keys(PROJECTS);
  const currentIndex = slugs.indexOf(currentSlug);
  return {
    prev: currentIndex > 0 ? PROJECTS[slugs[currentIndex - 1]] : null,
    next: currentIndex < slugs.length - 1 ? PROJECTS[slugs[currentIndex + 1]] : null,
  };
}

export async function generateStaticParams() {
  return Object.keys(PROJECTS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = PROJECTS[params.slug];
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | ${project.category} — Nexus`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Nexus Digital Agency`,
      description: project.description,
      images: [
        {
          url: project.heroImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      type: "article",
    },
  };
}

export default function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = PROJECTS[params.slug];
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(params.slug);

  return (
    <article className="bg-background">
      <BreadcrumbJsonLd
        items={[
          { position: 1, name: "Home", item: "https://nexus-agency.com/" },
          { position: 2, name: "Work", item: "https://nexus-agency.com/work" },
          { position: 3, name: project.title, item: `https://nexus-agency.com/work/${project.slug}` },
        ]}
      />
      <ArticleJsonLd
        headline={project.title}
        description={project.description}
        image={project.heroImage}
        datePublished={`01-01-${project.year}`}
        url={`https://nexus-agency.com/work/${project.slug}`}
      />
      {/* Hero */}
      <section className="pt-40 md:pt-52 pb-16 md:pb-24">
        <div className="container mx-auto px-6 md:px-12">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm text-foreground/40 hover:text-accent transition-colors mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to All Work
          </Link>

          <span className="text-xs uppercase tracking-[0.3em] text-accent font-bold mb-6 block">
            {project.category}
          </span>
          <h1 className="text-[clamp(3rem,8vw,7rem)] font-black uppercase italic tracking-tighter leading-none mb-8">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-foreground/50 max-w-3xl leading-relaxed">
            {project.description}
          </p>
        </div>
      </section>

      {/* Hero Image */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="relative aspect-[21/9] overflow-hidden bg-muted">
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Project Brief */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 py-12 border-y border-muted/30">
            {[
              { label: "Client", value: project.client },
              { label: "Category", value: project.category },
              { label: "Year", value: project.year },
              { label: "Results", value: `${project.results.length} Key Metrics` },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/30 font-bold mb-2">
                  {item.label}
                </p>
                <p className="text-lg font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/30 font-bold mb-6 block">
                The Challenge
              </span>
              <p className="text-lg md:text-xl text-foreground/50 leading-relaxed">
                {project.challenge}
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/30 font-bold mb-6 block">
                Our Approach
              </span>
              <p className="text-lg md:text-xl text-foreground/50 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 md:py-24 bg-muted/5">
        <div className="container mx-auto px-6 md:px-12">
          <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-bold mb-10 block">
            Results
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {project.results.map((result, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-2 h-2 bg-accent rounded-full mt-3 flex-shrink-0" />
                <p className="text-xl md:text-2xl font-medium text-foreground/70 leading-relaxed">
                  {result}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12">
          <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/30 font-bold mb-10 block">
            Gallery
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {project.galleryImages.map((img, i) => (
              <div
                key={i}
                className={`relative bg-muted overflow-hidden ${
                  i === 0 ? "md:col-span-2 md:row-span-2 aspect-[16/10] md:aspect-auto" : "aspect-square"
                }`}
              >
                <Image
                  src={img}
                  alt={`${project.title} - Image ${i + 1}`}
                  fill
                  sizes={i === 0 ? "66vw" : "33vw"}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16 md:py-24 border-t border-muted/30">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {prev && (
              <Link
                href={`/work/${prev.slug}`}
                className="group p-8 border border-muted hover:border-accent/30 transition-colors rounded-lg"
              >
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-foreground/30 mb-4">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Previous Project
                </div>
                <h3 className="text-2xl font-bold uppercase italic tracking-tighter group-hover:text-accent transition-colors">
                  {prev.title}
                </h3>
                <p className="text-xs uppercase tracking-widest text-foreground/30 mt-2">
                  {prev.category}
                </p>
              </Link>
            )}
            {next && (
              <Link
                href={`/work/${next.slug}`}
                className="group p-8 border border-muted hover:border-accent/30 transition-colors rounded-lg text-right"
              >
                <div className="flex items-center justify-end gap-2 text-xs uppercase tracking-widest text-foreground/30 mb-4">
                  Next Project
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="text-2xl font-bold uppercase italic tracking-tighter group-hover:text-accent transition-colors">
                  {next.title}
                </h3>
                <p className="text-xs uppercase tracking-widest text-foreground/30 mt-2">
                  {next.category}
                </p>
              </Link>
            )}
          </div>
        </div>
      </section>
    </article>
  );
}
