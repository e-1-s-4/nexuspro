"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoModalProps {
  videoUrl?: string;
  thumbnailUrl?: string;
  title?: string;
  className?: string;
}

export function VideoModal({
  videoUrl,
  thumbnailUrl,
  title = "Watch Showreel",
  className,
}: VideoModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "group relative flex items-center gap-6 cursor-pointer",
          className
        )}
        aria-label={`Play ${title}`}
      >
        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-accent flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
          <Play className="w-8 h-8 md:w-10 md:h-10 text-background ml-1" fill="currentColor" />
          <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-20" />
        </div>
        <span className="text-lg md:text-xl font-bold uppercase tracking-widest text-foreground group-hover:text-accent transition-colors">
          {title}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-xl z-[10000] flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 w-12 h-12 rounded-full border border-muted hover:border-accent flex items-center justify-center transition-colors z-10"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
              className="w-[90vw] md:w-[80vw] max-w-6xl aspect-video bg-muted rounded-lg overflow-hidden"
            >
              {videoUrl ? (
                <iframe
                  src={videoUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={title}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <p className="text-lg uppercase tracking-widest">Video Player Placeholder</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
