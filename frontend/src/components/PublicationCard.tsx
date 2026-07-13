import { ExternalLink } from "lucide-react";
import type { Publication, PublicationCategory } from "@/data/publications";

const CATEGORY_STYLES: Record<PublicationCategory, { bg: string; text: string }> = {
  Article:    { bg: "#FEF2ED", text: "#B84A18" },
  Review:     { bg: "#EDF3FC", text: "#1A5C9E" },
  Conference: { bg: "#EDF7F0", text: "#2A7A4E" },
  Editorial:  { bg: "#FEF8ED", text: "#B88A18" },
};

interface PublicationCardProps {
  publication: Publication;
}

export default function PublicationCard({ publication }: PublicationCardProps) {
  const style = CATEGORY_STYLES[publication.category];
  return (
    <div className="card-base bg-white p-5">
      <div style={{ height: "3px", background: "linear-gradient(90deg, #B84A18, #D97706)", borderRadius: "3px 3px 0 0", margin: "-20px -20px 16px -20px" }} />
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full" style={{ background: style.bg, color: style.text }}>
              {publication.category}
            </span>
            {publication.year && (
              <span className="text-[13px] text-[#9A9795]">{publication.year}</span>
            )}
          </div>
          <h3 className="font-semibold text-[#1C1C1A] text-[15px] leading-snug">{publication.title}</h3>
          <p className="text-[13px] text-[#6B6860] mt-1">{publication.authors}</p>
          <p className="text-[12px] text-[#9A9795] mt-0.5 italic">{publication.journal}</p>
        </div>
        {publication.link && (
          <a
            href={publication.link}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-[#C8C5C0] hover:text-[#B84A18] transition-colors mt-1"
            aria-label="View publication"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
}
