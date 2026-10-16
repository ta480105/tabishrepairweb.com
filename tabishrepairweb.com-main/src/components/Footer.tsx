import React from "react";
import { BUSINESS_CONFIG, getWhatsAppClickToChatUrl } from "../config/business";
import { MessageSquare, Mail, MapPin, ArrowUp } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-xl font-bold tracking-tight text-white block">
              {BUSINESS_CONFIG.name}
            </span>
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              {BUSINESS_CONFIG.tagline}. An independent web development studio based in Chennai,
              Tamil Nadu, India.
            </p>
            <div className="flex items-center gap-3 text-xs text-neutral-300">
              <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>{BUSINESS_CONFIG.location.full}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Navigation
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Pricing (INR)
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-white transition-colors">
                  Portfolio Demos
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition-colors">
                  8-Step Process
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Studio
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Target Industries */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Specialties
            </div>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>Mobile Repair Shops</li>
              <li>Electronics Stores</li>
              <li>Restaurants & Cafes</li>
              <li>Salons & Barbershops</li>
              <li>Apparel & Boutiques</li>
              <li>Local Service Contractors</li>
            </ul>
          </div>

          {/* Direct Communication */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Get in Touch
            </div>
            <div className="space-y-2.5 text-xs">
              <a
                href={getWhatsAppClickToChatUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{BUSINESS_CONFIG.contact.whatsappFormatted}</span>
              </a>
              <div className="block">
                <a
                  href={`mailto:${BUSINESS_CONFIG.contact.email}`}
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{BUSINESS_CONFIG.contact.email}</span>
                </a>
              </div>
              <div className="pt-2 text-[11px] text-neutral-400">
                Operating Hours: Monday – Saturday
                <br />
                09:30 AM – 07:30 PM IST
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div>
            © {new Date().getFullYear()} {BUSINESS_CONFIG.name}. All rights reserved. Chennai, India.
          </div>

          <div className="flex items-center gap-6">
            <span>Transparent Pricing Policy</span>
            <span aria-hidden="true">·</span>
            <span>Privacy Notice</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
