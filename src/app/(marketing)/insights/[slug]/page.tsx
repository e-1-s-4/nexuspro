import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from "lucide-react";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import {
  getPostBySlug,
  getAllPostSlugs,
  getRelatedPosts,
} from "@/lib/posts";
import { PostCard } from "@/components/ui/PostCard";
import { BreadcrumbJsonLd, ArticleJsonLd } from "@/components/seo/JsonLd";

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug: slug.replace(".mdx", "") }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | Nexus Insights`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Nexus`,
      description: post.excerpt,
      type: "article",
      url: `https://nexus-agency.com/insights/${post.slug}`,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(params.slug, 2);

  return (
    <article className="bg-background">
      <BreadcrumbJsonLd
        items={[
          { position: 1, name: "Home", item: "https://nexus-agency.com/" },
          { position: 2, name: "Insights", item: "https://nexus-agency.com/insights" },
          { position: 3, name: post.title, item: `https://nexus-agency.com/insights/${post.slug}` },
        ]}
      />
      <ArticleJsonLd
        headline={post.title}
        description={post.excerpt}
        image={post.coverImage}
        datePublished={post.date}
        author={post.author}
        url={`https://nexus-agency.com/insights/${post.slug}`}
      />

      {/* Hero */}
      <section className="pt-40 md:pt-52 pb-16 md:pb-24">
        <div className="container mx-auto px-6 md:px-12">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm text-foreground/40 hover:text-accent transition-colors mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Insights
          </Link>

          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/5 text-[10px] uppercase tracking-widest font-bold text-accent mb-6">
            {post.category}
          </span>
          <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-black uppercase italic tracking-tighter leading-none mb-8 max-w-5xl">
            {post.title}
          </h1>
          <p className="text-xl md:text-2xl text-foreground/50 max-w-3xl leading-relaxed mb-8">
            {post.excerpt}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-foreground/40">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="relative aspect-[21/9] overflow-hidden bg-muted rounded-xl">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <div className="prose prose-invert prose-lg max-w-none
            prose-headings:font-display prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-tighter
            prose-h2:text-3xl prose-h2:md:text-4xl prose-h2:italic prose-h2:mt-16 prose-h2:mb-6
            prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-12 prose-h3:mb-4
            prose-p:text-foreground/60 prose-p:leading-relaxed prose-p:my-6
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground prose-strong:font-bold
            prose-ul:list-none prose-ol:list-decimal prose-ol:text-foreground/60
            prose-li:text-foreground/60 prose-li:my-2
            prose-blockquote:border-l-accent prose-blockquote:bg-accent/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:italic prose-blockquote:text-foreground/60
            prose-pre:!bg-muted prose-pre:!p-6 prose-pre:!rounded-lg prose-pre:border prose-pre:border-muted/30
            prose-code:!text-accent prose-code:!bg-accent/5 prose-code:!px-1.5 prose-code:!py-0.5 prose-code:!rounded prose-code:!text-sm prose-code:!font-mono
            prose-hr:border-muted/30"
          >
            <MDXRemote
              source={post.content}
              options={{
                mdxOptions: {
                  rehypePlugins: [
                    [rehypePrettyCode, { theme: "github-dark", keepBackground: false }],
                  ],
                },
              }}
            />
          </div>
        </div>
      </section>

      {/* Author Card */}
      <section className="py-16 md:py-24 border-t border-muted/30">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl p-8 md:p-10 rounded-xl border border-muted/30 bg-muted/5 flex flex-col md:flex-row items-start gap-6">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-muted/20 flex-shrink-0">
              <img
                src={post.authorImage}
                alt={post.author}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/30 font-bold mb-2">
                Written by
              </p>
              <h3 className="text-xl font-bold uppercase italic tracking-tighter mb-2">
                {post.author}
              </h3>
              <p className="text-sm text-foreground/40 leading-relaxed">
                A member of the Nexus team sharing insights from our work and research.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-none mb-12">
              Related <span className="text-foreground/20 italic">Posts</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {relatedPosts.map((rp, i) => (
                <PostCard key={rp.slug} post={rp} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 md:py-24 border-t border-muted/30">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl text-center">
            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-none mb-6">
              Ready to <span className="text-accent">Apply</span> These Ideas?
            </h2>
            <p className="text-foreground/40 text-lg mb-8">
              Let&apos;s discuss how we can bring these principles to your next project.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 text-xs uppercase tracking-widest font-bold border border-accent/40 px-8 py-4 rounded-full hover:bg-accent hover:text-background transition-all duration-300"
            >
              Start a Project
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
