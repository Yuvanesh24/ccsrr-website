import type { Metadata } from "next";
import { getGalleryItems } from "@/lib/api";
import GalleryGrid from "@/components/GalleryGrid";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse photos from events, workshops, and activities at CCSRR, MAHE Manipal.",
  openGraph: {
    title: "Gallery | CCSRR | MAHE Manipal",
    description: "Browse photos from events, workshops, and activities at CCSRR, MAHE Manipal.",
  },
};

export default async function GalleryPage() {
  const galleryItems = await getGalleryItems();
  galleryItems.sort((a, b) => {
    const aYear = parseInt(a.title.match(/\b(20\d{2})\b/)?.[1] || "0");
    const bYear = parseInt(b.title.match(/\b(20\d{2})\b/)?.[1] || "0");
    return bYear - aYear;
  });

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Gallery" subtitle="Photos from events and workshops" eyebrow="Moments" />

        <GalleryGrid items={galleryItems} />
      </div>
    </div>
  );
}
