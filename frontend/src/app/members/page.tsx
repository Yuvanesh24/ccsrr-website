import type { Metadata } from "next";
import Image from "next/image";
import { getMembers } from "@/lib/api";
import MemberCard from "@/components/MemberCard";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Members",
  description: "Meet the multidisciplinary team of researchers, clinicians, and collaborators at CCSRR, MAHE Manipal.",
  openGraph: {
    title: "Members | CCSRR | MAHE Manipal",
    description: "Meet the multidisciplinary team at CCSRR, MAHE Manipal.",
  },
};

export default async function MembersPage() {
  const members = await getMembers();
  if (members.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Our Team" subtitle="Member profiles coming soon." />
        </div>
      </div>
    );
  }

  const coordinator = members.find((m) => m.category === "Coordinator");
  const teamMembers = members.filter((m) => m.group === "team" && m.category !== "Coordinator");
  const faculties = teamMembers
    .filter((m) => {
      const sid = m.staticId ? Number(m.staticId) : NaN;
      if (isNaN(sid)) return m.category === "Faculty";
      return sid >= 2 && sid <= 18;
    })
    .sort((a, b) => {
      const order = [
        "Dr. Manikandan Natarajan",
        "Dr. Senthil Kumaran D",
        "Dr. Gopee Krishnan",
        "Dr. Krithica S",
        "Dr. Shwetha T S",
        "Dr. Priyanka",
        "Mrs. Anagha Deshmukh",
        "Dr. Apoorva M Shankaranarayana",
        "Dr. Shashank Mehrotra",
        "Ms. Amrutha MS",
        "Ms. Maya Verma R",
        "Dr. Arunima Biswas",
        "Dr. K Vijaya Kumar",
        "Dr. Akshatha Nayak",
        "Dr. Radhika K",
        "Dr. Sulfikar Ali A",
        "Dr. Chanchal Chaudhary",
      ];
      return order.indexOf(a.name) - order.indexOf(b.name);
    });
  const scholarsResearchers = teamMembers
    .filter((m) => {
      const sid = m.staticId ? Number(m.staticId) : NaN;
      if (isNaN(sid)) return m.category !== "Faculty";
      return sid >= 19;
    })
    .sort((a, b) => {
      const order = [
        "Subramanian", "Intiaz", "Sanya", "Dorcas", "Nistara",
        "Aparna", "Siddharth", "Tancia", "Farah", "Akshay",
        "Megha", "Karthi", "Akhila", "Nidhi", "Yuvanesh",
      ];
      const aIdx = order.findIndex((o) => a.name.toLowerCase().includes(o.toLowerCase()));
      const bIdx = order.findIndex((o) => b.name.toLowerCase().includes(o.toLowerCase()));
      return (aIdx === -1 ? 999 : aIdx) - (bIdx === -1 ? 999 : bIdx);
    });
  const collaboratorMembers = members.filter((m) => m.group === "collaborator");
  const formerMembers = members.filter((m) => m.group === "former");

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Our Team" subtitle="Researchers, clinicians, and collaborators" eyebrow="The People" />

        {coordinator && (
          <div className="max-w-3xl mx-auto mb-16">
            <div className="card-base p-8 md:p-10 text-center" style={{ borderTop: "3px solid #B84A18", borderBottom: "3px solid #B84A18" }}>
              {coordinator.photo && coordinator.photo !== "/placeholder.svg" ? (
                <Image
                  src={coordinator.photo}
                  alt={coordinator.name}
                  width={112}
                  height={112}
                  className="h-28 w-28 rounded-full mx-auto object-cover shadow-md"
                />
              ) : (
                <div
                  className="h-28 w-28 rounded-full mx-auto flex items-center justify-center text-3xl font-bold text-white shadow-md"
                  style={{ background: "linear-gradient(135deg, #B84A18 0%, #963C14 100%)" }}
                >
                  {coordinator.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
              )}
              <h2 className="font-display text-3xl text-[#1C1C1A] mt-5">{coordinator.name}</h2>
              {coordinator.qualification && (
                <p className="text-[#6B6860] text-base mt-1 font-medium">{coordinator.qualification}</p>
              )}
              <p className="mt-0.5 text-sm">
                <span className="text-[#1C1C1A]">Coordinator, CCSRR | Associate Dean, MCHP, MAHE | Professor</span>
              </p>
              <p className="text-[#B84A18] text-sm font-medium mt-1">Dept. of Physiotherapy, MCHP, MAHE</p>
              <p className="text-[#4A4845] mt-5 leading-relaxed max-w-2xl mx-auto text-[16px] text-justify">
                {coordinator.bio}
              </p>
              <a
                href={`mailto:${coordinator.email}`}
                className="inline-flex items-center gap-1.5 mt-5 text-sm text-[#B84A18] hover:text-[#963C14] font-medium transition-colors"
              >
                {coordinator.email}
              </a>
            </div>
          </div>
        )}

        {/* Team Members */}
        {faculties.length > 0 && (
          <div className="mb-14">
            <h2 className="font-display text-3xl text-[#1C1C1A] mb-1">Faculties</h2>
            <p className="text-[#6B6860] text-[16px] mb-6">Academic faculty driving our mission</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {faculties.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        )}

        {scholarsResearchers.length > 0 && (
          <div className="mb-14">
            <h2 className="font-display text-3xl text-[#1C1C1A] mb-1">Scholars &amp; Researchers</h2>
            <p className="text-[#6B6860] text-[16px] mb-6">Doctoral scholars and research associates</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {scholarsResearchers.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        )}

        {/* Former Members */}
        {formerMembers.length > 0 && (
          <div className="mb-14">
            <h2 className="font-display text-3xl text-[#1C1C1A] mb-1">Former Members</h2>
            <p className="text-[#6B6860] text-[16px] mb-6">Past contributors to CCSRR</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {formerMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        )}

        {/* Internal Collaborators */}
        <div className="mb-14">
          <h2 className="font-display text-3xl text-[#1C1C1A] mb-1">Internal Collaborators &amp; Stakeholders</h2>
          <p className="text-[#6B6860] text-[16px] mb-6">Faculty across departments at MAHE supporting stroke rehabilitation</p>
          <div className="space-y-3">
              {[
                { name: "Dr. Aparna Ramakrishna Pai", title: "Professor", dept: "Department of Neurology", inst: "Kasturba Medical College, Manipal" },
                { name: "Dr. Arvind N Prabhu", title: "Professor & Head", dept: "Department of Neurology", inst: "Kasturba Medical College, Manipal" },
                { name: "Dr. Raghavendra Nayak", title: "Professor & Head", dept: "Department of Neurosurgery", inst: "Kasturba Medical College, Manipal" },
                { name: "Dr. Lakshmi Prasad G", title: "Professor", dept: "Department of Neurosurgery", inst: "Kasturba Medical College, Manipal" },
              ].map((person) => (
                <div key={person.name} className="flex items-start gap-2 text-justify">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#B84A18] shrink-0 mt-2" />
                  <div>
                    <span className="text-[16px] text-[#4A4845] font-medium">{person.name}</span>
                    <p className="text-[14px] text-[#6B6860]">
                      {person.title}, {person.dept}, {person.inst}
                    </p>
                  </div>
                </div>
              ))}
            </div>
        </div>

        {/* Collaborators */}
        <div className="mb-14">
          <h2 className="font-display text-3xl text-[#1C1C1A] mb-1">Collaborators</h2>
          <p className="text-[#6B6860] text-[16px] mb-6">External partners and clinical collaborators</p>

          <div className="mb-6">
            <h3 className="font-semibold text-lg text-[#1C1C1A] mb-3">National</h3>
            <div className="space-y-3">
              {[
                { name: "Dr. Jeyaraj D Pandian", title: "Principal (Dean), Professor and Head", dept: "Department of Neurology", inst: "CMC Ludhiana" },
                { name: "Dr. Sivakumar Balasubramanian", title: "Professor and Head", dept: "Department of Bioengineering", inst: "CMC Vellore" },
                { name: "Dr. Dorcas Gandhi", title: "Vice Principal and Professor", dept: "Department of Neurology", inst: "CMC Ludhiana" },
                { name: "Dr. Karthik Babu", title: "Principal & Professor", dept: "College of Physiotherapy",inst: "Sri Ramachandra Institute of Higher Education and Research, Coimbatore, Tamil Nadu" },
              ].map((person) => (
                <div key={person.name} className="flex items-start gap-2 text-justify">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#B84A18] shrink-0 mt-2" />
                  <div>
                    <span className="text-[16px] text-[#4A4845] font-medium">{person.name}</span>
                    {person.title && (
                      <p className="text-[14px] text-[#6B6860]">
                        {person.title}{person.dept && person.dept !== "—" ? `, ${person.dept}` : ""}{person.inst ? `, ${person.inst}` : ""}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-[#1C1C1A] mb-3">International</h3>
            <div className="space-y-3">
              {[
                { name: "Dr. Mindy F. Levin", title: "Professor", dept: "School of Physical and Occupational Therapy", inst: "McGill University, Canada" },
                { name: "Dr. Julie Bernhardt", title: "Professor", dept: "The Florey Institute of Neuroscience and Mental Health (Austin Site), Stroke Division", inst: "University of Melbourne, VIC, Australia" },
                { name: "Dr. Coralie English", title: "Associate Dean Research and Innovation", dept: "College of Health, Medicine and Wellbeing", inst: "University of New Castle, Australia" },
                { name: "Dr. Philippe Archambault", title: "Professor", dept: "School of Physical and Occupational Therapy", inst: "McGill University, Canada" },
                { name: "Dr. Dario Liebermann", title: "Professor", dept: "Department of Physical Therapy", inst: "Tel Aviv University, Israel" },
                { name: "Dr. Janice Eng", title: "Professor", dept: "Department of Physical Therapy", inst: "University of British Columbia (UBC)" },
                { name: "Dr. Heidi Janssen", title: "Postdoctoral Fellow", dept: "School of Health Sciences", inst: "University of New Castle, Australia" },
                { name: "Dr. Marie-Louise Bird", title: "Professor & Head", dept: "Discipline of Physiotherapy, Institute of Health and Wellbeing", inst: "Federation University Australia" },
                { name: "Dr. Catherine Sackley", title: "Professor of Rehabilitation", dept: "School of Health Sciences", inst: "Kings College, London" },
                { name: "Dr. Sangeetha Madhavan", title: "Professor and Associate Dean", dept: "Department of Physical Therapy", inst: "University of Illinois, Chicago" },
                { name: "Dr. Chitra Balasubramanian", title: "Professor", dept: "Department of Physical Therapy", inst: "University of North Florida, USA" },
                { name: "Dr. Sandeep Subramanian", title: "Associate Professor", dept: "Department of Physical Therapy", inst: "UT Health San Antonio, USA" },
                { name: "Dr. Anna Kuppuswamy", title: "Lecturer", dept: "Department", inst: "University of Leeds, UK" },
              ].map((person) => (
                <div key={person.name} className="flex items-start gap-2 text-justify">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#7C3AED] shrink-0 mt-2" />
                  <div>
                    <span className="text-[16px] text-[#4A4845] font-medium">{person.name}</span>
                    <p className="text-[14px] text-[#6B6860]">
                      {person.title}, {person.dept}, {person.inst}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

