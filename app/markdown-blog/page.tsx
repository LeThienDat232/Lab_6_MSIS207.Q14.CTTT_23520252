import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Blog</h1>
        <p className="opacity-80">Static posts rendered from Markdown.</p>
      </div>

      <ul className="space-y-4">
        {posts.map((p) => (
          <li key={p.slug} className="rounded-xl border p-4">
            <div className="flex items-baseline justify-between gap-4">
              <Link className="font-semibold hover:underline" href={`/markdown-blog/${p.slug}`}>
                {p.frontmatter.title}
              </Link>
              <span className="text-xs opacity-70">{p.frontmatter.date}</span>
            </div>
            <p className="mt-2 text-sm opacity-80">{p.frontmatter.excerpt}</p>
            {p.frontmatter.tags?.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {p.frontmatter.tags.map((t) => (
                  <span key={t} className="rounded-full border px-2 py-1 text-xs opacity-80">
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
