"use client";

import { useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}

export function Magnetic({ children, className, distance = 40 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    mouseX.set(distanceX * (distance / 100));
    mouseY.set(distanceY * (distance / 100));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={cn("relative z-10", className)}
    >
      {children}
    </motion.div>
  );
}
