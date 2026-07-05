"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PostMetadata } from "@/lib/posts";

interface PostCardProps {
  post: PostMetadata;
  index?: number;
  variant?: "default" | "featured";
}

export function PostCard({ post, index = 0, variant = "default" }: PostCardProps) {
  const isFeatured = variant === "featured";

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
      whileHover={{ y: -6 }}
      className={`group relative flex flex-col rounded-xl border border-muted/30 overflow-hidden bg-muted/5 hover:border-accent/20 transition-all duration-500 ${
        isFeatured ? "md:col-span-2 md:grid md:grid-cols-2 md:gap-0" : ""
      }`}
    >
      {/* Cover Image */}
      <Link href={`/insights/${post.slug}`} className={`relative overflow-hidden ${isFeatured ? "aspect-[16/10] md:aspect-auto md:row-span-1" : "aspect-[16/10]"}`}>
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
        />
        {/* Category badge */}
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-[10px] uppercase tracking-widest font-bold text-accent">
          {post.category}
        </span>
      </Link>

      {/* Content */}
      <div className={`flex flex-col justify-center p-6 md:p-8 ${isFeatured ? "md:p-10" : ""}`}>
        {/* Meta */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[10px] uppercase tracking-widest text-foreground/30">
            {post.date}
          </span>
          <span className="w-1 h-1 rounded-full bg-foreground/20" />
          <span className="text-[10px] uppercase tracking-widest text-foreground/30">
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <Link href={`/insights/${post.slug}`}>
          <h3 className={`font-bold uppercase italic tracking-tighter mb-3 group-hover:text-accent transition-colors leading-none ${
            isFeatured ? "text-2xl md:text-3xl" : "text-lg"
          }`}>
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-sm text-foreground/40 leading-relaxed mb-6 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Author */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-muted/20">
              <img
                src={post.authorImage}
                alt={post.author}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs font-medium text-foreground/50">{post.author}</span>
          </div>

          <Link
            href={`/insights/${post.slug}`}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-foreground/30 group-hover:text-accent transition-colors"
          >
            Read
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
