"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextSplitProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  splitBy?: "characters" | "words";
}

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
  }),
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.03, staggerDirection: -1 },
  },
};

const childVariants: Variants = {
  hidden: {
    y: "100%",
    opacity: 0,
    skewY: 8,
    transition: { type: "spring", damping: 30, stiffness: 200 },
  },
  visible: {
    y: 0,
    opacity: 1,
    skewY: 0,
    transition: { type: "spring", damping: 30, stiffness: 200 },
  },
  exit: {
    y: "-100%",
    opacity: 0,
    skewY: -8,
    transition: { duration: 0.3 },
  },
};

export function TextSplit({
  text,
  className,
  delay = 1,
  stagger = 0.03,
  as = "h1",
  splitBy = "characters",
}: TextSplitProps) {
  const Component = motion[as] || motion.h1;

  const items =
    splitBy === "characters"
      ? text.split("").map((char, i) => (
          <span key={i} className="inline-block">
            {char === " " ? "\u00A0" : char}
          </span>
        ))
      : text.split(" ").map((word, i) => (
          <span key={i} className="inline-block mr-[0.25em]">
            {word}
          </span>
        ));

  return (
    <Component
      className={cn("overflow-hidden", className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      custom={delay}
    >
      {items.map((item, i) => (
        <motion.span
          key={i}
          variants={childVariants}
          className="inline-block"
          style={{ transitionDelay: `${i * stagger}s` }}
        >
          {item}
        </motion.span>
      ))}
    </Component>
  );
}
