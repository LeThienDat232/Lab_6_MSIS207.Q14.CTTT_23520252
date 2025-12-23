import { notFound } from "next/navigation";
import { getAllDocs, getDocBySlug } from "@/lib/docs";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllDocs().map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const doc = getDocBySlug(params.slug);
  if (!doc) return { title: "Doc not found" };
  return { title: doc.title };
}

export default function DocPage({ params }: { params: { slug: string } }) {
  const doc = getDocBySlug(params.slug);
  if (!doc) notFound();

  const paragraphs = doc.body.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);

  return (
    <article className="space-y-4">
      <h1 className="text-2xl font-semibold">{doc.title}</h1>
      {paragraphs.map((p, idx) => (
        <p key={idx} className="leading-relaxed">
          {p}
        </p>
      ))}
    </article>
  );
}
