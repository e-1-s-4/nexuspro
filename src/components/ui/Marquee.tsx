"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  texts: string[];
  speed?: number;
  className?: string;
  direction?: "left" | "right";
}

export function Marquee({
  texts,
  speed = 30,
  className,
  direction = "left",
}: MarqueeProps) {
  const content = texts.join(" ✦  ");

  return (
    <div className={cn("overflow-hidden whitespace-nowrap", className)}>
      <motion.div
        className="inline-flex gap-0"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        <span className="text-[clamp(4rem,12vw,10rem)] font-black uppercase italic tracking-tighter text-muted/20 whitespace-nowrap pr-8">
          {content}
        </span>
        <span className="text-[clamp(4rem,12vw,10rem)] font-black uppercase italic tracking-tighter text-muted/20 whitespace-nowrap pr-8" aria-hidden="true">
          {content}
        </span>
      </motion.div>
    </div>
  );
}
