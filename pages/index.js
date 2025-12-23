import Link from "next/link";
import data from "../data.json";

export async function getStaticProps() {
  return {
    props: {
      posts: data
    }
  };
}

export default function PagesBlogIndex({ posts }) {
  return (
    <div className="mx-auto max-w-5xl space-y-10 px-4 py-10">
      <header className="surface space-y-4 rounded-[32px] p-8 md:p-10">
        <span className="pill">Pages Router</span>
        <h1 className="text-3xl font-semibold md:text-4xl">Pages Router Blog (SSG)</h1>
        <p className="text-sm text-[rgb(var(--muted))]">
          This index is built with <code>getStaticProps</code>.
        </p>
        <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-[rgb(var(--muted))]">
          <Link className="rounded-full border border-[rgb(var(--border))] px-3 py-2 transition hover:border-[rgb(var(--accent))]" href="/home">
            Home
          </Link>
          <Link className="rounded-full border border-[rgb(var(--border))] px-3 py-2 transition hover:border-[rgb(var(--accent))]" href="/docs">
            Docs
          </Link>
          <Link className="rounded-full border border-[rgb(var(--border))] px-3 py-2 transition hover:border-[rgb(var(--accent))]" href="/markdown-blog">
            Markdown Blog
          </Link>
          <Link className="rounded-full border border-[rgb(var(--border))] px-3 py-2 transition hover:border-[rgb(var(--accent))]" href="/dashboard">
            Dashboard
          </Link>
        </div>
      </header>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Posts</h2>
          <span className="pill">SSG</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {posts.map((post, idx) => (
            <Link
              key={post.id}
              className="link-card reveal"
              style={{ animationDelay: `${120 + idx * 80}ms` }}
              href={`/blog/${post.id}`}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-[rgb(var(--muted))]">
                Post {post.id}
              </p>
              <h3 className="mt-3 text-lg font-semibold">{post.title}</h3>
              <p className="mt-2 text-sm text-[rgb(var(--muted))]">{post.content}</p>
              <span className="mt-4 inline-flex text-xs uppercase tracking-[0.2em] text-[rgb(var(--accent))]">
                Read
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
