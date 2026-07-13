import StatusBadge from "@/components/StatusBadge";
import { Calendar, MapPin } from "lucide-react";
import type { Event } from "@/data/events";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="card-base bg-white p-5">
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
        <p className="text-[14px] text-[#4A4845] mt-3 leading-relaxed">{event.description}</p>
      )}
    </div>
  );
}
