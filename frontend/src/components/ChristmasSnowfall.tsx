import type { CSSProperties } from "react";

function snowflakes() {
  let seed = 20261225;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  return Array.from({ length: 55 }).map((_, i) => {
    const size = 2 + random() * 5;
    return {
      id: i,
      style: {
        "--left": `${(random() * 100).toFixed(2)}%`,
        "--size": `${size.toFixed(2)}px`,
        "--delay": `${(-random() * 18).toFixed(2)}s`,
        "--duration": `${(9 + random() * 11).toFixed(2)}s`,
        "--drift": `${(random() * 90 - 45).toFixed(1)}px`,
        "--opacity": (0.35 + random() * 0.5).toFixed(2),
      } as CSSProperties,
    };
  });
}

export default function ChristmasSnowfall() {
  return (
    <div className="christmas-snow" aria-hidden="true">
      {snowflakes().map((flake) => (
        <span key={flake.id} className="christmas-snowflake" style={flake.style} />
      ))}
    </div>
  );
}
