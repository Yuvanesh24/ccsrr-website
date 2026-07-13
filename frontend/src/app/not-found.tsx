import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="py-24 text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-6xl font-bold text-[#E8E5E0]">404</p>
        <h1 className="font-display text-4xl text-[#1C1C1A] mt-4">Page not found</h1>
        <p className="text-[#6B6860] mt-2">The page you are looking for does not exist.</p>
        <Link
          href="/"
          className="inline-flex items-center mt-8 px-6 py-3 rounded-lg font-semibold text-sm hero-cta-primary"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
