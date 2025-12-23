import type { Post } from "@/lib/posts";

/**
 * A simple keyword match search (no embeddings) - enough to demonstrate API + middleware.
 */
export function searchPosts(posts: Post[], query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return posts
    .map((p) => {
      const hay = `${p.frontmatter.title}\n${p.frontmatter.excerpt}\n${p.content}`.toLowerCase();
      const score = scoreText(hay, q);
      return { post: p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map(({ post, score }) => ({
      slug: post.slug,
      title: post.frontmatter.title,
      excerpt: post.frontmatter.excerpt,
      date: post.frontmatter.date,
      score
    }));
}

function scoreText(text: string, query: string) {
  // Very small scoring: counts occurrences of each term
  const terms = query.split(/\s+/).filter(Boolean);
  let score = 0;
  for (const t of terms) {
    let idx = 0;
    while (true) {
      const found = text.indexOf(t, idx);
      if (found === -1) break;
      score += 1;
      idx = found + t.length;
    }
  }
  return score;
}
