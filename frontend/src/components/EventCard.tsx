import Image from "next/image";
import StatusBadge from "@/components/StatusBadge";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import type { Event } from "@/data/events";

function linkify(text: string): React.ReactNode[] {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, i) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#B84A18] hover:text-[#963C14] underline underline-offset-2 inline-flex items-center gap-1"
        >
          {part.length > 60 ? part.slice(0, 60) + "…" : part}
          <ExternalLink className="h-3 w-3 shrink-0" />
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="card-base bg-white p-5 flex flex-col">
      <div style={{ height: "3px", background: "linear-gradient(90deg, #B84A18, #D97706)", borderRadius: "3px 3px 0 0", margin: "-20px -20px 16px -20px" }} />
      <div className="mb-3">
        <StatusBadge status={event.isUpcoming ? "Upcoming" : "Completed"} />
      </div>
      <h3 className="font-semibold text-[#1C1C1A] text-[15px] leading-snug">{event.title}</h3>
      <div className="flex flex-col gap-1.5 mt-3 text-[13px] text-[#6B6860]">
        <div className="flex items-center gap-2">
          <Calendar className="h-3.5 w-3.5 shrink-0 text-[#B84A18]" />
          <span>{event.date.replace(/-01-01$/, "")}</span>
        </div>
        {event.venue && (
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-[#B84A18]" />
            <span>{event.venue}</span>
          </div>
        )}
      </div>
      {event.description && (
        <p className="text-[14px] text-[#4A4845] mt-3 leading-relaxed">{linkify(event.description)}</p>
      )}
      {event.poster && event.poster !== "/placeholder.svg" && (
        <div className="mt-auto pt-4">
          <a href={event.poster} target="_blank" rel="noopener noreferrer">
            <Image
              src={event.poster}
              alt={event.title}
              width={400}
              height={300}
              className="w-full h-auto rounded-lg object-cover border border-[#E8E5E0] hover:opacity-90 transition-opacity shadow-sm"
            />
          </a>
        </div>
      )}
    </div>
  );
}
