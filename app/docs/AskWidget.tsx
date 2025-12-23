"use client";

import { useMemo, useState } from "react";

export default function AskWidget() {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const disabled = useMemo(() => loading || !prompt.trim(), [loading, prompt]);

  async function handleAsk(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim()) return;

    setAnswer("");
    setLoading(true);

    try {
      const res = await fetch(`/api/ai/stream?q=${encodeURIComponent(prompt)}`);
      if (!res.body) throw new Error("No stream");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        setAnswer((prev) => prev + decoder.decode(value, { stream: true }));
      }
    } catch (err) {
      setAnswer("Error: unable to stream response.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open ? (
        <div className="w-[320px] rounded-xl border bg-white p-3 shadow-lg dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Ask AI</h3>
            <button
              onClick={() => setOpen(false)}
              className="text-xs opacity-70 hover:opacity-100"
            >
              Close
            </button>
          </div>

          <form onSubmit={handleAsk} className="mt-2 space-y-2">
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask about routing, SSG..."
              className="w-full rounded border px-2 py-1 text-sm"
            />
            <button
              type="submit"
              disabled={disabled}
              className="w-full rounded border px-2 py-1 text-sm hover:bg-black/5 disabled:opacity-50 dark:hover:bg-white/10"
            >
              {loading ? "Thinking..." : "Ask"}
            </button>
          </form>

          {answer ? (
            <div className="mt-3 max-h-48 overflow-auto rounded border p-2 text-xs whitespace-pre-wrap">
              {answer}
            </div>
          ) : null}
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="rounded-full border bg-white px-3 py-2 text-sm shadow-md dark:bg-slate-900"
        >
          Ask AI
        </button>
      )}
    </div>
  );
}
