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
        <h2 className="text-lg font-semibold">Docs</h2>
        <ul className="space-y-2">
          {docs.map((doc) => (
            <li key={doc.slug}>
              <Link className="underline" href={`/docs/${doc.slug}`}>
                {doc.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <AskForm />
    </div>
  );
}
