import React from "react";
import {
  Globe,
  Smartphone,
  Tag,
  MessageSquare,
  ClipboardList,
  Zap,
  Search,
  CheckCircle2,
} from "lucide-react";

export const TrustBenefits: React.FC = () => {
  const benefits = [
    {
      icon: Globe,
      title: "Professional Online Presence",
      description:
        "Give your business a legitimate, polished web address you can share on Google Maps, Instagram, visiting cards, and flyers.",
    },
    {
      icon: Smartphone,
      title: "Mobile-Friendly Design",
      description:
        "Over 80% of local customers browse on phones. Every page adapts smoothly across Apple, Android, tablets, and desktops.",
    },
    {
      icon: Tag,
      title: "Clear Service & Pricing Presentation",
      description:
        "Eliminate customer hesitation by showcasing your services, product catalogs, repair rates, or menu items in an organized format.",
    },
    {
      icon: MessageSquare,
      title: "Easy WhatsApp Contact",
      description:
        "One-tap click-to-chat triggers allow visitors to ask questions or place orders directly inside WhatsApp without typing your number.",
    },
    {
      icon: ClipboardList,
      title: "Customer Enquiry Forms",
      description:
        "Structured quote and lead-capture forms collect required project details directly, filtering out casual time-wasters.",
    },
    {
      icon: Zap,
      title: "Fast-Loading Pages",
      description:
        "Clean, optimized code without bloated templates ensures quick page loads even on standard 4G mobile networks.",
    },
    {
      icon: Search,
      title: "Search-Engine-Friendly Foundations",
      description:
        "Proper semantic HTML, meta descriptions, and Schema.org LocalBusiness structured data so search engines understand your business.",
    },
    {
      icon: CheckCircle2,
      title: "Transparent INR Pricing",
      description:
        "Pre-agreed starting packages from ₹1,000 to ₹3,000 with explicitly defined revision rounds and deliverables before work begins.",
    },
  ];

  return (
    <section className="py-20 bg-neutral-950 border-b border-neutral-800/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">
            Built for Local Impact
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Why Your Business Needs a Dedicated Modern Website
          </h2>
          <p className="text-neutral-400 text-base leading-relaxed">
            Social media profiles change algorithms and lock down viewing. A dedicated website
            establishes permanent credibility, showcases your authentic work, and gives customers a
            frictionless way to contact you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="p-6 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center text-indigo-400 mb-4">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">{benefit.description}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-neutral-800/80 text-xs text-neutral-500 font-mono">
                  Benefit 0{index + 1}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
