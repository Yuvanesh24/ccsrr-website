import type { CSSProperties } from "react";

const colors = ["#B84A18", "#E8A05C", "#FBD9BF", "#8C3A12", "#F4C27A"];

function Burst({ side }: { side: "left" | "right" }) {
  return (
    <div className={`pop-blast pop-blast-${side}`} aria-hidden="true">
      {Array.from({ length: 14 }).map((_, i) => {
        const angle = (i / 14) * Math.PI * 2;
        const distance = 58 + (i % 3) * 16;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        return (
          <span
            key={i}
            className="pop-particle"
            style={
              {
                "--mid-x": `${(x * 0.35).toFixed(1)}px`,
                "--mid-y": `${(y * 0.35).toFixed(1)}px`,
                "--end-x": `${x.toFixed(1)}px`,
                "--end-y": `${y.toFixed(1)}px`,
                "--delay": `${(i % 5) * 45}ms`,
                backgroundColor: colors[i % colors.length],
                width: i % 3 === 0 ? "7px" : "5px",
                height: i % 3 === 0 ? "7px" : "5px",
                borderRadius: i % 2 === 0 ? "50%" : "2px",
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
}

export default function SymposiumPopBlast() {
  return (
    <>
      <Burst side="left" />
      <Burst side="right" />
    </>
  );
}
