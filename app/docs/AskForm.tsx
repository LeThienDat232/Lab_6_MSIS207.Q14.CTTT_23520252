"use client";

import { useFormState, useFormStatus } from "react-dom";
import { askAI } from "./actions";

const initialState = {
  prompt: "",
  answer: "",
  sources: [] as { slug: string; title: string }[]
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-[rgb(var(--fg))] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[rgb(var(--bg))] transition hover:opacity-90 disabled:opacity-50"
    >
      {pending ? "Thinking..." : "Ask"}
    </button>
  );
}

export default function AskForm() {
  const [state, formAction] = useFormState(askAI, initialState);

  return (
    <form action={formAction} className="surface space-y-3 rounded-2xl p-5">
      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[rgb(var(--muted))]">
        Ask AI (Server Action)
      </h3>
      <input
        name="prompt"
        placeholder="Ask about routing, SSG, middleware..."
        className="w-full rounded-full border border-[rgb(var(--border))] bg-transparent px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent)/0.4)]"
        defaultValue={state.prompt}
      />
      <SubmitButton />

      {state.answer ? (
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.7)] p-3 text-sm">
          <p className="whitespace-pre-wrap">{state.answer}</p>
          {state.sources.length ? (
            <div className="mt-2 text-xs opacity-70">
              Sources: {state.sources.map((s) => s.title).join(", ")}
            </div>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}
