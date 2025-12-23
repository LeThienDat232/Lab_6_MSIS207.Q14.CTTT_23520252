import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="text-3xl font-semibold">Knowledge Base</h1>
        <p className="opacity-80">
          Blog (SSG), Dashboard (Server + Client), and Secure API (middleware).
        </p>
        <div className="flex gap-3">
          <Link className="rounded border px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10" href="/blog">
            Read blog
          </Link>
          <Link className="rounded border px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10" href="/dashboard">
            Open dashboard
          </Link>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Standard img (CLS demo)</h2>
        <p className="text-sm opacity-70">
          This uses a plain <code>{`<img>`}</code> without width/height.
        </p>
        <div className="overflow-hidden rounded-xl border">
          <img src="/hero.svg" alt="Hero illustration" />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Optimized with next/image</h2>
        <p className="text-sm opacity-70">
          Same asset, but sized to avoid layout shift.
        </p>
        <div className="relative overflow-hidden rounded-xl border">
          <Image
            src="/hero.svg"
            alt="Hero illustration"
            width={2400}
            height={1600}
            priority
          />
        </div>
      </section>
    </div>
  );
}
