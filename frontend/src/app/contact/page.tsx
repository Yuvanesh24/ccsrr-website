import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import SocialIcons from "@/components/SocialIcons";
import { siteConfig } from "@/data/site-content";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with CCSRR, MAHE Manipal — send us a message or find our contact information.",
  openGraph: {
    title: "Contact | CCSRR | MAHE Manipal",
    description: "Get in touch with CCSRR, MAHE Manipal — send us a message or find our contact information.",
  },
};

export default function ContactPage() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Contact Us" subtitle="Get in touch with our team" eyebrow="Reach Out" />

        <div className="grid md:grid-cols-5 gap-8 max-w-5xl mx-auto">
          <div className="md:col-span-3">
            <div className="card-base p-6">
              <h2 className="font-display text-2xl text-[#1C1C1A] mb-6">Send a Message</h2>
              <ContactForm />
            </div>
          </div>

          <div className="md:col-span-2 space-y-5">
            <div className="card-base p-6">
              <h3 className="font-semibold text-[#1C1C1A] text-lg mb-4">Contact Information</h3>
              <div className="space-y-4 text-[14px] text-[#6B6860]">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-[#FEF7F2] flex items-center justify-center shrink-0">
                    <Mail className="h-4 w-4 text-[#B84A18]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#1C1C1A]">Email</p>
                    <a href={`mailto:${siteConfig.email}`} className="text-[#6B6860] hover:text-[#B84A18] transition-colors">
                      {siteConfig.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-[#FEF7F2] flex items-center justify-center shrink-0">
                    <MapPin className="h-4 w-4 text-[#B84A18]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#1C1C1A]">Address</p>
                    <p className="leading-relaxed">{siteConfig.address}</p>
                  </div>
                </div>
                <SocialIcons
                  className="pt-3 border-t border-[#F0EDE8]"
                  iconClassName="text-[#C8C5C0] hover:text-[#B84A18] transition-colors"
                />
              </div>
            </div>

            <div className="card-base p-6">
              <h3 className="font-semibold text-[#1C1C1A] text-lg mb-2">About MAHE Manipal</h3>
              <p className="text-[14px] text-[#6B6860] leading-relaxed">
                Manipal Academy of Higher Education (MAHE) is an Institution of Eminence deemed-to-be university
                with a rich legacy in health sciences education and research.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
