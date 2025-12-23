import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { markdownToHtml } from "@/lib/markdown";

export const dynamicParams = false; // SSG: only build known slugs

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Post not found" };
  return { title: post.frontmatter.title, description: post.frontmatter.excerpt };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const html = await markdownToHtml(post.content);

  return (
    <article className="prose max-w-none dark:prose-invert">
      <h1>{post.frontmatter.title}</h1>
      <p className="opacity-70">{post.frontmatter.date}</p>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
