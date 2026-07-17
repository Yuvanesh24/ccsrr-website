"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Members", href: "/members" },
  { label: "Projects", href: "/projects" },
  { label: "Devices", href: "/devices" },
  { label: "Events", href: "/events" },
  { label: "Publications", href: "/publications" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E8E5E0]" style={{ boxShadow: "0 1px 0 rgba(0,0,0,0.06)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-24">
          <Link href="/" className="shrink-0 flex items-center h-full -ml-3 sm:-ml-6">
            <img
              src="/ccsrr-logo.png"
              alt="Centre for Comprehensive Stroke Rehabilitation & Research"
              className="h-16 md:h-24 w-auto object-contain"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 text-[15px] font-medium rounded-md transition-all duration-150 ${
                  isActive(link.href)
                    ? "text-[#B84A18] bg-[#FEF7F2]"
                    : "text-[#4A4845] hover:text-[#B84A18] hover:bg-[#FEF7F2]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-[#4A4845] hover:text-[#B84A18] hover:bg-[#FEF7F2] transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t border-[#E8E5E0]">
          <div className="px-4 py-3 space-y-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  isActive(link.href)
                    ? "text-[#B84A18] bg-[#FEF7F2]"
                    : "text-[#4A4845] hover:text-[#B84A18] hover:bg-[#FEF7F2]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}