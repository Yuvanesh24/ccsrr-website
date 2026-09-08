"use client";

import Image from "next/image";
import { Calendar, MapPin, X, ZoomIn } from "lucide-react";
import { useState } from "react";
import type { Event } from "@/data/events";

export default function DecennialLectureCard({ event }: { event: Event }) {
  const [open, setOpen] = useState(false);
  const hasPoster = event.poster && event.poster !== "/placeholder.svg";
  const title = event.title.replace("CCSRR Decennial Lecture Series — ", "");

  return (
    <>
      <div
        className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col cursor-pointer"
        style={{ borderTop: "3px solid #B84A18" }}
        onClick={() => hasPoster && setOpen(true)}
      >
        {hasPoster && (
          <div className="relative w-full aspect-[3/4] bg-[#F5F3EF] group">
            <Image
              src={event.poster}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 pt-12 bg-gradient-to-t from-black/75 via-black/40 to-transparent">
              <span className="text-[17px] leading-snug text-white font-semibold block">
                Lecture {event.lectureNumber}
              </span>
              <h3 className="text-[15px] leading-snug text-white/95 font-medium">{title}</h3>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1.5 text-[14px] font-semibold text-white bg-black/40 px-3 py-1.5 rounded-full">
                <ZoomIn className="h-4 w-4" /> View full poster
              </span>
            </div>
          </div>
        )}
        <div className="p-6 flex flex-col flex-1">
          <div className="mt-3 space-y-1.5 text-[14px]">
            <p className="text-[#4A4845]">
              <span className="font-semibold text-[#1C1C1A]">Speaker:</span> {event.speakerName}
            </p>
            <p className="text-[#6B6860]">{event.speakerDept}</p>
          </div>
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[#F0EDE8] text-[13px] text-[#6B6860]">
            <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {event.date}</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {event.venue}</span>
          </div>
        </div>
      </div>

      {open && hasPoster && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-8"
          onClick={() => setOpen(false)}
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="h-7 w-7" />
          </button>
          <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={event.poster}
              alt={title}
              width={1080}
              height={1528}
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="mt-4 text-center">
              <p className="font-semibold text-white text-lg">{title}</p>
              <p className="text-white/70 text-sm mt-1">Lecture {event.lectureNumber} • {event.speakerName}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}