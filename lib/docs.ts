import fs from "node:fs";
import path from "node:path";

export type Doc = {
  slug: string;
  title: string;
  body: string;
};

const DOCS_FILE = path.join(process.cwd(), "content", "docs.json");

export function getAllDocs(): Doc[] {
  if (!fs.existsSync(DOCS_FILE)) return [];
  const raw = fs.readFileSync(DOCS_FILE, "utf8");
  const docs = JSON.parse(raw) as Doc[];
  return docs;
}

export function getDocBySlug(slug: string): Doc | null {
  const docs = getAllDocs();
  return docs.find((d) => d.slug === slug) ?? null;
}
