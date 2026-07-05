import fs from "fs";
import path from "path";
import matter from "gray-matter";

const INSIGHTS_DIR = path.join(process.cwd(), "content/insights");

export interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  author: string;
  authorImage: string;
  coverImage: string;
  readTime: string;
  featured: boolean;
}

export interface PostData extends PostMetadata {
  content: string;
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(INSIGHTS_DIR)) return [];
  return fs.readdirSync(INSIGHTS_DIR).filter((f) => f.endsWith(".mdx"));
}

export function getAllPosts(): PostMetadata[] {
  if (!fs.existsSync(INSIGHTS_DIR)) return [];

  const files = getAllPostSlugs();
  const posts: PostMetadata[] = files
    .map((filename) => {
      const slug = filename.replace(".mdx", "");
      const filePath = path.join(INSIGHTS_DIR, filename);
      const fileContents = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: (data.title as string) || "",
        date: (data.date as string) || "",
        category: (data.category as string) || "",
        excerpt: (data.excerpt as string) || "",
        author: (data.author as string) || "",
        authorImage: (data.authorImage as string) || "",
        coverImage: (data.coverImage as string) || "",
        readTime: (data.readTime as string) || "",
        featured: (data.featured as boolean) || false,
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return posts;
}

export function getPostBySlug(slug: string): PostData | null {
  const filePath = path.join(INSIGHTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: (data.title as string) || "",
    date: (data.date as string) || "",
    category: (data.category as string) || "",
    excerpt: (data.excerpt as string) || "",
    author: (data.author as string) || "",
    authorImage: (data.authorImage as string) || "",
    coverImage: (data.coverImage as string) || "",
    readTime: (data.readTime as string) || "",
    featured: (data.featured as boolean) || false,
    content,
  };
}

export function getPostsByCategory(category: string): PostMetadata[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map((p) => p.category));
  return Array.from(categories).sort();
}

export function getRelatedPosts(currentSlug: string, limit = 2): PostMetadata[] {
  const allPosts = getAllPosts();
  return allPosts.filter((p) => p.slug !== currentSlug).slice(0, limit);
}
