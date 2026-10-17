import React, { useState } from "react";
import { BUSINESS_CONFIG, getWhatsAppClickToChatUrl } from "../config/business";
import { ArrowUpRight, MessageSquare, ShieldCheck, Sparkles, Smartphone, Zap } from "lucide-react";

interface HeroProps {
  onQuoteClick: () => void;
  onExplorePackagesClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onQuoteClick, onExplorePackagesClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-neutral-800/60 bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-900/40">
      {/* Background ambient lighting subtle glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/10 blur-[130px] rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Value Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Clean editorial kicker (No pill badge, no pulsing green dots) */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-4">
              <span>Chennai, Tamil Nadu</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Web Development Studio</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] text-balance mb-6">
              Websites That Make Your Business Stand Out.
            </h1>

            <p className="text-lg sm:text-xl text-neutral-300 font-normal leading-relaxed max-w-2xl mb-8">
              {BUSINESS_CONFIG.supportingCopy}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                type="button"
                onClick={onQuoteClick}
                className="px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-lg shadow-indigo-600/25 transition-all hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-2"
              >
                Get a Free Quote
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onExplorePackagesClick}
                className="px-6 py-3.5 text-sm font-semibold tracking-wide text-neutral-200 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700/80 rounded-lg transition-all"
              >
                Explore Our Packages
              </button>

              <a
                href={getWhatsAppClickToChatUrl("Hi Tabish Web, I would like to get a quote for a new website.")}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3.5 text-sm font-medium text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-2 transition-colors"
                aria-label="Direct WhatsApp message"
              >
                <MessageSquare className="w-4 h-4" aria-hidden="true" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Unboxed Trust Signals */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-neutral-400 border-t border-neutral-800/80 pt-6">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                <span>Packages from ₹1,000</span>
              </div>
              <span aria-hidden="true" className="text-neutral-700 hidden sm:inline">·</span>
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-indigo-400" />
                <span>100% Mobile Responsive</span>
              </div>
              <span aria-hidden="true" className="text-neutral-700 hidden sm:inline">·</span>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-indigo-400" />
                <span>Fast Cloudflare Deployment</span>
              </div>
            </div>
          </div>

          {/* Right Column: Genuine Photography with Resilient Fallback */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
              {/* Fallback container with styled gradient and SVG graphic */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/50 via-neutral-900 to-neutral-950 flex flex-col justify-end p-6">
                <div className="text-xs uppercase tracking-wider text-neutral-400 mb-1">
                  Modern Web Engineering
                </div>
                <div className="text-lg font-semibold text-white">
                  Crafted for Local Businesses & Retailers
                </div>
              </div>

              {!imageError && (
                <img
                  src={BUSINESS_CONFIG.defaults.heroImage}
                  alt="Modern creative web design studio workspace in Chennai"
                  referrerPolicy="no-referrer"
                  loading="eager"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    imageLoaded ? "opacity-90" : "opacity-0"
                  }`}
                />
              )}

              {/* Contrast Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Caption Tag */}
              <div className="absolute bottom-4 left-4 right-4 text-xs text-neutral-300 bg-neutral-950/70 backdrop-blur-sm px-3 py-2 rounded-lg border border-neutral-800/60 flex items-center justify-between">
                <span>Designed for Indian small businesses</span>
                <span className="font-mono text-indigo-300">Chennai, TN</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Item Feature Strip Below Hero */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 pt-10 border-t border-neutral-800/60">
          <div className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-800/80">
            <div className="text-sm font-semibold text-white mb-1">Tailored for Local Shops</div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Mobile repair, electronics, salons, cafes, apparel, and service contractors.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-800/80">
            <div className="text-sm font-semibold text-white mb-1">WhatsApp First</div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Direct click-to-chat links ensure customers can reach you in one tap.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-800/80">
            <div className="text-sm font-semibold text-white mb-1">Clear Scope & Pricing</div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Fixed package ranges in INR. No unexpected surprises or hidden hosting markups.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-800/80">
            <div className="text-sm font-semibold text-white mb-1">Production Handover</div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Full deployment to Cloudflare with complete ownership retained by you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
