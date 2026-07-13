"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import type { GalleryItem } from "@/data/gallery";
import { galleryCategories } from "@/data/gallery";

interface GalleryGridProps {
  items: GalleryItem[];
}

function ImageCarousel({ item, onOpen }: { item: GalleryItem; onOpen: (index: number) => void }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const images = item.images ?? [item.image];

  useEffect(() => {
    if (paused || images.length <= 1) return;
    timer.current = setInterval(() => {
      setIdx((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, images.length]);

  const prev = () => {
    setIdx((prev) => (prev - 1 + images.length) % images.length);
    setPaused(true);
  };
  const next = () => {
    setIdx((prev) => (prev + 1) % images.length);
    setPaused(true);
  };

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0 cursor-pointer" onClick={() => onOpen(idx)}>
        {images.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-500 ${i === idx ? "opacity-100" : "opacity-0"}`}
          >
            <Image src={src} alt={item.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center text-lg hover:bg-black/60 transition-colors"
          >
            ‹
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center text-lg hover:bg-black/60 transition-colors"
          >
            ›
          </button>
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setIdx(i); setPaused(true); }}
                className={`w-2 h-2 rounded-full transition-colors ${i === idx ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lightbox, setLightbox] = useState<{ item: GalleryItem; imageIndex: number } | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const touchX = useRef<number | null>(null);

  const navigateLightbox = (dir: number) => {
    setLightbox((prev) => {
      if (!prev) return null;
      const images = prev.item.images;
      if (!images || images.length <= 1) return prev;
      return { ...prev, imageIndex: (prev.imageIndex + dir + images.length) % images.length };
    });
  };

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") navigateLightbox(-1);
      if (e.key === "ArrowRight") navigateLightbox(1);
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox]);

  const getYouTubeEmbedUrl = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|watch\?v=))([\w-]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const filtered = activeCategory === "All"
    ? items
    : items.filter((i) => i.category === activeCategory);

  if (items.length === 0) {
    return (
      <div className="text-center py-16 text-[#6B6860]">
        <p className="text-sm">No gallery images yet.</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveCategory("All")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            activeCategory === "All"
              ? "bg-[#B84A18] text-white"
              : "bg-[#EBE5DE] text-[#6B6860] hover:bg-[#DDD5CC]"
          }`}
        >
          All
        </button>
        {galleryCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-[#B84A18] text-white"
                : "bg-[#EBE5DE] text-[#6B6860] hover:bg-[#DDD5CC]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-[#6B6860]">
          <p className="text-sm">No images in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="relative card-base overflow-hidden aspect-[4/3] bg-[#F5F3EF] cursor-pointer"
            >
              {item.images && item.images.length > 0 ? (
                <ImageCarousel item={item} onOpen={(i) => setLightbox({ item, imageIndex: i })} />
              ) : item.image && !item.image.endsWith("placeholder.svg") ? (
                <div className="absolute inset-0" onClick={() => setLightbox({ item, imageIndex: 0 })}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-[#9A9795] cursor-pointer" onClick={() => setLightbox({ item, imageIndex: 0 })}>
                  <div className="text-center p-4">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm font-medium text-[#6B6860]">{item.title}</p>
                    {item.description && (
                      <p className="text-xs text-[#9A9795] mt-1">{item.description}</p>
                    )}
                  </div>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 pt-8 pointer-events-none">
                <p className="text-white text-sm font-medium">{item.title}</p>
                <p className="text-white/80 text-xs">{item.category}</p>
              </div>
              {item.videoEmbed && (
                <button
                  onClick={(e) => { e.stopPropagation(); setVideoUrl(item.videoEmbed!); }}
                  className="absolute inset-0 flex items-center justify-center group cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full bg-red-600/90 flex items-center justify-center group-hover:bg-red-600 transition-colors shadow-lg">
                    <svg className="w-7 h-7 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const diff = touchX.current - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) navigateLightbox(diff > 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-10 right-0 text-white/80 hover:text-white text-xl"
            >
              Close
            </button>
            <div className="relative w-full aspect-[16/10]">
              <Image
                src={lightbox.item.images?.[lightbox.imageIndex] ?? lightbox.item.image}
                alt={lightbox.item.title}
                fill
                className="object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-12 pointer-events-none">
                <p className="text-white text-base font-medium">{lightbox.item.title}</p>
                {lightbox.item.description && (
                  <p className="text-white/80 text-sm mt-0.5">{lightbox.item.description}</p>
                )}
              </div>
            </div>
            {lightbox.item.images && lightbox.item.images.length > 1 && (
              <>
                <button
                  onClick={() => setLightbox((prev) => prev ? { ...prev, imageIndex: (prev.imageIndex - 1 + prev.item.images!.length) % prev.item.images!.length } : null)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center text-2xl hover:bg-black/60 transition-colors"
                >
                  ‹
                </button>
                <button
                  onClick={() => setLightbox((prev) => prev ? { ...prev, imageIndex: (prev.imageIndex + 1) % prev.item.images!.length } : null)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center text-2xl hover:bg-black/60 transition-colors"
                >
                  ›
                </button>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {lightbox.item.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setLightbox((prev) => prev ? { ...prev, imageIndex: i } : null)}
                      className={`w-2 h-2 rounded-full transition-colors ${i === lightbox.imageIndex ? "bg-white" : "bg-white/50"}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {videoUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => { setVideoUrl(null); }}
        >
          <div className="relative w-full max-w-3xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setVideoUrl(null)}
              className="absolute -top-10 right-0 text-white/80 hover:text-white text-xl"
            >
              Close
            </button>
            <iframe
              src={getYouTubeEmbedUrl(videoUrl) ?? ""}
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
