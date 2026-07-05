"use client";

import { useRef, useMemo, type ReactNode } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

interface ScrollHighlightProps {
  children: ReactNode;
  className?: string;
  splitBy?: "words" | "lines";
  highlightColor?: string;
}

export function ScrollHighlight({
  children,
  className,
  splitBy = "words",
  highlightColor = "#ccff00",
}: ScrollHighlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "start 0.25"],
  });

  // Convert children to text if it's a string, otherwise use textContent
  const textContent = typeof children === "string" ? children : "";

  const words = useMemo(() => {
    if (splitBy === "lines") {
      return textContent.split("\n").map((line, i) => ({
        id: i,
        text: line,
        isLine: true,
      }));
    }
    return textContent.split(/\s+/).map((word, i) => ({
      id: i,
      text: word,
      isLine: false,
    }));
  }, [textContent, splitBy]);

  const totalWords = words.length;

  return (
    <div ref={containerRef} className={className}>
      {words.map((word, i) => {
        const start = i / totalWords;
        const end = Math.min((i + 1) / totalWords, 1);
        const opacity = useTransform(
          scrollYProgress,
          [start - 0.05, start, end, end + 0.05],
          [0.15, 1, 1, 0.6]
        );
        const color = useTransform(
          scrollYProgress,
          [start - 0.05, start],
          ["rgba(237, 237, 237, 0.15)", highlightColor]
        );

        if (word.isLine) {
          return (
            <motion.p
              key={word.id}
              style={{ opacity, color }}
              className="mb-4 text-2xl md:text-3xl font-medium leading-relaxed transition-colors"
            >
              {word.text}
            </motion.p>
          );
        }

        return (
          <motion.span
            key={word.id}
            style={{ opacity, color }}
            className="inline-block mr-[0.25em] transition-colors"
          >
            {word.text}
          </motion.span>
        );
      })}
    </div>
  );
}
