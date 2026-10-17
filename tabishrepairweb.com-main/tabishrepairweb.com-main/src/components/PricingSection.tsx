import React, { useState } from "react";
import { PRICING_PACKAGES, TRANSPARENCY_NOTES, PricingPackage } from "../config/pricing";
import { Check, X, ArrowRight, Info } from "lucide-react";

interface PricingSectionProps {
  onSelectPackage: (pkg: PricingPackage) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPackage }) => {
  const [showComparison, setShowComparison] = useState(false);

  // Comparison matrix features
  const comparisonRows = [
    { name: "Pages / Sections", starter: "1 Page", pro: "Multi-Section", growth: "Multi-Section (Agreed)", prem: "Custom Multi-Page" },
    { name: "Mobile Responsive Layout", starter: true, pro: true, growth: true, prem: true },
    { name: "Click-to-Chat WhatsApp Button", starter: true, pro: true, growth: true, prem: true },
    { name: "Photo Gallery / Portfolio", starter: false, pro: true, growth: true, prem: true },
    { name: "Interactive FAQ Section", starter: false, pro: true, growth: true, prem: true },
    { name: "Working Enquiry Form Backend", starter: false, pro: false, growth: true, prem: true },
    { name: "Supabase Database Storage", starter: false, pro: false, growth: true, prem: true },
    { name: "Instant Email Notification Alert", starter: false, pro: false, growth: true, prem: true },
    { name: "WhatsApp Cloud API Support", starter: false, pro: false, growth: "Optional Add-on", prem: "Supported (Client Credentials)" },
    { name: "On-Page SEO Foundations", starter: "Basic", pro: "Standard", growth: "Advanced", prem: "Full Meta & Schema" },
    { name: "Cloudflare Deployment Assistance", starter: true, pro: true, growth: true, prem: true },
    { name: "Agreed Revision Rounds", starter: "1 Round", pro: "2 Rounds", growth: "2 Rounds", prem: "3 Rounds" },
  ];

  return (
    <section id="pricing" className="py-24 bg-neutral-950 border-b border-neutral-800/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">
            Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Fixed Starting Packages in Indian Rupees (INR)
          </h2>
          <p className="text-neutral-400 text-base leading-relaxed">
            Honest, competitive rates for small businesses across Chennai and India. No hidden lock-ins.
            Choose the package matching your business stage.
          </p>
        </div>

        {/* 4 Package Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {PRICING_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-2xl p-6 flex flex-col justify-between transition-all relative ${
                pkg.popular
                  ? "bg-neutral-900 border-2 border-indigo-500 shadow-xl shadow-indigo-500/10"
                  : "bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700"
              }`}
            >
              {pkg.badge && (
                <div className="absolute -top-3 left-6 bg-indigo-600 text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
                  {pkg.badge}
                </div>
              )}

              <div>
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-white mb-1">{pkg.name}</h3>
                  <p className="text-xs text-neutral-400 min-h-[32px]">{pkg.idealFor}</p>
                </div>

                <div className="py-4 mb-6 border-y border-neutral-800/80">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
                    {pkg.priceLabel}
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-1">Starting price / project</div>
                </div>

                <div className="space-y-2.5 mb-8">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                    Package Deliverables:
                  </div>
                  {pkg.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2 text-xs text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {pkg.limitations.length > 0 && (
                  <div className="pt-3 border-t border-neutral-800/60 mb-6">
                    <div className="text-[11px] font-semibold text-neutral-400 mb-1.5 flex items-center gap-1">
                      <Info className="w-3 h-3 text-neutral-400" />
                      <span>Scope Notes:</span>
                    </div>
                    {pkg.limitations.map((lim) => (
                      <p key={lim} className="text-[11px] text-neutral-400 leading-normal mb-1">
                        · {lim}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => onSelectPackage(pkg)}
                  className={`w-full py-3 px-4 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 ${
                    pkg.popular
                      ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30"
                      : "bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white border border-neutral-700/60"
                  }`}
                >
                  <span>Choose This Package</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table Toggle */}
        <div className="mb-14 text-center">
          <button
            type="button"
            onClick={() => setShowComparison(!showComparison)}
            className="px-5 py-2 text-xs font-semibold text-indigo-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            {showComparison ? "Hide Detailed Comparison Table" : "View Detailed Feature Comparison Table"}
          </button>
        </div>

        {showComparison && (
          <div className="mb-16 overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">
            <table className="w-full text-left text-xs text-neutral-300">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400 uppercase tracking-wider font-mono">
                  <th className="py-3 px-4">Feature</th>
                  <th className="py-3 px-4">Starter (₹1k-1.3k)</th>
                  <th className="py-3 px-4">Pro (₹1.5k-1.8k)</th>
                  <th className="py-3 px-4">Growth (₹2k)</th>
                  <th className="py-3 px-4">Premium (₹3k)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {comparisonRows.map((row) => (
                  <tr key={row.name} className="hover:bg-neutral-800/30">
                    <td className="py-3 px-4 font-medium text-white">{row.name}</td>
                    <td className="py-3 px-4">{renderCell(row.starter)}</td>
                    <td className="py-3 px-4">{renderCell(row.pro)}</td>
                    <td className="py-3 px-4">{renderCell(row.growth)}</td>
                    <td className="py-3 px-4">{renderCell(row.prem)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Transparency Guidelines Box */}
        <div className="rounded-xl bg-neutral-900/40 border border-neutral-800/80 p-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-3 flex items-center gap-2">
            <Info className="w-4 h-4" />
            <span>Pricing Transparency & Client Commitment</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-neutral-400">
            {TRANSPARENCY_NOTES.map((note) => (
              <p key={note} className="leading-relaxed">
                {note}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

function renderCell(val: boolean | string) {
  if (typeof val === "boolean") {
    return val ? (
      <Check className="w-4 h-4 text-emerald-400" />
    ) : (
      <X className="w-4 h-4 text-neutral-600" />
    );
  }
  return <span className="font-mono text-neutral-200">{val}</span>;
}
