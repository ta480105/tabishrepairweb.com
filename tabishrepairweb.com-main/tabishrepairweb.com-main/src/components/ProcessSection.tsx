import React from "react";
import { PROCESS_STEPS } from "../config/process";

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="py-24 bg-neutral-950/80 border-b border-neutral-800/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">
            Structured Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            How We Work Together: From Concept to Live Website
          </h2>
          <p className="text-neutral-400 text-base leading-relaxed">
            A clear, 8-step collaboration so you always know what comes next, who is responsible,
            and when your website goes live.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.step}
              className="p-6 rounded-xl bg-neutral-900/50 border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black font-mono text-neutral-600">
                    {step.step}
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 bg-neutral-800/80 px-2 py-0.5 rounded">
                    {step.responsibility}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
