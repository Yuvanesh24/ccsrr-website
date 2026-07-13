import type { Metadata } from "next";
import { getDevices } from "@/lib/api";
import DeviceCard from "@/components/DeviceCard";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Devices",
  description: "Discover the advanced rehabilitation devices and technology available at CCSRR, MAHE Manipal.",
  openGraph: {
    title: "Devices | CCSRR | MAHE Manipal",
    description: "Discover the advanced rehabilitation devices and technology available at CCSRR, MAHE Manipal.",
  },
};

export default async function DevicesPage() {
  const devices = await getDevices();

  if (devices.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Devices & Technology" subtitle="Device listings coming soon." />
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Devices & Technology" subtitle="Therapeutic devices and assessment technologies used at CCSRR" eyebrow="Innovation" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {devices.map((device) => (
            <DeviceCard key={device.id} device={device} />
          ))}
        </div>
      </div>
    </div>
  );
}
