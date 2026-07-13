import type { Metadata } from "next";
import Image from "next/image";
import { getPageContent } from "@/lib/api";
import { nationalCollaborations, internationalCollaborations } from "@/data/collaborations";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about the Centre for Comprehensive Stroke Rehabilitation & Research (CCSRR) at MAHE Manipal — our mission, vision, and team.",
  openGraph: {
    title: "About | CCSRR | MAHE Manipal",
    description: "Learn about CCSRR at MAHE Manipal — our mission, vision, and team.",
  },
};

const defaultObjectives = [
  "To provide health services for maximizing the recovery of stroke survivors and achieve best possible outcome through an inter-professional practice",
  "To foster innovation, and to train and mentor students, researchers and health care providers",
  "To conduct short term training courses and workshops",
  "To expand the rehabilitation services to community living stroke survivors",
  "To establish international collaborations for research",
];

export default async function AboutPage() {
  const [vision, mission, objectives, aboutIntro] = await Promise.all([
    getPageContent("vision"),
    getPageContent("mission"),
    getPageContent("objectives"),
    getPageContent("about-intro"),
  ]);
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="About Stroke Rehabilitation Research" subtitle="Understanding stroke rehabilitation" eyebrow="Who We Are" />

        <div className="max-w-4xl mx-auto mb-12 text-justify space-y-5">
          <p className="text-[16px] text-[#4A4845] leading-relaxed">
            Stroke remains one of the leading causes of long-term disability worldwide, yet the brain's remarkable capacity for recovery continues to inspire new frontiers in rehabilitation research.             Despite advances in stroke management, a significant proportion of survivors continue to experience persistent functional deficits, highlighting a critical gap in evidence-based rehabilitation strategies. Grounded in the neurophysiological principles of neuroplasticity, our research systematically investigates innovative rehabilitation approaches through rigorously designed clinical trials, translating scientific evidence into meaningful functional outcomes for stroke survivors.
          </p>
          {aboutIntro?.content && (
            <>
              <h3 className="font-display text-3xl text-[#1C1C1A] mt-8 mb-2 text-center">About CCSRR</h3>
              <p className="text-[16px] text-[#4A4845] leading-relaxed">
                The Centre for Comprehensive Stroke Rehabilitation & Research (CCSRR) was established in 2016 under MAHE, Manipal. The centre is dedicated to advancing stroke rehabilitation through cutting-edge research, innovative clinical practices, and interdisciplinary collaboration. CCSRR brings together experts from physiotherapy, occupational therapy, speech-language pathology, clinical psychology, optometry, medical imaging technology, clinical nutrition & dietetics, neurology, biomedical engineering, and related fields to create a comprehensive approach to stroke recovery.
              </p>
            </>
          )}
        </div>

        <div className="space-y-5 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-5">
            <div className="card-base p-6">
              <div style={{ height: "3px", background: "#B84A18", borderRadius: "3px 3px 0 0", margin: "-24px -24px 16px -24px" }} />
              <h2 className="font-display text-2xl text-[#1C1C1A] mb-3">{vision?.title || "Vision"}</h2>
              <p className="text-[15px] text-[#6B6860] leading-relaxed">{vision?.content || "To become a centre for excellence in stroke rehabilitation"}</p>
            </div>
            <div className="card-base p-6">
              <div style={{ height: "3px", background: "#B84A18", borderRadius: "3px 3px 0 0", margin: "-24px -24px 16px -24px" }} />
              <h2 className="font-display text-2xl text-[#1C1C1A] mb-3">{mission?.title || "Mission"}</h2>
              <p className="text-[15px] text-[#6B6860] leading-relaxed">{mission?.content || "To conduct high quality research, training programs and to deliver comprehensive stroke rehabilitation services"}</p>
            </div>
          </div>
          <div className="card-base p-6">
            <div style={{ height: "3px", background: "#B84A18", borderRadius: "3px 3px 0 0", margin: "-24px -24px 16px -24px" }} />
            <h2 className="font-display text-2xl text-[#1C1C1A] mb-3">{objectives?.title || "Objectives"}</h2>
            <ul className="text-[15px] text-[#6B6860] space-y-2">
              {(objectives?.contentList || defaultObjectives).map((obj, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#B84A18] mt-2 shrink-0" />
                  {obj}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <SectionHeading title="National Collaborations" eyebrow="" />
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-8 items-center">
            {nationalCollaborations.map((collab) => (
              collab.logo === "/placeholder.svg" ? (
                <span key={collab.name} className="text-[13px] text-[#6B6860] font-medium text-center leading-snug">{collab.name}</span>
              ) : (
                <Image
                  key={collab.name}
                  src={collab.logo}
                  alt={collab.name}
                  width={200}
                  height={80}
                  className="h-20 w-full object-contain"
                />
              )
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-10">
          <SectionHeading title="International Collaborations" />
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-8 items-center">
            {internationalCollaborations.map((collab) => (
              collab.logo === "/placeholder.svg" ? (
                <span key={collab.name} className="text-[13px] text-[#6B6860] font-medium text-center leading-snug">{collab.name}</span>
              ) : (
                <Image
                  key={collab.name}
                  src={collab.logo}
                  alt={collab.name}
                  width={200}
                  height={80}
                  className="h-20 w-full object-contain"
                />
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
