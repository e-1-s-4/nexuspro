"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { PostCard } from "@/components/ui/PostCard";
import type { PostMetadata } from "@/lib/posts";
import { cn } from "@/lib/utils";

interface InsightsPageClientProps {
  posts: PostMetadata[];
  categories: string[];
  featuredPosts: PostMetadata[];
  regularPosts: PostMetadata[];
}

export default function InsightsPageClient({
  posts,
  categories,
  featuredPosts,
  regularPosts,
}: InsightsPageClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return posts;
    return posts.filter((p) => p.category === activeCategory);
  }, [activeCategory, posts]);

  const filteredFeatured = filteredPosts.filter((p) => p.featured);
  const filteredRegular = filteredPosts.filter((p) => !p.featured);

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="pt-40 md:pt-52 pb-16 md:pb-24">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-accent font-bold mb-6 block">
              Insights & Thoughts
            </span>
            <h1 className="text-[clamp(3rem,9vw,8rem)] font-black uppercase italic tracking-tighter leading-none">
              The <br />
              <span className="text-foreground/20 italic">Journal</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-foreground/50 max-w-2xl leading-relaxed">
              Explorations at the intersection of art and code. Design philosophy,
              engineering insights, and strategic thinking from the Nexus team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-6 md:px-12">
          <nav className="flex flex-wrap gap-3" aria-label="Category filters">
            <motion.button
              key="All"
              onClick={() => setActiveCategory("All")}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "px-5 py-2 rounded-full text-xs uppercase tracking-widest font-bold transition-all duration-300 border",
                activeCategory === "All"
                  ? "bg-accent text-background border-accent"
                  : "border-muted text-foreground/40 hover:border-accent/40 hover:text-accent"
              )}
              aria-pressed={activeCategory === "All"}
            >
              All
            </motion.button>
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "px-5 py-2 rounded-full text-xs uppercase tracking-widest font-bold transition-all duration-300 border",
                  activeCategory === cat
                    ? "bg-accent text-background border-accent"
                    : "border-muted text-foreground/40 hover:border-accent/40 hover:text-accent"
                )}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </motion.button>
            ))}
          </nav>
        </div>
      </section>

      {/* Posts */}
      <section className="pb-24 md:pb-40">
        <div className="container mx-auto px-6 md:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
            >
              {filteredFeatured.map((post, i) => (
                <PostCard key={post.slug} post={post} index={i} variant="featured" />
              ))}
              {filteredRegular.map((post, i) => (
                <PostCard
                  key={post.slug}
                  post={post}
                  index={filteredFeatured.length + i}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredPosts.length === 0 && (
            <div className="text-center py-24">
              <p className="text-foreground/30 text-lg">
                No posts found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-40 border-t border-muted/30">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-center"
          >
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none mb-6">
              Let&apos;s Create <span className="text-accent">Together</span>
            </h2>
            <p className="text-foreground/40 text-lg mb-8">
              Inspired by what you&apos;ve read? Let&apos;s bring your vision to life.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 text-xs uppercase tracking-widest font-bold border border-accent/40 px-8 py-4 rounded-full hover:bg-accent hover:text-background transition-all duration-300"
            >
              Start a Project
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
