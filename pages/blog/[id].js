import Link from "next/link";
import { useRouter } from "next/router";
import data from "../../data.json";

export async function getStaticPaths() {
  const paths = data.map((post) => ({
    params: { id: post.id }
  }));

  return {
    paths,
    fallback: true
  };
}

export async function getStaticProps({ params }) {
  const post = data.find((p) => p.id === params.id) || null;

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      post
    }
  };
}

export default function BlogPostPage({ post }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="surface rounded-2xl p-6">
          <p className="text-sm text-[rgb(var(--muted))]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-10">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <span className="pill">Pages Router</span>
          <h1 className="text-3xl font-semibold">{post.title}</h1>
          <p className="text-sm text-[rgb(var(--muted))]">
            Statically generated from <code>data.json</code>.
          </p>
        </div>
        <Link
          className="rounded-full border border-[rgb(var(--border))] px-4 py-2 text-xs uppercase tracking-[0.2em] transition hover:border-[rgb(var(--accent))]"
          href="/"
        >
          Back to list
        </Link>
      </header>

      <article className="surface rounded-2xl p-6">
        <p className="text-base leading-relaxed">{post.content}</p>
      </article>

      <nav className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-[rgb(var(--muted))]">
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
      </nav>
    </div>
  );
}
