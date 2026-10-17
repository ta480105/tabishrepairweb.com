import React, { useState } from "react";
import { FAQ_LIST } from "../config/faq";
import { ChevronDown } from "lucide-react";

export const FAQSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    cost: true, // open first by default for quick clarity
  });

  const toggleFAQ = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="faq" className="py-24 bg-neutral-950/70 border-b border-neutral-800/80 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">
            Got Questions?
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-neutral-400 text-base max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about pricing, timelines, hosting, custom domains, and how we
            work together before commissioning your website.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_LIST.map((item) => {
            const isOpen = !!openIds[item.id];
            return (
              <div
                key={item.id}
                className="rounded-xl border border-neutral-800 bg-neutral-900/40 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(item.id)}
                  aria-expanded={isOpen}
                  className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 hover:bg-neutral-900/80 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                >
                  <span className="text-sm sm:text-base font-semibold text-white">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-indigo-400" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/50">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center text-xs text-neutral-400">
          Have a specific inquiry not listed here?{" "}
          <a href="#contact" className="text-indigo-400 hover:text-indigo-300 underline font-medium">
            Send us a message below
          </a>{" "}
          or reach out on WhatsApp.
        </div>
      </div>
    </section>
  );
};
