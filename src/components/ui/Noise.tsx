"use client";

import { useEffect, useRef } from "react";

interface NoiseProps {
  opacity?: number;
  className?: string;
}

export function Noise({ opacity = 0.035, className }: NoiseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const generateNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = 255;
      }

      ctx.putImageData(imageData, 0, 0);
    };

    generateNoise();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-[9998] mix-blend-overlay ${className || ""}`}
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}
