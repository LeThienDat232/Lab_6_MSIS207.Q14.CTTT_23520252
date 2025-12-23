import { getAllDocs } from "@/lib/docs";

export type DocMatch = {
  slug: string;
  title: string;
  snippet: string;
  score: number;
};

export function searchDocs(query: string): DocMatch[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return getAllDocs()
    .map((doc) => {
      const hay = `${doc.title}\n${doc.body}`.toLowerCase();
      const score = scoreText(hay, q);
      return { doc, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ doc, score }) => ({
      slug: doc.slug,
      title: doc.title,
      snippet: buildSnippet(doc.body, query),
      score
    }));
}

export function buildAnswer(query: string) {
  if (!query.trim()) {
    return {
      answer: "Ask about routing, SSG, or middleware.",
      sources: [] as { slug: string; title: string }[]
    };
  }

  const matches = searchDocs(query);
  if (!matches.length) {
    return {
      answer: `No docs matched: "${query}". Try different keywords.`,
      sources: [] as { slug: string; title: string }[]
    };
  }

  const summary = matches
    .map((m) => `${m.title}: ${m.snippet}`)
    .join(" ");

  return {
    answer: `Based on the docs, ${summary}`,
    sources: matches.map((m) => ({ slug: m.slug, title: m.title }))
  };
}

function scoreText(text: string, query: string) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  let score = 0;
  for (const term of terms) {
    let idx = 0;
    while (true) {
      const found = text.indexOf(term, idx);
      if (found === -1) break;
      score += 1;
      idx = found + term.length;
    }
  }
  return score;
}

function buildSnippet(body: string, query: string) {
  const text = body.replace(/\s+/g, " ").trim();
  const q = query.trim().toLowerCase();
  const idx = text.toLowerCase().indexOf(q);
  if (idx === -1) return text.slice(0, 120) + "...";
  const start = Math.max(0, idx - 40);
  const end = Math.min(text.length, idx + 80);
  return text.slice(start, end) + "...";
}
