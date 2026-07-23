import type { Metadata } from "next";
import { getEvents } from "@/lib/api";
import EventCard from "@/components/EventCard";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Events",
  description: "View past and upcoming events, workshops, and seminars hosted by CCSRR, MAHE Manipal.",
  openGraph: {
    title: "Events | CCSRR | MAHE Manipal",
    description: "View past and upcoming events, workshops, and seminars hosted by CCSRR, MAHE Manipal.",
  },
};

export default async function EventsPage() {
  const events = await getEvents();
  const upcoming = events.filter((e) => e.isUpcoming);
  const past = events
    .filter((e) => !e.isUpcoming)
    .sort((a, b) => {
      const parseDate = (d: string) => {
        const match = d.match(/(\d{1,2})?\s*(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)?\w*\.?\s*(20\d{2})/i);
        if (!match) return 0;
        const months: Record<string, number> = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };
        const day = match[1] ? parseInt(match[1]) : 1;
        const month = months[(match[2] || "").slice(0, 3).toLowerCase()] || 1;
        const year = parseInt(match[3]);
        return year * 10000 + month * 100 + day;
      };
      return parseDate(b.date) - parseDate(a.date);
    });

  if (events.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Events" subtitle="Event details coming soon." />
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Events" subtitle="Workshops, conferences, seminars, and outreach" eyebrow="Coming Up" />

        {upcoming.length > 0 && (
          <section className="mb-12">
            <h2 className="font-display text-3xl text-[#1C1C1A] mb-6">Upcoming</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {upcoming.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}

        {past.length > 0 && (
          <section>
            <h2 className="font-display text-3xl text-[#1C1C1A] mb-6">Past Events</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {past.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
