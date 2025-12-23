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
      className="rounded border px-3 py-1 text-sm hover:bg-black/5 disabled:opacity-50 dark:hover:bg-white/10"
    >
      {pending ? "Thinking..." : "Ask"}
    </button>
  );
}

export default function AskForm() {
  const [state, formAction] = useFormState(askAI, initialState);

  return (
    <form action={formAction} className="space-y-3 rounded-xl border p-4">
      <h3 className="font-semibold">Ask AI (Server Action)</h3>
      <input
        name="prompt"
        placeholder="Ask about routing, SSG, middleware..."
        className="w-full rounded border px-2 py-1 text-sm"
        defaultValue={state.prompt}
      />
      <SubmitButton />

      {state.answer ? (
        <div className="rounded border p-2 text-sm">
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
