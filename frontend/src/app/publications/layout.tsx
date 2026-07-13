import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publications",
  description: "Browse research publications by CCSRR researchers in stroke rehabilitation and related fields.",
  openGraph: {
    title: "Publications | CCSRR | MAHE Manipal",
    description: "Browse research publications by CCSRR researchers in stroke rehabilitation and related fields.",
  },
};

export default function PublicationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
