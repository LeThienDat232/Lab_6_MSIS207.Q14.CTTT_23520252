"use server";

import { buildAnswer } from "@/lib/rag";

export type AskState = {
  prompt: string;
  answer: string;
  sources: { slug: string; title: string }[];
  error?: string;
};

export async function askAI(_prev: AskState, formData: FormData): Promise<AskState> {
  const prompt = String(formData.get("prompt") || "").trim();
  if (!prompt) {
    return { prompt: "", answer: "Please enter a question.", sources: [] };
  }

  const result = buildAnswer(prompt);
  return {
    prompt,
    answer: result.answer,
    sources: result.sources
  };
}
