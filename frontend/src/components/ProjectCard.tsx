import type { FundedProject, PhDProject, StudentProject } from "@/data/projects";
import StatusBadge from "@/components/StatusBadge";

interface ProjectCardProps {
  project: FundedProject | PhDProject | StudentProject;
  collaborative?: boolean;
}

function isFunded(p: FundedProject | PhDProject | StudentProject): p is FundedProject {
  return "fundingAgency" in p;
}

function isPhD(p: FundedProject | PhDProject | StudentProject): p is PhDProject {
  return "studentName" in p;
}

export default function ProjectCard({ project, collaborative }: ProjectCardProps) {
  if (isFunded(project)) {
    const gradColor = collaborative
      ? "linear-gradient(90deg, #2563EB, #60A5FA)"
      : "linear-gradient(90deg, #B84A18, #D97706)";
    const badgeBg = collaborative ? "bg-blue-50" : "bg-[#F5F3EF]";
    return (
      <div className="card-base bg-white p-5">
        <div style={{ height: "3px", background: gradColor, borderRadius: "3px 3px 0 0", margin: "-20px -20px 16px -20px" }} />
        <div className="flex items-center gap-2 mb-3">
          <StatusBadge status={project.status} />
          <span className={`text-[11px] font-semibold uppercase tracking-wide text-[#6B6860] px-2 py-0.5 ${badgeBg} rounded-full ml-auto`}>
            {collaborative ? "Collaborative" : "Funded"}
          </span>
        </div>
        <h3 className="font-semibold text-[#1C1C1A] text-[15px] leading-snug">{project.title}</h3>
        <div className="mt-3 space-y-1.5 text-[13px] text-[#6B6860]">
          <p>PI: <span className="text-[#1C1C1A] font-medium">{project.pi}</span></p>
          {project.coPi && <p>Co-PI: {project.coPi}</p>}
          {project.fundingAgency && !project.fundingAgency.startsWith("[") && <p>Funding Agency: {project.fundingAgency}</p>}
          {project.duration && <p>Duration: {project.duration}</p>}
        </div>
      </div>
    );
  }

  if (isPhD(project)) {
    return (
      <div className="card-base bg-white p-5">
        <div style={{ height: "3px", background: "linear-gradient(90deg, #7C3AED, #A78BFA)", borderRadius: "3px 3px 0 0", margin: "-20px -20px 16px -20px" }} />
        <div className="flex items-center gap-2 mb-3">
          <StatusBadge status={project.status} />
          <span className="text-[11px] font-semibold tracking-wide text-[#6B6860] px-2 py-0.5 bg-[#F5F0FF] rounded-full ml-auto">
            PhD
          </span>
        </div>
        <h3 className="font-semibold text-[#1C1C1A] text-[15px] leading-snug">{project.thesisTitle}</h3>
        <div className="mt-3 space-y-1.5 text-[13px] text-[#6B6860]">
          <p>Scholar: <span className="text-[#1C1C1A] font-medium">{project.studentName}</span></p>
          <p>Guide: {project.guide}</p>
          {project.coGuide && <p>Co-Guide: {project.coGuide}</p>}
          {project.registrationYear && <p>Duration: {project.registrationYear}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="card-base bg-white p-5">
      <div style={{ height: "3px", background: "linear-gradient(90deg, #047857, #34D399)", borderRadius: "3px 3px 0 0", margin: "-20px -20px 16px -20px" }} />
      <div className="flex items-center gap-2 mb-3">
        <StatusBadge status={project.status} />
        <span className="text-[11px] font-semibold uppercase tracking-wide text-[#6B6860] px-2 py-0.5 bg-[#F0FDF4] rounded-full ml-auto">
          {project.category}
        </span>
      </div>
      <h3 className="font-semibold text-[#1C1C1A] text-[15px] leading-snug">{project.title}</h3>
      <div className="mt-3 space-y-1.5 text-[13px] text-[#6B6860]">
        <p>Students: <span className="text-[#1C1C1A]">{project.studentNames}</span></p>
        <p>Guide: {project.guide}</p>
        <p>{project.year}</p>
      </div>
    </div>
  );
}
