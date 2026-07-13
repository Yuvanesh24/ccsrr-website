"use client";

import Image from "next/image";
import { Mail, X } from "lucide-react";
import type { Member } from "@/data/members";
import { useState } from "react";

interface MemberCardProps {
  member: Member;
}

function getInitials(name: string) {
  const parts = name.replace(/^(Dr\.|Mrs\.|Mr\.|Ms\.|Prof\.)\s*/i, "").trim().split(" ");
  return parts.slice(0, 2).map((p) => p[0]).join("").toUpperCase();
}

export default function MemberCard({ member }: MemberCardProps) {
  const initials = getInitials(member.name);
  const hasPhoto = member.photo && member.photo !== "/placeholder.svg";
  const isValidEmail = member.email && !member.email.includes("[") && member.email.includes("@");
  const [flipped, setFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="card-base [perspective:800px] relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setFlipped(false); }}
    >
      <div
        className="relative w-full transition-transform duration-500 [transform-style:preserve-3d] cursor-pointer"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)", minHeight: "340px" }}
        onClick={() => member.bio && setFlipped((prev) => !prev)}
      >
        {/* ── FRONT ── */}
        <div className="[backface-visibility:hidden] absolute inset-0 bg-white hover:bg-[#EBE5DE] rounded-lg transition-colors duration-150 flex flex-col" style={{ borderTop: "3px solid #B84A18" }}>

          {member.bio && isHovered && !flipped && (
            <div className="absolute inset-x-0 top-0 bottom-14 z-10 flex items-center justify-center bg-white/70 rounded-lg pointer-events-none">
              <span className="text-[13px] text-[#B84A18] font-semibold bg-white px-4 py-2 rounded-full shadow-sm border border-[#E8E5E0]">
                Click to see bio
              </span>
            </div>
          )}

          <div className="p-6 flex flex-col items-center text-center flex-1 pt-10">
            {hasPhoto ? (
              <Image
                src={member.photo}
                alt={member.name}
                width={96}
                height={96}
                className="shrink-0 h-24 w-24 rounded-full object-cover shadow-md mb-5"
                style={member.imagePosition ? { objectPosition: member.imagePosition } : undefined}
              />
            ) : (
              <div
                className="shrink-0 h-24 w-24 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md mb-5"
                style={{ background: "linear-gradient(135deg, #B84A18 0%, #963C14 100%)" }}
              >
                {initials}
              </div>
            )}

            <h3 className="font-semibold text-[#1C1C1A] text-[17px] leading-snug">
              {member.name}
            </h3>
            {member.qualification && (
              <p className="text-[14px] text-[#6B6860] mt-0.5 font-medium">{member.qualification}</p>
            )}
            {member.designation && (
              <p className="text-[13px] text-[#9A9795] mt-0.5 line-clamp-2">{member.designation}</p>
            )}
            {member.department && (
              <p className="text-[13px] text-[#B84A18] font-medium mt-1.5">{member.department}</p>
            )}

            <div className="flex-1" />

            {isValidEmail && (
              <a
                href={`mailto:${member.email}`}
                onClick={(e) => e.stopPropagation()}
                className="mt-5 pt-3 border-t border-[#F0EDE8] flex items-center gap-2 w-full justify-center"
              >
                <Mail className="h-4 w-4 shrink-0 text-[#B84A18]" />
                <span className="text-[13px] text-[#6B6860] hover:text-[#B84A18] transition-colors truncate">
                  {member.email}
                </span>
              </a>
            )}
          </div>
        </div>

        {/* ── BACK ── */}
        <div className="[backface-visibility:hidden] absolute inset-0 [transform:rotateY(180deg)] bg-white rounded-lg flex flex-col overflow-hidden" style={{ borderTop: "3px solid #B84A18" }}>
          <div className="p-6 flex flex-col flex-1 min-h-0">
            <div className="flex items-center justify-between mb-4 shrink-0">
              <h3 className="font-semibold text-[#1C1C1A] text-[15px]">{member.name}</h3>
              <X className="h-4 w-4 text-[#6B6860]" />
            </div>
            <div className="flex-1 overflow-y-auto min-h-0">
              <p className="text-[14px] text-[#4A4845] leading-relaxed text-left">
                {member.bio}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
