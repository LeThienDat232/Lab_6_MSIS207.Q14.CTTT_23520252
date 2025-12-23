import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostFrontmatter = {
  title: string;
  date: string; // ISO string in your markdown
  excerpt: string;
  tags?: string[];
};

export type Post = {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function getPostFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
}

export function getAllPosts(): Post[] {
  const files = getPostFiles();

  const posts = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const fullPath = path.join(POSTS_DIR, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const parsed = matter(raw);

    const fm = parsed.data as Partial<PostFrontmatter>;
    if (!fm.title || !fm.date || !fm.excerpt) {
      throw new Error(`Missing frontmatter fields in ${file}`);
    }

    return {
      slug,
      frontmatter: {
        title: fm.title,
        date: fm.date,
        excerpt: fm.excerpt,
        tags: fm.tags ?? []
      },
      content: parsed.content
    };
  });

  // newest first
  posts.sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const file = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;

  const raw = fs.readFileSync(file, "utf8");
  const parsed = matter(raw);
  const fm = parsed.data as Partial<PostFrontmatter>;

  if (!fm.title || !fm.date || !fm.excerpt) return null;

  return {
    slug,
    frontmatter: {
      title: fm.title,
      date: fm.date,
      excerpt: fm.excerpt,
      tags: fm.tags ?? []
    },
    content: parsed.content
  };
}
