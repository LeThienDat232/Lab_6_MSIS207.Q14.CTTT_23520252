import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts";
import { searchPosts } from "@/lib/search";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";

  const posts = getAllPosts();
  const results = searchPosts(posts, q);

  return NextResponse.json({
    secure: true,
    query: q,
    count: results.length,
    results
  });
}
