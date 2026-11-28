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

const LECTURE_COVERS: Record<number, string> = {
  1: "/gallery/decennial-celebration/lecture-1-cover.jpeg",
  2: "/gallery/decennial-celebration/lecture-2-cover.jpeg",
  3: "/gallery/decennial-celebration/lecture-3-cover.jpeg",
  4: "/gallery/decennial-celebration/lecture-4-cover.jpeg",
};

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

function withLectureCover(item: GalleryItem): GalleryItem {
  const match = item.title.match(/lecture(?:\s+series)?\s*(\d)/i);
  const cover = match ? LECTURE_COVERS[Number(match[1])] : undefined;
  if (!cover) return item;
  const photos = item.images ?? [item.image];
  return { ...item, image: cover, images: [cover, ...photos.filter((src) => src !== cover)] };
}

export default async function GalleryPage() {
  const galleryItems = await getGalleryItems();
  galleryItems.sort((a, b) => {
    const aYear = parseInt(a.title.match(/\b(20\d{2})\b/)?.[1] || "0");
    const bYear = parseInt(b.title.match(/\b(20\d{2})\b/)?.[1] || "0");
    return bYear - aYear;
  });

  const celebrationItems = galleryItems
    .filter((item) => isDecennial(item) && !isPoster(item))
    .map(withLectureCover);
  const otherItems = galleryItems.filter((item) => !isDecennial(item) && !isPoster(item));

  return (
    <div className="pb-16">
      {/* ── DECENNIAL CELEBRATION — red theme fills the page down to the Gallery heading ── */}
      <section
        id="decennial-celebration"
        className="relative overflow-hidden"
        style={{ background: "radial-gradient(circle at 50% 0%, #8E1B2E 0%, #5A0E1C 42%, #2C0710 100%)" }}
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
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#E7C77A]/60 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
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
            <p className="mx-auto mt-4 text-[16px] leading-relaxed text-[#F6DFC4]/90 sm:whitespace-nowrap sm:text-[18px]">
              A decade of stroke rehabilitation, research, and service — celebrated with our community.
            </p>
            <div className="mx-auto mt-5 h-px w-32 bg-gradient-to-r from-transparent via-[#E7C77A] to-transparent" />
          </div>

          {/* Posters — arranged as cards so more posters/sections can be added here later */}
          <div className="mt-12">
            <h3 className="text-center font-display text-2xl text-[#F7E3B0] sm:text-3xl">Posters</h3>
            <div className="mt-6 grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <a
                href={POSTER_SRC}
                target="_blank"
                rel="noopener noreferrer"
                className="group block w-full max-w-[220px] text-center"
              >
                <div className="overflow-hidden rounded-xl border border-[#E7C77A]/50 shadow-xl">
                  <Image
                    src={POSTER_SRC}
                    alt="Decennial Celebration of CCSRR poster"
                    width={1600}
                    height={1600}
                    className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="mt-3 text-sm font-medium leading-snug text-[#FFF4DC]">
                  Decennial Celebration of CCSRR
                </p>
                <p className="mt-1 text-xs text-[#F0C97A]">Click to view full poster</p>
              </a>
            </div>
          </div>

          {celebrationItems.length > 0 && (
            <div className="mt-14">
              <h3 className="mb-6 text-center font-display text-2xl text-[#F7E3B0] sm:text-3xl">
                Decennial Celebration Lectures
              </h3>
              <GalleryGrid items={celebrationItems} showFilters={false} />
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <SectionHeading title="Gallery" subtitle="Photos from events and workshops" eyebrow="Moments" />
        <GalleryGrid items={otherItems} />
      </div>
    </div>
  );
}
