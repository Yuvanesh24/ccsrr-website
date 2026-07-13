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
  const past = events.filter((e) => !e.isUpcoming);

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
