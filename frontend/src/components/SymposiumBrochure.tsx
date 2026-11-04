"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const PDF_HREF = "/symposium/stroke-symposium-2026-brochure.pdf";

const pages = [1, 2, 3, 4].map((page) => ({
  page,
  src: `/symposium/stroke-symposium-2026-brochure-p${page}.jpg`,
  alt: `National Stroke Symposium 2026 brochure — page ${page}`,
}));

export default function SymposiumBrochure() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowLeft") setActive((p) => (p === null ? null : (p - 1 + pages.length) % pages.length));
      if (e.key === "ArrowRight") setActive((p) => (p === null ? null : (p + 1) % pages.length));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active]);

  useEffect(() => {
    if (active === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [active]);

  const current = active === null ? null : pages[active];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        {pages.map((item, index) => (
          <button
            key={item.page}
            type="button"
            onClick={() => setActive(index)}
            className="group relative block w-full text-left rounded-xl border border-[#E8E5E0] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B84A18] focus-visible:ring-offset-2 cursor-zoom-in"
            aria-label={`Open a larger preview of brochure page ${item.page}`}
          >
            <div className="overflow-hidden rounded-t-xl">
              <Image
                src={item.src}
                alt={item.alt}
                width={1241}
                height={1754}
                className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]"
                priority={item.page === 1}
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <div className="flex items-center justify-between gap-2 px-3 py-2 border-t border-[#F0EDE8]">
              <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#B84A18]">
                Page {item.page}
              </span>
              <span className="text-[12px] text-[#8A867E] group-hover:text-[#B84A18] transition-colors">
                Tap to enlarge
              </span>
            </div>
          </button>
        ))}
      </div>

      <p className="mt-5 text-center text-[13px] text-[#8A867E]">
        <a
          href={PDF_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[#B84A18] hover:underline"
        >
          Open the full brochure (PDF)
        </a>
      </p>

      {current && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-3 sm:p-6"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Brochure page ${current.page} of 4`}
        >
          <div
            className="relative flex max-h-full w-full max-w-4xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-2 flex w-full items-center justify-between">
              <span className="text-[13px] font-medium text-white/70">
                Page {current.page} of {pages.length}
              </span>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="rounded-full px-3 py-1 text-[13px] font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-colors"
              >
                Close ✕
              </button>
            </div>

            <Image
              src={current.src}
              alt={current.alt}
              width={1241}
              height={1754}
              className="h-auto max-h-[76vh] w-auto max-w-full rounded-lg shadow-2xl"
              sizes="100vw"
            />

            <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
              <a
                href={PDF_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#B84A18] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#963C14] transition-colors"
              >
                Open full brochure (PDF)
              </a>
              <button
                type="button"
                onClick={() => setActive((p) => (p === null ? null : (p - 1 + pages.length) % pages.length))}
                className="rounded-lg border border-white/25 px-3 py-2 text-[13px] font-medium text-white/85 hover:bg-white/10 transition-colors"
              >
                ‹ Previous
              </button>
              <button
                type="button"
                onClick={() => setActive((p) => (p === null ? null : (p + 1) % pages.length))}
                className="rounded-lg border border-white/25 px-3 py-2 text-[13px] font-medium text-white/85 hover:bg-white/10 transition-colors"
              >
                Next ›
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
