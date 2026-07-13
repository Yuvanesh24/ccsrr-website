import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
  eyebrow?: string;
}

export default function SectionHeading({ title, subtitle, className, align = "center", eyebrow }: SectionHeadingProps) {
  return (
    <div className={cn(className || "mb-10", align === "center" ? "text-center" : "")}>
      {eyebrow && (
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#B84A18] mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-4xl md:text-5xl text-[#1C1C1A] leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-3 text-[#6B6860] text-[16px] max-w-xl leading-relaxed", align === "center" && "mx-auto")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
