"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const TOTAL_FRAMES = 240;

function framePath(n: number): string {
  return `/ezgif-frame-${String(n).padStart(3, "0")}.jpg`;
}

// Preload all frames
function preloadFrames(): HTMLImageElement[] {
  const images: HTMLImageElement[] = [];
  for (let i = 1; i <= TOTAL_FRAMES; i++) {
    const img = new Image();
    img.src = framePath(i);
    images.push(img);
  }
  return images;
}

export function ScrollNeonAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.12], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.08, 0.88, 1], [0, 1, 1, 0]);

  // Preload frames
  useEffect(() => {
    imagesRef.current = preloadFrames();
    let loaded = 0;
    imagesRef.current.forEach((img) => {
      if (img.complete) {
        loaded++;
      } else {
        img.onload = () => {
          loaded++;
          loadedRef.current = loaded;
        };
        img.onerror = () => {
          loaded++;
          loadedRef.current = loaded;
        };
      }
    });
    loadedRef.current = loaded;
  }, []);

  // Draw frame based on scroll progress
  const drawFrame = useCallback(
    (progress: number) => {
      const canvas = canvasRef.current;
      const images = imagesRef.current;
      if (!canvas || images.length === 0) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const frameIndex = Math.min(
        Math.floor(progress * (TOTAL_FRAMES - 1)),
        TOTAL_FRAMES - 1
      );
      const img = images[frameIndex];
      if (!img || !img.complete) return;

      // Match canvas to display size
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      // Cover-style draw (fill canvas, maintain aspect ratio)
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = rect.width / rect.height;
      let drawW: number, drawH: number, drawX: number, drawY: number;

      if (canvasRatio > imgRatio) {
        drawW = rect.width;
        drawH = rect.width / imgRatio;
        drawX = 0;
        drawY = (rect.height - drawH) / 2;
      } else {
        drawH = rect.height;
        drawW = rect.height * imgRatio;
        drawX = (rect.width - drawW) / 2;
        drawY = 0;
      }

      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    },
    []
  );

  // Scroll-driven frame playback
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const clamped = Math.max(0, Math.min(1, latest));
      drawFrame(clamped);
    });

    return () => unsubscribe();
  }, [scrollYProgress, drawFrame]);

  // Draw initial frame when loaded
  useEffect(() => {
    const checkAndDraw = () => {
      if (loadedRef.current >= TOTAL_FRAMES) {
        drawFrame(0);
      } else {
        requestAnimationFrame(checkAndDraw);
      }
    };
    requestAnimationFrame(checkAndDraw);
  }, [drawFrame]);

  return (
    <section ref={containerRef} className="relative h-[180vh] bg-background">
      <motion.div
        className="sticky top-0 h-screen w-full overflow-hidden bg-background"
        style={{ scale, opacity }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        />

        {/* Edge fade */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, #0a0a0a 0%, transparent 10%, transparent 90%, #0a0a0a 100%)",
          }}
          aria-hidden="true"
        />
      </motion.div>
    </section>
  );
}
