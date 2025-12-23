import Link from "next/link";
import AskForm from "./AskForm";
import { getAllDocs } from "@/lib/docs";

export const dynamic = "force-static";

export default function DocsIndexPage() {
  const docs = getAllDocs();

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold">Documentation</h1>
        <p className="opacity-80">
          Static docs pages with a floating Ask AI widget.
        </p>
      </section>

      <section className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Docs</h2>
          <span className="pill">Static</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {docs.map((doc, idx) => (
            <Link
              key={doc.slug}
              className="link-card reveal"
              style={{ animationDelay: `${120 + idx * 80}ms` }}
              href={`/docs/${doc.slug}`}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-[rgb(var(--muted))]">Doc</p>
              <h3 className="mt-3 text-lg font-semibold">{doc.title}</h3>
              <p className="mt-2 text-sm text-[rgb(var(--muted))]">
                Static content with a floating Ask AI widget.
              </p>
              <span className="mt-4 inline-flex text-xs uppercase tracking-[0.2em] text-[rgb(var(--accent))]">
                Read
              </span>
            </Link>
          ))}
        </div>
      </section>

      <AskForm />
    </div>
  );
}
