import React from "react";
import { SERVICES_LIST } from "../config/services";
import { Check, ArrowRight } from "lucide-react";

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="py-24 bg-neutral-950 border-b border-neutral-800/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">
              Capabilities & Offerings
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Website Services Built for Business Outcomes
            </h2>
            <p className="text-neutral-400 text-base leading-relaxed">
              Every project is hand-coded with clean modern standards. No bloated themes, no sluggish page builders.
            </p>
          </div>
          <div className="text-xs text-neutral-400 font-mono">
            8 Specialized Core Services
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES_LIST.map((service) => (
            <div
              key={service.id}
              className="p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800/90 hover:border-neutral-700 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-sm text-indigo-400 font-medium">
                    {service.number}
                  </span>
                  <span className="text-xs text-neutral-400">
                    {service.tagline}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                  {service.title}
                </h3>

                <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="space-y-2 mb-8 pt-4 border-t border-neutral-800/70">
                  <div className="text-xs font-medium uppercase tracking-wider text-neutral-400 mb-2">
                    Included in scope:
                  </div>
                  {service.deliverables.map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-xs text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800/60">
                <button
                  type="button"
                  onClick={() => onSelectService(service.title)}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-neutral-200 hover:text-white bg-neutral-800/80 hover:bg-neutral-800 rounded-lg border border-neutral-700/60 transition-all flex items-center justify-center gap-2"
                >
                  <span>Request Quote for {service.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
