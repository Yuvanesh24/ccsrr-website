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
  const hasPoster = event.poster && event.poster !== "/placeholder.svg";

  if (hasPoster) {
    return (
      <div className="card-base bg-white relative lg:col-span-2">
        <div style={{ height: "3px", background: "linear-gradient(90deg, #B84A18, #D97706)", borderRadius: "3px 3px 0 0", position: "absolute", left: 0, right: 0, top: 0 }} />
        <div className="flex flex-col sm:flex-row p-5 sm:p-6 gap-5">
          <div className="flex-1 min-w-0 space-y-3">
            <StatusBadge status={event.isUpcoming ? "Upcoming" : "Completed"} />
            <h3 className="font-semibold text-[#1C1C1A] text-[15px] sm:text-base leading-snug">{event.title}</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] text-[#6B6860]">
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
              <p className="text-[14px] text-[#4A4845] leading-relaxed">{linkify(event.description)}</p>
            )}
          </div>
          <div className="shrink-0 flex items-start pt-1">
            <a href={event.poster} target="_blank" rel="noopener noreferrer">
              <Image
                src={event.poster}
                alt={event.title}
                width={160}
                height={220}
                className="w-32 sm:w-40 h-auto rounded-lg border border-[#E8E5E0] hover:opacity-90 transition-opacity shadow-sm object-cover"
              />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-base bg-white p-5 relative">
      <div style={{ height: "3px", background: "linear-gradient(90deg, #B84A18, #D97706)", borderRadius: "3px 3px 0 0", position: "absolute", left: 0, right: 0, top: 0 }} />
      <div className="space-y-3">
        <StatusBadge status={event.isUpcoming ? "Upcoming" : "Completed"} />
        <h3 className="font-semibold text-[#1C1C1A] text-[15px] sm:text-base leading-snug">{event.title}</h3>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] text-[#6B6860]">
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
          <p className="text-[14px] text-[#4A4845] leading-relaxed">{linkify(event.description)}</p>
        )}
      </div>
    </div>
  );
}
