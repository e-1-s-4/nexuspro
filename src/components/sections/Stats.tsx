"use client";

import { useRef } from "react";
import { motion, useInView, Variants, Easing } from "framer-motion";
import { Counter } from "@/components/ui/Counter";

const STATS = [
  { value: 150, suffix: "+", label: "Projects Delivered" },
  { value: 40, suffix: "+", label: "Global Clients" },
  { value: 12, suffix: "", label: "Industry Awards" },
  { value: 98, suffix: "%", label: "Client Retention" },
];

const easeOut: Easing = [0.33, 1, 0.68, 1] as Easing;

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: easeOut },
  },
};

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-muted/10 border-y border-muted/30">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              custom={i}
              className="text-center group"
            >
              <div className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-accent mb-3 transition-transform duration-500 group-hover:scale-105">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
