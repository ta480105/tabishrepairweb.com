import React, { useState } from "react";
import { BUSINESS_CONFIG } from "../config/business";
import { MapPin, Mail, Phone, Code2, Users, Compass } from "lucide-react";

export const AboutSection: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <section id="about" className="py-24 bg-neutral-950 border-b border-neutral-800/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: About Copy */}
          <div className="lg:col-span-7">
            <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">
              About Tabish Web
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6">
              A Website Development Agency Based in Chennai, Tamil Nadu
            </h2>

            <div className="space-y-4 text-neutral-300 text-sm leading-relaxed mb-8">
              <p>
                Tabish Web is an independent digital agency operating out of Chennai, Tamil Nadu.
                We specialize in engineering modern, responsive websites for small businesses, local
                shops, retail stores, dining venues, and independent service professionals across India.
              </p>
              <p>
                Many neighborhood businesses rely exclusively on social media pages or outdated websites
                that malfunction on modern smartphones. Our mission is to provide clean, high-performance
                websites that clearly communicate your service offerings, build immediate customer trust,
                and make it effortless for visitors to reach you via WhatsApp or enquiry forms.
              </p>
              <p>
                We value honest pricing, clear contracts, and dependable code. We don't make exaggerated
                sales claims, we don't invent client metrics, and we never trap you in proprietary systems.
                When we build your website, you retain full ownership of your assets and domains.
              </p>
            </div>

            {/* Direct Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-neutral-800/80">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                    Location
                  </div>
                  <div className="text-xs font-medium text-white">{BUSINESS_CONFIG.location.full}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                    Enquiries Email
                  </div>
                  <a
                    href={`mailto:${BUSINESS_CONFIG.contact.email}`}
                    className="text-xs font-medium text-white hover:text-indigo-300 transition-colors"
                  >
                    {BUSINESS_CONFIG.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                    WhatsApp / Direct
                  </div>
                  <a
                    href={`https://wa.me/${BUSINESS_CONFIG.contact.whatsappIntl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-white hover:text-emerald-400 transition-colors"
                  >
                    {BUSINESS_CONFIG.contact.whatsappFormatted}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Studio Photo with Resilient Fallback */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 aspect-[4/3] shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/40 via-neutral-900 to-neutral-950 flex flex-col justify-end p-6">
                <div className="text-xs uppercase tracking-wider text-neutral-400 mb-1">
                  Agency Workspace
                </div>
                <div className="text-lg font-semibold text-white">
                  Crafting Digital Presences
                </div>
              </div>

              {!imageError && (
                <img
                  src={BUSINESS_CONFIG.defaults.aboutImage}
                  alt="Web development and design team workspace collaboration"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    imageLoaded ? "opacity-90" : "opacity-0"
                  }`}
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 text-xs text-neutral-300 bg-neutral-950/70 backdrop-blur-sm p-3 rounded-lg border border-neutral-800/80 flex items-center justify-between">
                <span>Direct developer collaboration</span>
                <span className="font-mono text-indigo-400">Zero Middlemen</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
