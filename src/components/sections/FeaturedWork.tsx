"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "@/components/ui/Magnetic";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

const PROJECTS = [
  {
    id: "01",
    title: "NeuroSphere",
    category: "AI / Product Design",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1200&auto=format&fit=crop",
    year: "2024",
    slug: "neurosphere",
  },
  {
    id: "02",
    title: "Aura Labs",
    category: "Branding / Web Design",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    year: "2023",
    slug: "aura-labs",
  },
  {
    id: "03",
    title: "Vortex Motion",
    category: "Motion / 3D Design",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
    year: "2023",
    slug: "vortex-motion",
  },
  {
    id: "04",
    title: "Zephyr Cloud",
    category: "SaaS / Interface Design",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    year: "2024",
    slug: "zephyr-cloud",
  },
];

export function FeaturedWork() {
  return (
    <section id="featured-work" className="py-24 md:py-40 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
          <div className="flex flex-col gap-4">
            <span className="text-xs uppercase tracking-[0.3em] text-accent font-bold">
              Case Studies
            </span>
            <h2 className="text-[clamp(3rem,7vw,6rem)] font-black uppercase italic tracking-tighter leading-none">
              Featured <br />
              <span className="text-foreground/20 italic">Creation</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm text-foreground/50 uppercase tracking-widest leading-relaxed">
            We focus on digital products that push the boundaries of what is possible on the web.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-16 md:gap-y-24">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                delay: i % 2 === 0 ? 0 : 0.15,
                duration: 0.9,
                ease: [0.33, 1, 0.68, 1],
              }}
              className="group cursor-pointer"
            >
              <Link href={`/work/${project.slug}`}>
                <div className="relative overflow-hidden bg-muted mb-6">
                  <ParallaxImage
                    src={project.image}
                    alt={project.title}
                    aspectRatio="aspect-[4/5]"
                    className="grayscale group-hover:grayscale-0 transition-all duration-700"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Project number badge */}
                  <div className="absolute top-4 left-4 w-10 h-10 bg-background/30 backdrop-blur-sm rounded-full flex items-center justify-center text-[10px] font-bold border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
                    {project.id}
                  </div>

                  {/* Arrow badge */}
                  <div className="absolute bottom-4 right-4 w-12 h-12 bg-accent text-background rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                <div className="flex items-start justify-between border-b border-muted/50 pb-4 group-hover:border-accent/30 transition-colors">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold uppercase italic tracking-tighter mb-1.5 transition-colors group-hover:text-accent">
                      {project.title}
                    </h3>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-medium">
                      {project.category}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-foreground/20 mt-2 tabular-nums">
                    {project.year}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-24 md:mt-36 flex justify-center">
          <Magnetic>
            <Link
              href="/work"
              className="group relative h-36 w-36 md:h-40 md:w-40 rounded-full border border-muted hover:border-accent flex items-center justify-center transition-all duration-500 overflow-hidden"
            >
              <span className="relative z-10 uppercase text-[10px] tracking-[0.2em] font-black transition-colors duration-500 group-hover:text-background">
                View All
              </span>
              <div className="absolute inset-0 bg-accent rounded-full translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.33,1,0.68,1]" />
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
