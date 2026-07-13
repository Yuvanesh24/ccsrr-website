import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusType = "Ongoing" | "Completed" | "Upcoming" | "Operational" | "In Development" | "Planned";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const colorMap: Record<StatusType, string> = {
    Ongoing: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Completed: "bg-blue-50 text-blue-700 border-blue-200",
    Upcoming: "bg-amber-50 text-amber-700 border-amber-200",
    Operational: "bg-emerald-50 text-emerald-700 border-emerald-200",
    "In Development": "bg-purple-50 text-purple-700 border-purple-200",
    Planned: "bg-gray-50 text-gray-700 border-gray-200",
  };

  return (
    <Badge variant="outline" className={cn(colorMap[status], "font-medium text-[11px] px-2 py-0.5", className)}>
      {status}
    </Badge>
  );
}
