import Image from "next/image";
import Link from "next/link";

const imageSrc = "/GOODs.png";

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="surface relative overflow-hidden rounded-[32px] p-8 md:p-12">
        <div className="pointer-events-none absolute -right-20 -top-16 h-48 w-48 rounded-full bg-[rgb(var(--accent)/0.25)] blur-3xl" />
        <div className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-[rgb(var(--accent-2)/0.25)] blur-3xl" />

        <div className="relative grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6 reveal">
            <span className="pill">Next.js Lab 6</span>
            <h1 className="text-4xl leading-tight md:text-5xl">
              Knowledge Base Studio
            </h1>
            <p className="text-base text-[rgb(var(--muted))] md:text-lg">
              A clean landing hub for the blog, docs, and dashboard exercises,
              with a practical focus on routing, server rendering, and performance.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                className="rounded-full bg-[rgb(var(--fg))] px-4 py-2 text-sm font-semibold text-[rgb(var(--bg))] transition hover:opacity-90"
                href="/docs"
              >
                Explore docs
              </Link>
              <Link
                className="rounded-full border border-[rgb(var(--border))] px-4 py-2 text-sm font-semibold transition hover:border-[rgb(var(--accent))]"
                href="/dashboard"
              >
                Open dashboard
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="surface rounded-2xl p-4 reveal" style={{ animationDelay: "120ms" }}>
              <p className="text-xs uppercase tracking-[0.3em] text-[rgb(var(--muted))]">Focus</p>
              <p className="mt-2 text-sm">
                Pages Router SSG, App Router layouts, and secure middleware.
              </p>
            </div>
            <div className="surface rounded-2xl p-4 reveal" style={{ animationDelay: "220ms" }}>
              <p className="text-xs uppercase tracking-[0.3em] text-[rgb(var(--muted))]">Interactive</p>
              <p className="mt-2 text-sm">
                Client side theme toggle and streaming responses for docs queries.
              </p>
            </div>
            <div className="surface rounded-2xl p-4 reveal" style={{ animationDelay: "320ms" }}>
              <p className="text-xs uppercase tracking-[0.3em] text-[rgb(var(--muted))]">Optimization</p>
              <p className="mt-2 text-sm">
                Image sizing and font loading built to reduce layout shift.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">Explore the exercises</h2>
          <p className="mt-2 text-sm text-[rgb(var(--muted))]">
            Jump straight into each module to review routing, content, and API security.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Link className="link-card reveal" style={{ animationDelay: "120ms" }} href="/">
            <p className="text-xs uppercase tracking-[0.3em] text-[rgb(var(--muted))]">Pages SSG</p>
            <h3 className="mt-3 text-lg font-semibold">Pages Router Blog</h3>
            <p className="mt-2 text-sm text-[rgb(var(--muted))]">
              Classic SSG with dynamic routes and fallback paths.
            </p>
            <span className="mt-4 inline-flex text-xs uppercase tracking-[0.2em] text-[rgb(var(--accent))]">
              Open
            </span>
          </Link>

          <Link className="link-card reveal" style={{ animationDelay: "180ms" }} href="/markdown-blog">
            <p className="text-xs uppercase tracking-[0.3em] text-[rgb(var(--muted))]">App Router</p>
            <h3 className="mt-3 text-lg font-semibold">Markdown Blog</h3>
            <p className="mt-2 text-sm text-[rgb(var(--muted))]">
              Static markdown posts rendered as app routes.
            </p>
            <span className="mt-4 inline-flex text-xs uppercase tracking-[0.2em] text-[rgb(var(--accent))]">
              Open
            </span>
          </Link>

          <Link className="link-card reveal" style={{ animationDelay: "240ms" }} href="/docs">
            <p className="text-xs uppercase tracking-[0.3em] text-[rgb(var(--muted))]">Docs + AI</p>
            <h3 className="mt-3 text-lg font-semibold">Knowledge Base</h3>
            <p className="mt-2 text-sm text-[rgb(var(--muted))]">
              Static docs plus server actions and streaming answers.
            </p>
            <span className="mt-4 inline-flex text-xs uppercase tracking-[0.2em] text-[rgb(var(--accent))]">
              Open
            </span>
          </Link>

          <Link className="link-card reveal" style={{ animationDelay: "300ms" }} href="/dashboard">
            <p className="text-xs uppercase tracking-[0.3em] text-[rgb(var(--muted))]">Hybrid UI</p>
            <h3 className="mt-3 text-lg font-semibold">Dashboard</h3>
            <p className="mt-2 text-sm text-[rgb(var(--muted))]">
              Server rendering with a client side theme toggle.
            </p>
            <span className="mt-4 inline-flex text-xs uppercase tracking-[0.2em] text-[rgb(var(--accent))]">
              Open
            </span>
          </Link>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold">Image optimization</h2>
            <p className="mt-2 text-sm text-[rgb(var(--muted))]">
              Compare layout shift with a plain image tag versus Next image.
            </p>
          </div>
          <span className="pill">CLS demo</span>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="surface rounded-2xl p-4 reveal" style={{ animationDelay: "120ms" }}>
            <p className="text-xs uppercase tracking-[0.3em] text-[rgb(var(--muted))]">Standard img</p>
            <p className="mt-2 text-sm text-[rgb(var(--muted))]">
              Uses a plain <code>{`<img>`}</code> without reserved dimensions.
            </p>
            <div className="mt-4 overflow-hidden rounded-xl border border-[rgb(var(--border))]">
              <img src={imageSrc} alt="Product photo" className="block h-auto w-full" />
            </div>
          </div>

          <div className="surface rounded-2xl p-4 reveal" style={{ animationDelay: "200ms" }}>
            <p className="text-xs uppercase tracking-[0.3em] text-[rgb(var(--muted))]">next/image</p>
            <p className="mt-2 text-sm text-[rgb(var(--muted))]">
              Reserved space prevents layout shift while the image loads.
            </p>
            <div className="mt-4 overflow-hidden rounded-xl border border-[rgb(var(--border))]">
              <Image
                src={imageSrc}
                alt="Product photo"
                width={2400}
                height={2400}
                className="h-auto w-full"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
