"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, Variants, Easing } from "framer-motion";

interface PreloaderProps {
  onLoadingComplete?: () => void;
}

export function Preloader({ onLoadingComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [shouldShow, setShouldShow] = useState(true);
  const counterRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(counterRef, { once: true });

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Smoother completion with delay
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(() => {
              setShouldShow(false);
              onLoadingComplete?.();
            }, 800);
          }, 300);
          return 100;
        }
        // Variable speed for organic feel
        const increment = Math.random() * 8 + 2;
        return Math.min(prev + increment, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  const counterVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { staggerChildren: 0.03, duration: 0.4 },
    },
  };

  const slideUp: Variants = {
    hidden: { clipPath: "inset(0 0 0 0)" },
    visible: {
      clipPath: "inset(0 0 100% 0)",
      transition: { duration: 1, ease: [0.87, 0, 0.13, 1] as unknown as Easing, delay: 0.2 },
    },
  };

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          className="fixed inset-0 z-[10001] bg-background flex flex-col items-center justify-center"
          initial="hidden"
          animate={isComplete ? "visible" : "hidden"}
          variants={slideUp}
        >
          <div className="flex flex-col items-center gap-8">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
              className="flex items-center gap-3 mb-8"
            >
              <motion.div
                className="w-10 h-10 bg-accent rounded-sm rotate-45"
                animate={{ rotate: [45, 90, 45] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="font-display font-bold text-3xl tracking-tighter uppercase">
                Nexus
              </span>
            </motion.div>

            {/* Progress counter */}
            <motion.div
              ref={counterRef}
              variants={counterVariants}
              initial="hidden"
              animate="visible"
              className="text-8xl md:text-9xl font-black tracking-tighter text-accent tabular-nums"
            >
              {Math.round(progress)}
            </motion.div>

            {/* Progress bar */}
            <div className="w-48 md:w-64 h-[2px] bg-muted overflow-hidden mt-4 rounded-full">
              <motion.div
                className="h-full bg-accent"
                style={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>

            {/* Loading text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground mt-4"
            >
              Loading Experience
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
