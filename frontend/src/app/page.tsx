import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Microscope, Users, BookOpen, Calendar } from "lucide-react";
import { getAllProjects } from "@/lib/api";
import { getEvents } from "@/lib/api";
import { getMembers } from "@/lib/api";
import { getPublications } from "@/lib/api";
import { partnerLogos } from "@/data/collaborations";
import ProjectCard from "@/components/ProjectCard";
import EventCard from "@/components/EventCard";
import MemberCard from "@/components/MemberCard";

export default async function HomePage() {
  const [{ fundedProjects, phdProjects, studentProjects }, events, members, publications] =
    await Promise.all([getAllProjects(), getEvents(), getMembers(), getPublications()]);

  const totalProjects = fundedProjects.length + phdProjects.length + studentProjects.length;
  const upcomingEvents = events.filter((e) => e.isUpcoming).slice(0, 3);
  const featuredProjects = [...fundedProjects, ...phdProjects].slice(0, 3);
  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: "linear-gradient(135deg, #2D1507 0%, #4A1C08 45%, #6B2B0E 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7">

              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.08] text-white uppercase tracking-wide">
                stroke rehabilitation research
              </h1>
              <p className="mt-2 text-sm text-white/50 tracking-wider uppercase">hosted by centre for comprehensive stroke rehabilitation and research <span className="text-[#D4825A] font-semibold">(ccsrr)</span></p>
              <p className="mt-6 text-[17px] text-white/65 max-w-lg leading-relaxed">
                Advancing stroke recovery through cutting-edge research, innovative clinical practices,
                and interdisciplinary collaboration, translating evidence into meaningful outcomes.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 shadow-lg hero-cta-primary"
                >
                  Explore Research <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm border border-white/20 text-white/90 hover:bg-white/10 transition-colors"
                >
                  About Us
                </Link>
              </div>
            </div>

              <div className="lg:col-span-5 space-y-5">
              {partnerLogos.length > 0 && (
                <div
                  className="rounded-xl p-4"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div className="grid grid-cols-4 gap-3">
                    {partnerLogos.map((logo) => (
                      <div key={logo.src} className="flex items-center justify-center">
                        <Image
                          src={logo.src}
                          alt={logo.name}
                          width={100}
                          height={44}
                          className="w-full h-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: `${totalProjects}+`, label: "Research Projects", icon: Microscope },
                  { value: `${members.length}`, label: "Team Members", icon: Users },
                  { value: `${publications.length}`, label: "Publications", icon: BookOpen },
                  { value: "2016", label: "Established", icon: Calendar },
                ].map(({ value, label, icon: Icon }) => (
                  <div
                    key={label}
                    className="rounded-xl p-4 text-center"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    <Icon className="h-5 w-5 mx-auto mb-2 opacity-70" style={{ color: "#F4A87A" }} />
                    <p className="text-3xl font-bold text-white">{value}</p>
                    <p className="text-[11px] text-white/50 mt-0.5 uppercase tracking-wide">{label}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── UPCOMING EVENTS ── */}
      {upcomingEvents.length > 0 && (
        <section className="section-py" style={{ background: "#FAFAF8" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#B84A18] mb-2">
                  Coming Up
                </p>
                <h2 className="font-display text-4xl md:text-5xl text-[#1C1C1A]">Upcoming Events</h2>
                <p className="text-[#6B6860] mt-2 text-[16px]">Workshops, conferences, and seminars</p>
              </div>
              <Link
                href="/events"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[#B84A18] hover:text-[#963C14] transition-colors"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── RESEARCH UPDATES ── */}
      <section className="section-py" style={{ background: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#B84A18] mb-3">
              Latest
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-[#1C1C1A]">Research Updates</h2>
            <p className="mt-3 text-[#6B6860] max-w-lg mx-auto text-[16px]">
              Recent news and developments from CCSRR
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                date: "Jun 2026",
                title: "Dr. John Solomon M elected to WSO Board of Directors",
                excerpt: "Dr. John Solomon M has been elected to the Board of Directors of the World Stroke Organization, representing the Asia/Oceania Region for the term 2026-2030.",
              },
              {
                date: "Mar 2026",
                title: "HOMER Project Receives ICMR Funding",
                excerpt: "Multi-centre trial for home-based robot-assisted upper-limb training for stroke in India receives ICMR Intermediate Grant.",
              },
              {
                date: "Jan 2026",
                title: "Prof. Dorcas Gandhi wins future leader award",
                excerpt: "Prof. Dorcas BC Gandhi receives the prestigious Future Leader of Stroke Rehabilitation Award 2024-2026 for her contributions to stroke rehabilitation research.",
              },
            ].map((update) => (
              <div key={update.title} className="card-base bg-white p-5">
                  <p className="text-[12px] font-semibold text-[#B84A18] uppercase tracking-wide mb-2">{update.date}</p>
                  <h3 className="font-semibold text-[15px] text-[#1C1C1A] mb-2 leading-snug">{update.title}</h3>
                  <p className="text-[14px] text-[#6B6860] leading-relaxed">{update.excerpt}</p>
                </div>
              ))}
            </div>
          </div>
      </section>

      {/* ── FOCUS AREAS ── */}
      <section className="section-py bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#B84A18] mb-3">
              What We Do
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-[#1C1C1A]">Our Focus Areas</h2>
            <p className="mt-3 text-[#6B6860] max-w-lg mx-auto text-[16px]">
              Five pillars driving our mission to transform stroke rehabilitation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "Stroke Rehabilitation",
                desc: "Investigating motor recovery, neuroplasticity, and functional outcomes through clinical trials and innovative therapy approaches.",
                items: ["Upper limb motor recovery", "Physical activity promotion","Aphasia & Dysphagia management"],
                color: "#B84A18",
              },
              {
                num: "02",
                title: "Rehabilitation Technology",
                desc: "Developing and validating therapeutic devices, robotic systems, and neuromodulation techniques for stroke recovery.",
                items: ["Game-based rehabilitation", "Wearable sensor systems", "Gait & balance training"],
                color: "#7C3AED",
              },
              {
                num: "03",
                title: "Clinical Neuroscience",
                desc: "Understanding neural mechanisms of recovery and developing evidence-based protocols for comprehensive stroke care.",
                items: ["Neuromodulation", "Post-stroke fatigue", "Motor recovery"],
                color: "#047857",
              },
            ].map((area) => (
                <div key={area.num} className="card-base bg-white p-6">
                <div
                  className="text-[12px] font-bold tracking-widest mb-4"
                  style={{ color: area.color, opacity: 0.5 }}
                >
                  {area.num}
                </div>
                <h3 className="font-semibold text-[18px] text-[#1C1C1A] mb-2">{area.title}</h3>
                <p className="text-[15px] text-[#6B6860] leading-relaxed mb-4">{area.desc}</p>
                <ul className="space-y-2">
                  {area.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[14px] text-[#4A4845]">
                      <div
                        className="h-1.5 w-1.5 rounded-full shrink-0"
                        style={{ background: area.color }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-6 mt-6">
            <div className="flex-1 w-full">
              <div className="card-base bg-white p-6">
                <div className="text-[12px] font-bold tracking-widest mb-4" style={{ color: "#0369A1", opacity: 0.5 }}>04</div>
                <h3 className="font-semibold text-[18px] text-[#1C1C1A] mb-2">Evidence Based Practice</h3>
                <p className="text-[15px] text-[#6B6860] leading-relaxed mb-4">Translating research into clinical practice for better stroke care.</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-[14px] text-[#4A4845]">
                    <div className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "#0369A1" }} />
                    Evaluation of healthcare practices
                  </li>
                  <li className="flex items-center gap-2 text-[14px] text-[#4A4845]">
                    <div className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "#0369A1" }} />
                    Development of clinical practice guidelines
                  </li>
                  <li className="flex items-center gap-2 text-[14px] text-[#4A4845]">
                    <div className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "#0369A1" }} />
                    Application of implementation science principles
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="card-base bg-white p-6">
                <div className="text-[12px] font-bold tracking-widest mb-4" style={{ color: "#9333EA", opacity: 0.5 }}>05</div>
                <h3 className="font-semibold text-[18px] text-[#1C1C1A] mb-2">Assessment &amp; Predictions</h3>
                <p className="text-[15px] text-[#6B6860] leading-relaxed mb-4">Measuring outcomes and predicting recovery to guide clinical decisions.</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-[14px] text-[#4A4845]">
                    <div className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "#9333EA" }} />
                    Qualitative and quantitative assessments
                  </li>
                  <li className="flex items-center gap-2 text-[14px] text-[#4A4845]">
                    <div className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "#9333EA" }} />
                    Development and validation of prediction models
                  </li>
                  <li className="flex items-center gap-2 text-[14px] text-[#4A4845]">
                    <div className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "#9333EA" }} />
                    Data driven analysis to support healthcare planning
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM PREVIEW ── */}
      <section className="section-py" style={{ background: "#FAFAF8" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#B84A18] mb-2">
                The People
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-[#1C1C1A]">Our Team</h2>
              <p className="text-[#6B6860] mt-2 text-[16px]">
                Researchers, clinicians, and scholars driving innovation
              </p>
            </div>
            <Link
              href="/members"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[#B84A18] hover:text-[#963C14] transition-colors"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {members
              .filter((m) =>
                ["Dr. John Solomon M", "Dr. Manikandan Natarajan", "Dr. Senthil Kumaran D", "Dr. Gopee Krishnan"].includes(m.name)
              )
              .map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>

          <div className="mt-6 text-center sm:hidden">
            <Link
              href="/members"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#B84A18]"
            >
              View all members <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      {featuredProjects.length > 0 && (
        <section className="section-py bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#B84A18] mb-2">
                  Active Work
                </p>
                <h2 className="font-display text-4xl md:text-5xl text-[#1C1C1A]">Research Projects</h2>
                <p className="text-[#6B6860] mt-2 text-[16px]">Funded research and doctoral work</p>
              </div>
              <Link
                href="/projects"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[#B84A18] hover:text-[#963C14] transition-colors"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}

    </>
  );
}
