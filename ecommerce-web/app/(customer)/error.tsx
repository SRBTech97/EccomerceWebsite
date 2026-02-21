"use client";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function CustomerError({ error, reset }: ErrorProps) {
  return (
    <div className="page-section space-y-3">
      <h1 className="text-xl font-semibold text-slate-900">Something went wrong</h1>
      <p className="text-sm text-slate-600">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="inline-flex items-center justify-center rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white"
      >
        Try again
      </button>
    </div>
  );
}
