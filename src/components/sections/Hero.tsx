"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroScene } from "./HeroScene";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.8,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 120, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

const badgeVariants: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export function Hero() {
  const scrollToWork = () => {
    const workSection = document.getElementById("featured-work");
    if (workSection) {
      workSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen min-h-[700px] w-full flex items-center justify-center overflow-hidden bg-background">
      {/* 3D Particle Background */}
      <HeroScene />

      {/* Gradient overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 40%, rgba(10,10,10,0.6) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl"
        >
          {/* Badge */}
          <div className="mb-8 flex items-center gap-4">
            <motion.span
              variants={badgeVariants}
              className="inline-block px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] border border-accent/30 text-accent rounded-full bg-accent/5 font-medium"
            >
              Digital Innovation Agency
            </motion.span>
            <motion.div
              variants={{
                hidden: { width: 0, opacity: 0 },
                visible: { width: 48, opacity: 1 },
              }}
              className="h-px bg-accent/40"
            />
          </div>

          {/* Main Heading */}
          <h1 className="text-[clamp(3.5rem,12vw,10rem)] leading-[0.85] font-black italic uppercase tracking-tighter mb-8 md:mb-12">
            <motion.span variants={itemVariants} className="block">
              Architecting
            </motion.span>
            <motion.span variants={itemVariants} className="block shimmer-text">
              The Future
            </motion.span>
            <motion.span variants={itemVariants} className="block text-right">
              Of Digital.
            </motion.span>
          </h1>

          {/* Bottom Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">
            <motion.p
              variants={itemVariants}
              className="max-w-md text-base md:text-lg text-foreground/60 font-medium leading-relaxed"
            >
              Nexus is a high-end digital agency that creates immersive experiences,
              fusing cutting-edge technology with award-winning design.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <Button
                onClick={scrollToWork}
                className="rounded-full shadow-[0_0_30px_rgba(204,255,0,0.12)] group"
                showArrow
              >
                Explore Work
              </Button>
              <div className="hidden lg:flex flex-col gap-1 items-end">
                <span className="text-[10px] uppercase tracking-widest text-foreground/40">
                  Award-Winning
                </span>
                <span className="text-[10px] uppercase tracking-widest text-foreground/40">
                  Agency of the Year 2024
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/30">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-accent/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
