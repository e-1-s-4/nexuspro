"use client";

import { useRef } from "react";
import { motion, useInView, Variants, Easing } from "framer-motion";
import { Zap, Monitor, Rocket, Layers } from "lucide-react";

const SERVICES = [
  {
    title: "Brand Strategy",
    icon: Zap,
    description: "Defining the unique position and voice of your brand in the digital landscape.",
    number: "01",
  },
  {
    title: "UX/UI Design",
    icon: Monitor,
    description: "Creating immersive digital interfaces that prioritize usability and visual delight.",
    number: "02",
  },
  {
    title: "Web Development",
    icon: Rocket,
    description: "Building high-performance, accessible, and scalable digital products.",
    number: "03",
  },
  {
    title: "3D & Motion",
    icon: Layers,
    description: "Bringing brands to life through motion design and interactive 3D elements.",
    number: "04",
  },
];

const easeOut: Easing = [0.33, 1, 0.68, 1] as Easing;

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut },
  },
};

const serviceVariants: Variants = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: easeOut },
  },
};

export function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 md:py-40 bg-muted/5">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col gap-6 mb-16 md:mb-24 max-w-4xl"
        >
          <motion.span
            variants={headerVariants}
            className="text-xs uppercase tracking-[0.3em] text-accent font-bold"
          >
            What We Do
          </motion.span>
          <motion.h2
            variants={headerVariants}
            className="text-[clamp(3rem,7vw,6rem)] font-black uppercase italic tracking-tighter leading-none"
          >
            Digital <br />
            <span className="text-foreground/20 italic">Capabilities</span>
          </motion.h2>
          <motion.p
            variants={headerVariants}
            className="text-lg md:text-xl text-foreground/50 font-medium leading-relaxed max-w-2xl"
          >
            Nexus offers a full suite of digital innovation services. We partner with founders
            to architect, design, and develop industry-leading products.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-muted/20"
        >
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              variants={serviceVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4, ease: easeOut }}
              className="group relative bg-background p-8 md:p-10 hover:bg-accent/5 transition-all duration-500 cursor-pointer"
            >
              {/* Number */}
              <span className="absolute top-6 right-6 text-[10px] font-bold text-foreground/10 group-hover:text-accent/30 transition-colors tabular-nums">
                {service.number}
              </span>

              {/* Icon */}
              <motion.div
                className="w-14 h-14 rounded-full border border-muted group-hover:border-accent/40 flex items-center justify-center mb-8 transition-all duration-500 group-hover:bg-accent/5"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <service.icon className="w-6 h-6 text-accent group-hover:scale-110 transition-transform duration-500" />
              </motion.div>

              {/* Content */}
              <h3 className="text-lg font-bold uppercase italic tracking-tight mb-4 group-hover:text-accent transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-foreground/40 leading-relaxed group-hover:text-foreground/60 transition-colors">
                {service.description}
              </p>

              {/* Hover line */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent group-hover:w-full transition-all duration-700 ease-[0.33,1,0.68,1]" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
