"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView, Easing } from "framer-motion";
import { Search, Lightbulb, PenTool, Code, Rocket } from "lucide-react";

const PROCESS_STAGES = [
  {
    number: "01",
    title: "Discovery",
    icon: Search,
    description: "We immerse ourselves in your world—understanding your users, your market, and your vision. Through research workshops and audits, we uncover the opportunities that will define your product.",
    duration: "2-3 weeks",
  },
  {
    number: "02",
    title: "Strategy",
    icon: Lightbulb,
    description: "We translate insights into a clear roadmap. Defining the product vision, information architecture, and technical approach that will guide every decision ahead.",
    duration: "1-2 weeks",
  },
  {
    number: "03",
    title: "Design",
    icon: PenTool,
    description: "From wireframes to high-fidelity prototypes, we craft every pixel with purpose. Our design process is iterative, collaborative, and obsessed with the details that create emotional connections.",
    duration: "3-5 weeks",
  },
  {
    number: "04",
    title: "Develop",
    icon: Code,
    description: "We bring designs to life with clean, performant code. Built on modern frameworks with accessibility, performance, and scalability baked in from day one.",
    duration: "4-8 weeks",
  },
  {
    number: "05",
    title: "Launch",
    icon: Rocket,
    description: "Rigorous testing, optimization, and a smooth deployment. But we don't disappear post-launch—we provide ongoing support and iteration to ensure your product continues to evolve.",
    duration: "1-2 weeks",
  },
];

const easeOut: Easing = [0.33, 1, 0.68, 1] as Easing;

export function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Progress bar fill
  const progressBarWidth = useTransform(scrollYProgress, [0, 0.3, 0.9, 1], [0, 0, 1, 1]);

  return (
    <section className="py-24 md:py-40 bg-background overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={isHeaderInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: easeOut },
            },
          }}
          className="flex flex-col gap-4 mb-16 md:mb-24 max-w-3xl"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-accent font-bold">
            How We Work
          </span>
          <h2 className="text-[clamp(3rem,7vw,6rem)] font-black uppercase italic tracking-tighter leading-none">
            Our <span className="text-foreground/20 italic">Process</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/50 font-medium leading-relaxed">
            A proven methodology that turns complex challenges into exceptional digital products.
            Every engagement follows this playbook—adapted to your unique needs.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-muted/50 -translate-x-1/2 hidden md:block" />
          <motion.div
            className="absolute left-8 md:left-1/2 top-0 w-px bg-accent -translate-x-1/2 hidden md:block origin-top"
            style={{ scaleY: progressBarWidth }}
          />

          {/* Stages */}
          <div className="flex flex-col gap-16 md:gap-24">
            {PROCESS_STAGES.map((stage, i) => (
              <ProcessStage key={stage.number} stage={stage} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStage({
  stage,
  index,
}: {
  stage: (typeof PROCESS_STAGES)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, ease: easeOut, delay: 0.1 }}
      className={`relative flex flex-col md:flex-row gap-8 md:gap-16 ${
        !isEven ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Center dot */}
      <div className="absolute left-8 md:left-1/2 top-8 -translate-x-1/2 z-10 hidden md:flex">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
          className="w-4 h-4 rounded-full bg-accent ring-4 ring-background"
        />
      </div>

      {/* Content */}
      <div className={`flex-1 md:pl-16 ${!isEven ? "md:pl-0 md:pr-16 md:text-right" : ""}`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.2 }}
          className="group p-8 md:p-10 rounded-xl border border-muted/30 bg-muted/5 hover:border-accent/20 transition-all duration-500"
          whileHover={{ y: -4 }}
        >
          {/* Stage number & icon */}
          <div className={`flex items-center gap-4 mb-6 ${!isEven ? "md:flex-row-reverse" : ""}`}>
            <div className="flex items-center justify-center w-14 h-14 rounded-full border border-muted/50 group-hover:border-accent/40 group-hover:bg-accent/5 transition-all duration-500">
              <stage.icon className="w-6 h-6 text-accent group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-foreground/20 tabular-nums">
                {stage.number}
              </span>
              <h3 className="text-2xl font-bold uppercase italic tracking-tighter group-hover:text-accent transition-colors">
                {stage.title}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-foreground/40 leading-relaxed mb-4 group-hover:text-foreground/60 transition-colors">
            {stage.description}
          </p>

          {/* Duration */}
          <span className="inline-block px-3 py-1 rounded-full bg-accent/5 text-[10px] uppercase tracking-widest font-bold text-accent/60">
            {stage.duration}
          </span>
        </motion.div>
      </div>

      {/* Spacer for opposite side */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
}
