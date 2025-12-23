import { buildAnswer } from "@/lib/rag";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const prompt = searchParams.get("q") ?? "";
  const result = buildAnswer(prompt);

  const fullText = `${result.answer}${result.sources.length ? "\n\nSources:\n" + result.sources.map((s) => `- ${s.title}`).join("\n") : ""}`;
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      for (const char of fullText) {
        controller.enqueue(encoder.encode(char));
        await new Promise((resolve) => setTimeout(resolve, 15));
      }
      controller.close();
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}
