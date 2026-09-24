"use client";

import { useState } from "react";
import { Loader2, Send, Trash2 } from "lucide-react";
import { sendAiTestPrompt } from "@/lib/api";

export default function AiTestPage() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSend() {
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    setResponse("");

    try {
      const data = await sendAiTestPrompt(prompt);
      setResponse(data.response);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to reach the AI service."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setPrompt("");
    setResponse("");
    setError(null);
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-2xl font-bold text-slate-900">MedLens AI Test</h1>
      <p className="mt-1 text-sm text-slate-600">
        Verifies the Next.js → FastAPI → OpenAI → FastAPI → Next.js round
        trip.
      </p>
      <p className="mt-3 rounded-md bg-amber-50 px-4 py-2 text-xs font-medium text-amber-800">
        Development API test only. This is not a medical diagnostic tool.
      </p>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <label
          htmlFor="prompt"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Enter a prompt
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Hello, introduce yourself..."
          rows={5}
          className="w-full resize-none rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-clinical-500 focus:outline-none focus:ring-1 focus:ring-clinical-500"
        />

        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={handleSend}
            disabled={loading || !prompt.trim()}
            className="flex items-center gap-2 rounded-md bg-clinical-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-clinical-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}
            Send to AI
          </button>
          <button
            onClick={handleClear}
            disabled={loading}
            className="flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Trash2 size={16} />
            Clear
          </button>
        </div>

        <div className="mt-6">
          <p className="mb-2 text-sm font-medium text-slate-700">
            AI Response
          </p>
          <div className="min-h-[140px] whitespace-pre-wrap rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800">
            {loading && (
              <span className="flex items-center gap-2 text-slate-400">
                <Loader2 size={14} className="animate-spin" />
                Waiting for response…
              </span>
            )}
            {!loading && error && (
              <span className="text-red-600">{error}</span>
            )}
            {!loading && !error && response && response}
            {!loading && !error && !response && (
              <span className="text-slate-400">
                Response appears here...
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
