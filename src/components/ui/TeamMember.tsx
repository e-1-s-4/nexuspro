"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Link2, Earth } from "lucide-react";
import { cn } from "@/lib/utils";

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  bio: string;
  expertise: string[];
  socials: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  index?: number;
}

const SOCIAL_ICONS: Record<string, typeof Code2> = {
  twitter: Code2,
  linkedin: Link2,
  github: Code2,
  website: Earth,
};

export function TeamMember({
  name,
  role,
  image,
  bio,
  expertise,
  socials,
  index = 0,
}: TeamMemberProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const hasSocials = Object.values(socials).some(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.12, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
      className="perspective-[1200px]"
    >
      <motion.div
        className="relative w-full cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
        onClick={() => setIsFlipped(!isFlipped)}
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsFlipped(!isFlipped);
          }
        }}
        aria-label={`View details about ${name}`}
      >
        {/* Front Face */}
        <div
          className={cn(
            "relative aspect-[4/5] overflow-hidden bg-muted",
            "backface-hidden rounded-lg"
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

          {/* Name overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-xl font-bold uppercase italic tracking-tighter text-white mb-1">
              {name}
            </h3>
            <p className="text-[10px] uppercase tracking-[0.2em] text-accent font-medium">
              {role}
            </p>
          </div>

          {/* Flip hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 + index * 0.12 }}
            className="absolute top-4 right-4 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm"
          >
            <span className="text-[8px] uppercase tracking-widest text-white/60">+</span>
          </motion.div>
        </div>

        {/* Back Face */}
        <div
          className={cn(
            "absolute inset-0 bg-background border border-muted/50 rounded-lg",
            "backface-hidden flex flex-col justify-center p-8"
          )}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {/* Name */}
          <h3 className="text-xl font-bold uppercase italic tracking-tighter mb-1">
            {name}
          </h3>
          <p className="text-[10px] uppercase tracking-[0.2em] text-accent font-medium mb-4">
            {role}
          </p>

          {/* Bio */}
          <p className="text-sm text-foreground/50 leading-relaxed mb-6">
            {bio}
          </p>

          {/* Expertise Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {expertise.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full border border-muted/50 text-[10px] uppercase tracking-widest font-bold text-foreground/40"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Social Links */}
          {hasSocials && (
            <div className="flex items-center gap-3">
              {Object.entries(socials).map(
                ([key, url]) =>
                  url &&
                  SOCIAL_ICONS[key as keyof typeof SOCIAL_ICONS] && (
                    <motion.a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-9 h-9 rounded-full border border-muted/50 flex items-center justify-center hover:border-accent/40 hover:text-accent transition-colors"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`${name} on ${key}`}
                    >
                      {(() => {
                        const Icon = SOCIAL_ICONS[key as keyof typeof SOCIAL_ICONS];
                        return Icon ? <Icon className="w-4 h-4" /> : null;
                      })()}
                    </motion.a>
                  )
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
