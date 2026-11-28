import type { Metadata } from "next";
import Image from "next/image";
import { getGalleryItems } from "@/lib/api";
import type { GalleryItem } from "@/data/gallery";
import GalleryGrid from "@/components/GalleryGrid";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse photos from the CCSRR decennial celebration, events, workshops, and activities at CCSRR, MAHE Manipal.",
  openGraph: {
    title: "Gallery | CCSRR | MAHE Manipal",
    description:
      "Browse photos from the CCSRR decennial celebration, events, workshops, and activities at CCSRR, MAHE Manipal.",
  },
};

const POSTER_SRC = "/Decennial_Celebration_of_CCSRR.jpeg";

const confetti = [
  { left: "5%", top: "16%", size: 7, color: "#F6D98E" },
  { left: "13%", top: "72%", size: 5, color: "#E9B95F" },
  { left: "22%", top: "30%", size: 4, color: "#FFF1C9" },
  { left: "31%", top: "84%", size: 6, color: "#F6D98E" },
  { left: "42%", top: "12%", size: 5, color: "#FFF1C9" },
  { left: "57%", top: "22%", size: 6, color: "#E9B95F" },
  { left: "68%", top: "78%", size: 5, color: "#FFF1C9" },
  { left: "79%", top: "28%", size: 7, color: "#F6D98E" },
  { left: "88%", top: "62%", size: 5, color: "#E9B95F" },
  { left: "94%", top: "18%", size: 4, color: "#FFF1C9" },
];

function isPoster(item: GalleryItem) {
  return item.image === POSTER_SRC || item.images?.includes(POSTER_SRC) === true;
}

function isDecennial(item: GalleryItem) {
  return /decennial/i.test(item.title);
}

export default async function GalleryPage() {
  const galleryItems = await getGalleryItems();
  galleryItems.sort((a, b) => {
    const aYear = parseInt(a.title.match(/\b(20\d{2})\b/)?.[1] || "0");
    const bYear = parseInt(b.title.match(/\b(20\d{2})\b/)?.[1] || "0");
    return bYear - aYear;
  });

  const celebrationItems = galleryItems.filter((item) => isDecennial(item) && !isPoster(item));
  const otherItems = galleryItems.filter((item) => !isDecennial(item) && !isPoster(item));

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── DECENNIAL CELEBRATION ── */}
        <section
          id="decennial-celebration"
          className="relative mb-16 overflow-hidden rounded-3xl border border-[#E7C77A]/40 px-4 py-12 sm:px-10 sm:py-16"
          style={{ background: "radial-gradient(circle at 50% -10%, #8E1B2E 0%, #5A0E1C 40%, #2C0710 100%)" }}
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            {confetti.map((dot, i) => (
              <span
                key={i}
                className="absolute rounded-full opacity-70"
                style={{
                  left: dot.left,
                  top: dot.top,
                  width: dot.size,
                  height: dot.size,
                  background: dot.color,
                  boxShadow: `0 0 12px ${dot.color}`,
                }}
              />
            ))}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E7C77A]/60 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#E7C77A]/60 to-transparent" />
          </div>

          <div className="relative mx-auto max-w-4xl text-center">
            <div
              aria-hidden="true"
              className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#E7C77A]/70 bg-[#E7C77A]/10"
              style={{ boxShadow: "0 0 30px rgba(231,199,122,0.25)" }}
            >
              <span className="font-display text-2xl text-[#F7E3B0]">10</span>
            </div>
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.28em] text-[#F0C97A] sm:text-[13px]">
              ✦ Decennial Celebration ✦
            </p>
            <h2
              className="font-display text-4xl leading-tight text-[#FFF4DC] sm:text-5xl md:text-6xl"
              style={{ textShadow: "0 2px 18px rgba(0,0,0,0.35)" }}
            >
              Decennial Celebration of CCSRR
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-[#F6DFC4]/90 sm:text-[17px]">
              A decade of stroke rehabilitation, research, and service — celebrated with our community.
            </p>
            <div className="mx-auto mt-5 h-px w-32 bg-gradient-to-r from-transparent via-[#E7C77A] to-transparent" />
          </div>

          <div className="relative mx-auto mt-10 max-w-3xl">
            <a
              href={POSTER_SRC}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-2xl border border-[#E7C77A]/50 shadow-2xl"
            >
              <Image
                src={POSTER_SRC}
                alt="Decennial Celebration of CCSRR poster"
                width={1600}
                height={1600}
                className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/55 px-4 py-1.5 text-xs font-medium text-white/90 opacity-0 transition-opacity group-hover:opacity-100">
                Click to view the full poster
              </span>
            </a>
          </div>

          {celebrationItems.length > 0 && (
            <div className="relative mt-14 rounded-2xl border border-[#E7C77A]/25 bg-[#FFF9F2]/95 p-4 sm:p-6">
              <h3 className="mb-5 text-center font-display text-2xl text-[#5A0E1C] sm:text-3xl">
                Decennial Celebration Photos
              </h3>
              <GalleryGrid items={celebrationItems} showFilters={false} />
            </div>
          )}
        </section>

        <SectionHeading title="Gallery" subtitle="Photos from events and workshops" eyebrow="Moments" />
        <GalleryGrid items={otherItems} />
      </div>
    </div>
  );
}
