import type { Metadata } from "next";
import { getAllProjects } from "@/lib/api";
import type { PhDProject, FundedProject } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore ongoing and completed stroke rehabilitation research projects at CCSRR, MAHE Manipal.",
  openGraph: {
    title: "Projects | CCSRR | MAHE Manipal",
    description: "Explore ongoing and completed stroke rehabilitation research projects at CCSRR, MAHE Manipal.",
  },
};

const fundedTitles = [
  "Home-based Gamified, Intensive, and Functional Tele-rehabilitation (Home-GIFT) device to improve Upper Limb Function following Stroke",
  "HOMER: Home-based robot-assisted upper-limb training for stroke in India",
  "Effect of Home-based Game rehabilitation on sensory motor recovery and cognitive functions after stroke",
  "ENHANCE: Enhancing brain plasticity for sensorimotor recovery in spastic hemiparesis",
  "Activity levels of stroke survivors in hospital settings: A multi-centre study",
  "Physical activity promotion for stroke survivors living in community",
  "Development and feasibility of Adaptive sports for promoting physical activity in community dwelling stroke survivors",
  "Development and testing of a web portal for facilitating adherence to home-based physical exercises among community-dwelling stroke survivors",
];

const collaborativeTitles = [
  "App based tele-stroke rehabilitation platform for stroke (ATTEND-2)",
];

const hiddenTitles = [
  "ENHANCE proof-of-concept three-arm randomized trial: Effects of reaching training of the hemiparetic upper limb",
];

export default async function ProjectsPage() {
  const { fundedProjects, phdProjects, studentProjects } = await getAllProjects();
  const fundedOnly = fundedProjects.filter((p) => fundedTitles.includes(p.title));
  const collaborativeOnly = fundedProjects.filter((p) => collaborativeTitles.includes(p.title));
  const restForPhD = fundedProjects.filter((p) => !fundedTitles.includes(p.title) && !collaborativeTitles.includes(p.title) && !hiddenTitles.includes(p.title));
  const phdResearch = [...restForPhD, ...phdProjects];
  const hasFunded = fundedOnly.length > 0;
  const hasCollaborative = collaborativeOnly.length > 0;
  const hasPhD = phdResearch.length > 0;
  const hasStudent = studentProjects.length > 0;
  const fundedSorted = [...fundedOnly].sort((a, b) => {
    if (a.status === "Completed" && b.status !== "Completed") return -1;
    if (a.status !== "Completed" && b.status === "Completed") return 1;
    return 0;
  });
  const collaborativeSorted = [...collaborativeOnly].sort((a, b) => {
    if (a.status === "Completed" && b.status !== "Completed") return -1;
    if (a.status !== "Completed" && b.status === "Completed") return 1;
    return 0;
  });
const completedOrder = [
  "Vasanthan", "Amreen", "Pradeep", "Wasim", "Sanjukta",
  "Chanchal", "Apoorva", "Arunima", "Rajath", "Sulfikar",
  "Alexander", "Arnold", "Akhila",
];

const ongoingOrder = [
  "Subramanian", "Intiaz", "Sanya", "Dorcas", "Nistara",
  "Aparna", "Siddharth", "Tancia", "Farah", "Akshay",
  "Meghashree", "Karthikeyan",
];

const phdOrder = [...completedOrder, ...ongoingOrder];

function phdSortKey(p: FundedProject | PhDProject): number {
  if (!("studentName" in p)) return 999;
  const idx = phdOrder.findIndex((name) => p.studentName.toLowerCase().includes(name.toLowerCase()));
  return idx === -1 ? 999 : idx;
}

const phdSorted = [...phdResearch].sort((a, b) => {
  const aComp = a.status === "Completed" ? 0 : 1;
  const bComp = b.status === "Completed" ? 0 : 1;
  if (aComp !== bComp) return aComp - bComp;
  return phdSortKey(a) - phdSortKey(b);
});

  if (!hasFunded && !hasCollaborative && !hasPhD && !hasStudent) {
    return (
      <div className="py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Research Projects" subtitle="Project details coming soon." />
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Research Projects" subtitle="Funded research, doctoral work, and student projects" eyebrow="Active Work" />

        <div className="space-y-12">
          {hasFunded && (
            <section>
              <h2 className="font-display text-3xl text-[#1C1C1A] mb-1">Funded Projects</h2>
              <p className="text-[15px] text-[#6B6860] mb-6">Government-funded and sponsored research</p>
              <div className="grid md:grid-cols-2 gap-5">
                {fundedSorted.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>
          )}

          {hasCollaborative && (
            <section>
              <h2 className="font-display text-3xl text-[#1C1C1A] mb-1">Collaborative Research</h2>
              <p className="text-[15px] text-[#6B6860] mb-6">Joint research across institutions</p>
              <div className="grid md:grid-cols-2 gap-5">
                {collaborativeSorted.map((project) => (
                  <ProjectCard key={project.id} project={project} collaborative />
                ))}
              </div>
            </section>
          )}

          {hasPhD && (
            <section>
              <h2 className="font-display text-3xl text-[#1C1C1A] mb-1">PhD Research</h2>
              <p className="text-[15px] text-[#6B6860] mb-6">Doctoral research projects</p>
              <div className="grid md:grid-cols-2 gap-5">
                {phdSorted.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
}
