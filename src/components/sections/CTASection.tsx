"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { VideoModal } from "@/components/ui/VideoModal";

export function CTASection() {
  return (
    <section className="relative py-32 md:py-48 bg-background overflow-hidden">
      {/* Radial gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(204,255,0,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-accent font-bold mb-8 block">
              Ready to Start?
            </span>

            <h2 className="text-[clamp(3rem,8vw,7rem)] font-black uppercase italic tracking-tighter leading-none mb-8">
              Let&apos;s Build<br />
              <span className="text-accent">Something Great</span>
            </h2>

            <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
              Every great project starts with a conversation. Tell us about your vision,
              and let&apos;s architect the future together.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <Button variant="primary" size="lg" showArrow className="rounded-full" asChild>
                <Link href="/contact">Start a Project</Link>
              </Button>

              <VideoModal
                videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Watch Our Showreel"
              />
            </div>
          </motion.div>
        </div>

        {/* Large decorative text */}
        <div
          className="absolute bottom-0 left-0 right-0 text-center pointer-events-none select-none opacity-[0.02]"
          aria-hidden="true"
        >
          <span className="text-[20vw] font-black uppercase italic tracking-tighter">
            NEXUS
          </span>
        </div>
      </div>
    </section>
  );
}
