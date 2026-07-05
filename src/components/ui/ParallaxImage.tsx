"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  parallaxStrength?: number;
}

export function ParallaxImage({
  src,
  alt,
  className,
  aspectRatio = "aspect-[4/5]",
  parallaxStrength = 0.15,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth scroll-linked parallax movement
  const y = useTransform(scrollYProgress, [0, 1], [`${parallaxStrength * 100}%`, `-${parallaxStrength * 100}%`]);
  const smoothY = useSpring(y, { stiffness: 80, damping: 25, restDelta: 0.001 });

  // Clip-path reveal on entrance
  const clipProgress = useScroll({
    target: containerRef,
    offset: ["start 0.8", "start 0.3"],
  }).scrollYProgress;

  const clipPath = useTransform(
    clipProgress,
    [0, 1],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  );

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", aspectRatio, className)}
    >
      <motion.div
        className="absolute inset-[-20%]"
        style={{ y: smoothY }}
      >
        <motion.div
          ref={imgRef}
          className="relative w-full h-full"
          style={{ clipPath }}
          initial={{ scale: 1.15 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.33, 1, 0.68, 1] }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={cn(
              "object-cover transition-opacity duration-700",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
          />
        </motion.div>
      </motion.div>
      {!imageLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
    </div>
  );
}
