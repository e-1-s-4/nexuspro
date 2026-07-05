"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface StickyCardData {
  title: string;
  description: string;
}

interface StickyStackProps {
  cards: StickyCardData[];
  className?: string;
  cardHeight?: string;
}

export function StickyStack({ cards, className }: StickyStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {cards.map((card, i) => (
        <StickyCard
          key={i}
          card={card}
          index={i}
          total={cards.length}
          containerRef={containerRef}
        />
      ))}
    </div>
  );
}

interface StickyCardProps {
  card: StickyCardData;
  index: number;
  total: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

function StickyCard({ card, index, total, containerRef }: StickyCardProps) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: [
      `${(index / total) * 100}% start`,
      `${((index + 1) / total) * 100}% end`,
    ],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Scale down as next card covers this one
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [1, 0.96, 0.92]);
  const opacity = useTransform(smoothProgress, [0, 0.2], [0.4, 1]);
  const y = useTransform(smoothProgress, [0, 1], [0, 16]);
  const rotateX = useTransform(smoothProgress, [0, 1], [3, 0]);

  return (
    <motion.div
      className="sticky top-[12vh] bg-background border border-muted/30 rounded-xl overflow-hidden"
      style={{ scale, y, opacity, rotateX }}
    >
      <div className="p-10 md:p-16 flex flex-col md:flex-row items-start gap-8 md:gap-16">
        {/* Number */}
        <div className="flex-shrink-0">
          <span className="text-7xl md:text-8xl font-black text-accent/10 tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 pt-2">
          <h3 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter">
            {card.title}
          </h3>
          <p className="text-lg text-foreground/50 leading-relaxed max-w-xl">
            {card.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
