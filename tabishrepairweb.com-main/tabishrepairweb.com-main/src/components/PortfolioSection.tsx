import React, { useState } from "react";
import { PORTFOLIO_ITEMS, PortfolioItem } from "../config/portfolio";
import { ExternalLink, Check, Image as ImageIcon } from "lucide-react";

interface PortfolioSectionProps {
  onEnquireSimilar: (projectName: string, websiteType: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onEnquireSimilar }) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const categories = [
    "All",
    "Mobile Repair Shop",
    "Electronics Store",
    "Restaurant & Cafe",
    "Salon & Barbershop",
    "Clothing Store",
    "Local Service Business",
  ];

  const filteredItems =
    activeCategory === "All"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="portfolio" className="py-24 bg-neutral-950/70 border-b border-neutral-800/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">
              Concept Demos & Case Studies
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Designed for Real-World Commercial Contexts
            </h2>
            <p className="text-neutral-400 text-base leading-relaxed">
              Explore our architectural demo layouts for everyday businesses. Each project demonstrates
              responsive navigation, clear pricing display, and direct WhatsApp lead capture.
            </p>
          </div>

          <div className="text-xs text-neutral-400 font-mono">
            Showing {filteredItems.length} curated design concepts
          </div>
        </div>

        {/* Functional interactive category filters (Segmented controls) */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-neutral-900 rounded-xl border border-neutral-800 mb-12 w-fit">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => {
            const hasFailed = failedImages[item.id];
            return (
              <div
                key={item.id}
                className="rounded-2xl bg-neutral-900/60 border border-neutral-800 overflow-hidden flex flex-col justify-between hover:border-neutral-700 transition-all group"
              >
                <div>
                  {/* Image container with measured aspect ratio and resilient fallback */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-950">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.fallbackGradient} flex flex-col items-center justify-center p-6 text-center`}
                    >
                      <ImageIcon className="w-8 h-8 text-neutral-500 mb-2" />
                      <div className="text-sm font-semibold text-white">{item.title}</div>
                      <div className="text-xs text-neutral-400">{item.sector}</div>
                    </div>

                    {!hasFailed && (
                      <img
                        src={item.imageUrl}
                        alt={item.imageAlt}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        onError={() => handleImageError(item.id)}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}

                    {/* Measured Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent pointer-events-none" />

                    {/* Badge: Explicit Demo Project label */}
                    <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-mono uppercase tracking-wider text-neutral-300 border border-neutral-800">
                      {item.badge}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-xs text-neutral-300 font-medium">
                      {item.sector}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-neutral-300 text-xs leading-relaxed mb-4">
                      {item.summary}
                    </p>

                    <div className="space-y-1.5 mb-6 pt-3 border-t border-neutral-800/80">
                      {item.keyFeatures.map((feat) => (
                        <div key={feat} className="flex items-start gap-2 text-[11px] text-neutral-400">
                          <Check className="w-3 h-3 text-indigo-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    type="button"
                    onClick={() => onEnquireSimilar(item.title, item.category)}
                    className="w-full py-2.5 px-3 text-xs font-semibold text-neutral-200 hover:text-white bg-neutral-800 hover:bg-neutral-700/80 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Request Similar Website</span>
                    <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clear Disclosure Notice */}
        <div className="mt-12 p-4 rounded-xl bg-neutral-900/40 border border-neutral-800/60 text-xs text-neutral-400 text-center">
          Note: Concepts above demonstrate layout architectures and feature sets for specific industries. When you commission Tabish Web, your site will feature your authentic business logo, real photos, and customized text.
        </div>
      </div>
    </section>
  );
};
