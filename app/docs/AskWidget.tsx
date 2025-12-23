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
        <div className="surface w-[320px] rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Ask AI</h3>
            <button
              onClick={() => setOpen(false)}
              className="text-xs uppercase tracking-[0.2em] text-[rgb(var(--muted))] hover:text-[rgb(var(--fg))]"
            >
              Close
            </button>
          </div>

          <form onSubmit={handleAsk} className="mt-2 space-y-2">
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask about routing, SSG..."
              className="w-full rounded-full border border-[rgb(var(--border))] bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent)/0.4)]"
            />
            <button
              type="submit"
              disabled={disabled}
              className="w-full rounded-full bg-[rgb(var(--fg))] px-3 py-2 text-xs uppercase tracking-[0.2em] text-[rgb(var(--bg))] transition hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Thinking..." : "Ask"}
            </button>
          </form>

          {answer ? (
            <div className="mt-3 max-h-48 overflow-auto rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.7)] p-2 text-xs whitespace-pre-wrap">
              {answer}
            </div>
          ) : null}
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="surface rounded-full px-4 py-3 text-xs uppercase tracking-[0.2em] text-[rgb(var(--muted))] transition hover:text-[rgb(var(--fg))]"
        >
          Ask AI
        </button>
      )}
    </div>
  );
}
