"use client";

import { motion, AnimatePresence, TargetAndTransition, Transition, Easing } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const easing: Easing = [0.33, 1, 0.68, 1] as Easing;
const transition: Transition = { duration: 0.6, ease: easing };

type VariantSet = {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  exit: TargetAndTransition;
};

const pageVariants: Record<string, VariantSet> = {
  default: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  work: {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  },
  about: {
    initial: { opacity: 0, scale: 0.97 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.03 },
  },
  contact: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 40 },
  },
  caseStudy: {
    initial: { opacity: 0, x: 80 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -80 },
  },
};

function getTransitionType(pathname: string) {
  if (pathname === "/") return "default";
  if (pathname === "/work") return "work";
  if (pathname === "/about") return "about";
  if (pathname === "/contact") return "contact";
  if (pathname.startsWith("/work/")) return "caseStudy";
  return "default";
}

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const transitionType = getTransitionType(pathname);
  const variants = pageVariants[transitionType] || pageVariants.default;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        transition={transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
