import type { Device } from "@/data/devices";
import StatusBadge from "@/components/StatusBadge";

interface DeviceCardProps {
  device: Device;
}

export default function DeviceCard({ device }: DeviceCardProps) {
  return (
    <div className="card-base bg-white p-5">
      <div style={{ height: "3px", background: "linear-gradient(90deg, #B84A18, #D97706)", borderRadius: "3px 3px 0 0", margin: "-20px -20px 16px -20px" }} />
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-semibold text-[#1C1C1A] text-[15px] leading-snug">{device.name}</h3>
        <StatusBadge status={device.status} />
      </div>
      {device.description && (
        <p className="text-[14px] text-[#4A4845] leading-relaxed line-clamp-3">{device.description}</p>
      )}
      {device.location && (
        <p className="text-[12px] text-[#9A9795] mt-3 pt-3 border-t border-[#F0EDE8]">
          <span className="text-[#6B6860] font-medium">Location:</span> {device.location}
        </p>
      )}
    </div>
  );
}
