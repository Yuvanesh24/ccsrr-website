import Link from "next/link";
import { siteConfig } from "@/data/site-content";
import SocialIcons from "@/components/SocialIcons";

export default function Footer() {
  return (
    <footer style={{ background: "linear-gradient(135deg, #2D1507 0%, #4A1C08 50%, #3D1606 100%)" }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 space-y-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#D4825A] mb-2">Hosted by</p>
              <h3 className="text-lg font-semibold text-white leading-snug">
                Centre for Comprehensive<br />Stroke Rehabilitation &amp; Research
              </h3>
            </div>
            <p className="text-sm text-[#C8A898] leading-relaxed">
              MCHP,
              MAHE, Manipal<br />
              Karnataka 576104, India
            </p>
            <p className="text-sm text-[#C8A898]">
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">
                {siteConfig.email}
              </a>
            </p>
            <SocialIcons />
          </div>

          <div className="lg:col-span-2 space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#D4825A]">Navigation</p>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Members", href: "/members" },
                { label: "Projects", href: "/projects" },
                { label: "Publications", href: "/publications" },
                { label: "Events", href: "/events" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#C8A898] hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#D4825A]">Research Areas</p>
            <ul className="space-y-2 text-sm text-[#C8A898]">
              <li>Stroke Rehabilitation</li>
              <li>Neurorecovery</li>
              <li>Rehab Technology</li>
              <li>Clinical Neuroscience</li>
              <li>Motor Control</li>
            </ul>
          </div>

          <div className="lg:col-span-4 space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#D4825A]">Find Us</p>
            <div className="map-container rounded-lg overflow-hidden border border-white/10" style={{ height: "200px" }}>
              <iframe
                src="https://maps.google.com/maps?q=Manipal+College+of+Health+Professions+MAHE+Manipal&output=embed"
                width="100%"
                height="200"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="MAHE Manipal Location"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-[#9A7E74]">
          <p>&copy; {new Date().getFullYear()} {siteConfig.fullName}. All rights reserved.</p>
          <p></p>
        </div>
      </div>
    </footer>
  );
}
