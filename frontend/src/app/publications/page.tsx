"use client";
import { useState, useMemo, useEffect } from "react";
import type { PublicationCategory } from "@/data/publications";
import type { Publication } from "@/data/publications";
import PublicationCard from "@/components/PublicationCard";
import SectionHeading from "@/components/SectionHeading";
import PublicationChart from "@/components/PublicationChart";

export default function PublicationsPage() {
  const [selectedCategory, setSelectedCategory] = useState<PublicationCategory | null>(null);
  const [publications, setPublications] = useState<Publication[] | null>(null);

  useEffect(() => {
    fetch("/api/publications")
      .then((res) => res.json())
      .then(setPublications)
      .catch(() => setPublications([]));
  }, []);

  const counts = useMemo(() => {
    if (!publications) return { Article: 0, Review: 0, Conference: 0, Editorial: 0 };
    const c: Record<PublicationCategory, number> = { Article: 0, Review: 0, Conference: 0, Editorial: 0 };
    publications.forEach(p => { c[p.category]++; });
    return c;
  }, [publications]);

  const filtered = selectedCategory && publications
    ? publications.filter(p => p.category === selectedCategory)
    : publications || [];

  if (!publications) {
    return (
      <div className="py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Publications" subtitle="Loading publications..." />
        </div>
      </div>
    );
  }

  if (publications.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Publications" subtitle="Publications coming soon." />
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Publications" subtitle="Journal articles, conference proceedings, and research output" eyebrow="Research Output" />

        <div className="max-w-5xl mx-auto">
          <PublicationChart counts={counts} selected={selectedCategory} onSelect={setSelectedCategory} />
        </div>

        <div className="max-w-4xl mx-auto space-y-4 mt-4">
          {filtered.map((publication) => (
            <PublicationCard key={publication.id} publication={publication} />
          ))}
        </div>
      </div>
    </div>
  );
}














