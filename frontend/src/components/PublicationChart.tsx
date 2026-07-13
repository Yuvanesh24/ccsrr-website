"use client";
import type { PublicationCategory } from "@/data/publications";

interface ChartProps {
  counts: Record<PublicationCategory, number>;
  selected: PublicationCategory | null;
  onSelect: (cat: PublicationCategory | null) => void;
}

const LABELS: { key: PublicationCategory; label: string; color: string }[] = [
  { key: "Article",    label: "Articles",               color: "#E05C2A" },
  { key: "Review",     label: "Reviews",                color: "#2D7DD2" },
  { key: "Conference", label: "Conference Proceedings", color: "#3BB273" },
  { key: "Editorial",  label: "Editorials",             color: "#F4B942" },
];

const CX = 160, CY = 160, R = 148, GAP = 1.2;

function polar(cx: number, cy: number, r: number, deg: number): [number, number] {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

function arc(s: number, e: number) {
  const [x1, y1] = polar(CX, CY, R, s);
  const [x2, y2] = polar(CX, CY, R, e);
  return `M${CX},${CY} L${x1},${y1} A${R},${R} 0 ${e - s > 180 ? 1 : 0} 1 ${x2},${y2} Z`;
}

export default function PublicationChart({ counts, selected, onSelect }: ChartProps) {
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  const DATA = LABELS.map(({ key, label, color }) => ({
    key, label, color,
    pct: total > 0 ? Math.round((counts[key] / total) * 100) : 0,
    count: counts[key],
  }));

  let angle = 0;
  const slices = DATA.map((d, i) => {
    const sweep = (d.pct / 100) * 360;
    const s = angle + GAP / 2, e = angle + sweep - GAP / 2;
    angle += sweep;
    const mid = (s + e) / 2;
    const [ox, oy] = polar(0, 0, 18, mid);
    const [tx, ty] = polar(CX, CY, R * 0.56, mid);
    return { ...d, s, e, ox, oy, tx, ty, i };
  });

  return (
    <div className="flex flex-col items-center gap-6 py-6">

      <div className="flex items-center gap-10">
        <div className="relative">
          <svg width="280" height="280" viewBox="0 0 320 320" style={{ overflow: "visible" }}>
            {slices.map(({ label, pct, color, s, e, ox, oy, tx, ty, i, key }) => {
              const isSelected = selected === key;
              const isDim = selected !== null && !isSelected;
              return (
                <g key={key} style={{ cursor: "pointer" }} onClick={() => onSelect(isSelected ? null : key)}>
                  <path
                    d={arc(s, e)}
                    fill={color}
                    style={{
                      transformOrigin: `${CX}px ${CY}px`,
                      transform: isSelected ? `translate(${ox}px,${oy}px) scale(1.03)` : "none",
                      opacity: isDim ? 0.25 : 1,
                      transition: "transform 0.28s cubic-bezier(.34,1.56,.64,1), opacity 0.2s",
                    }}
                  />
                  {isSelected && (
                    <text
                      x={tx} y={ty}
                      textAnchor="middle" dominantBaseline="middle"
                      fill="#fff" fontSize="13" fontWeight="500"
                      style={{ pointerEvents: "none" }}
                    >
                      {label} · {pct}%
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        <div
          className="flex flex-col items-start gap-1"
          style={{ cursor: selected ? "pointer" : "default" }}
          onClick={() => selected && onSelect(null)}
        >
          <span
            className="text-6xl font-semibold text-gray-900 dark:text-gray-100 leading-none tabular-nums"
            style={{ fontFamily: "Inter, 'Helvetica Neue', Arial, sans-serif" }}
          >
            {selected ? counts[selected] : total}
          </span>
          <span
            className="text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wide"
            style={{ fontFamily: "Inter, 'Helvetica Neue', Arial, sans-serif" }}
          >
            {selected ? `${selected.toLowerCase()} · click to show all` : "Total publications"}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 max-w-md">
        {slices.map(({ label, pct, color, key }) => {
          const isSelected = selected === key;
          return (
            <button
              key={key}
              onClick={() => onSelect(isSelected ? null : key)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl transition-colors cursor-pointer border-0"
              style={{
                background: isSelected ? `${color}18` : "transparent",
                outline: isSelected ? `2px solid ${color}` : "none",
              }}
              onMouseEnter={() => {}}
              onMouseLeave={() => {}}
            >
              <span className="w-3 h-3 rounded-[3px] flex-shrink-0" style={{ background: color }} />
              <span className="text-[15px]" style={{ color: "var(--foreground)" }}>{label}</span>
              <span className="text-[15px] font-medium" style={{ color }}>{pct}%</span>
            </button>
          );
        })}
      </div>

    </div>
  )
}
