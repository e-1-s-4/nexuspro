"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    id: "01",
    title: "NeuroSphere",
    category: "AI / Product Design",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1200&auto=format&fit=crop",
    slug: "neurosphere",
  },
  {
    id: "02",
    title: "Aura Labs",
    category: "Branding / Web Design",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    slug: "aura-labs",
  },
  {
    id: "03",
    title: "Vortex Motion",
    category: "Motion / 3D Design",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
    slug: "vortex-motion",
  },
  {
    id: "04",
    title: "Zephyr Cloud",
    category: "SaaS / Interface Design",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    slug: "zephyr-cloud",
  },
  {
    id: "05",
    title: "Pulse Analytics",
    category: "Dashboard / Data Viz",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    slug: "pulse-analytics",
  },
];

export function HorizontalWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: containerRef });
  const scaleX = useSpring(scrollXProgress, { stiffness: 100, damping: 30 });

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 md:px-12 mb-12">
        <span className="text-xs uppercase tracking-[0.3em] text-accent font-bold">Selected Projects</span>
        <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mt-4">
          Featured <span className="text-muted-foreground opacity-30 italic">Work</span>
        </h2>
      </div>

      <div className="relative">
        <div
          ref={containerRef}
          className="flex gap-8 md:gap-12 overflow-x-auto px-6 md:px-12 pb-8 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {PROJECTS.map((project) => (
            <Link
              key={project.id}
              href={`/work/${project.slug}`}
              className="group flex-shrink-0 w-[80vw] md:w-[40vw] lg:w-[30vw] snap-start"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-muted mb-6">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 80vw, 40vw"
                  className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <span className="text-xs uppercase tracking-widest text-accent font-bold">
                    {project.category}
                  </span>
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5 text-background" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold uppercase italic tracking-tighter group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <span className="text-xs font-bold opacity-20">{project.id}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Scroll progress bar */}
        <div className="container mx-auto px-6 md:px-12 mt-6">
          <div className="h-[2px] bg-muted w-full overflow-hidden">
            <motion.div
              className="h-full bg-accent origin-left"
              style={{ scaleX }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
