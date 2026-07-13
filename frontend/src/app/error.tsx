"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="py-24 text-center">
      <div className="max-w-md mx-auto px-4">
        <h1 className="text-4xl font-bold text-[#1C1C1A] mb-4">Something went wrong</h1>
        <p className="text-[#6B6860] mb-8">An unexpected error occurred. Please try again.</p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm bg-[#B84A18] text-white hover:bg-[#963C14] transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
