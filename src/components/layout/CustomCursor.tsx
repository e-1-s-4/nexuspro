"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 250 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Hide custom cursor on touch devices
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (hasTouch) return;

    setIsVisible(true);

    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer") ||
        target.getAttribute("role") === "button"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mouseover", handleHoverStart);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mouseover", handleHoverStart);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <motion.div
      ref={cursorRef}
      className={cn(
        "fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-accent pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center hidden md:flex",
        isHovering && "scale-[2.2] bg-accent/10 border-accent/50",
        isClicking && "scale-[0.7]"
      )}
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      aria-hidden="true"
    >
      <div
        className={cn(
          "w-1.5 h-1.5 bg-accent rounded-full transition-all duration-300",
          isHovering && "opacity-0 scale-0"
        )}
      />
    </motion.div>
  );
}
