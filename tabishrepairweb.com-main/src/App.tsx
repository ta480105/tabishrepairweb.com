import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { TrustBenefits } from "./components/TrustBenefits";
import { ServicesSection } from "./components/ServicesSection";
import { PortfolioSection } from "./components/PortfolioSection";
import { PricingSection } from "./components/PricingSection";
import { ProcessSection } from "./components/ProcessSection";
import { AboutSection } from "./components/AboutSection";
import { FAQSection } from "./components/FAQSection";
import { EnquiryForm } from "./components/EnquiryForm";
import { Footer } from "./components/Footer";
import { PricingPackage } from "./config/pricing";
import { BUSINESS_CONFIG, getWhatsAppClickToChatUrl } from "./config/business";
import { MessageSquare } from "lucide-react";

export default function App() {
  const [selectedBudget, setSelectedBudget] = useState<string>("₹1,500–₹1,800");
  const [selectedWebsiteType, setSelectedWebsiteType] = useState<string>("Business website");

  const scrollToContact = () => {
    const contactElem = document.getElementById("contact");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToPricing = () => {
    const pricingElem = document.getElementById("pricing");
    if (pricingElem) {
      pricingElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectPackage = (pkg: PricingPackage) => {
    setSelectedBudget(pkg.budgetOption);
    scrollToContact();
  };

  const handleSelectService = (serviceTitle: string) => {
    if (serviceTitle.includes("Landing")) {
      setSelectedWebsiteType("Landing page");
    } else if (serviceTitle.includes("Portfolio")) {
      setSelectedWebsiteType("Portfolio website");
    } else if (serviceTitle.includes("Redesign")) {
      setSelectedWebsiteType("Website redesign");
    } else if (serviceTitle.includes("Showcase")) {
      setSelectedWebsiteType("E-commerce website");
    } else {
      setSelectedWebsiteType("Business website");
    }
    scrollToContact();
  };

  const handleEnquireSimilar = (_projectName: string, category: string) => {
    if (category.includes("Repair") || category.includes("Service")) {
      setSelectedWebsiteType("Business website");
    } else if (category.includes("Clothing") || category.includes("Electronics")) {
      setSelectedWebsiteType("E-commerce website");
    } else if (category.includes("Restaurant")) {
      setSelectedWebsiteType("Business website");
    }
    scrollToContact();
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      {/* 1. Header with strict 3-zone contract */}
      <Navbar onQuoteClick={scrollToContact} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          onQuoteClick={scrollToContact}
          onExplorePackagesClick={scrollToPricing}
        />

        {/* 3. Trust & Benefits */}
        <TrustBenefits />

        {/* 4. Core Services */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* 5. Concept Portfolio Demos */}
        <PortfolioSection onEnquireSimilar={handleEnquireSimilar} />

        {/* 6. Pricing Packages & Comparison */}
        <PricingSection onSelectPackage={handleSelectPackage} />

        {/* 7. 8-Step Collaborative Process */}
        <ProcessSection />

        {/* 8. About Tabish Web */}
        <AboutSection />

        {/* 9. Comprehensive FAQ */}
        <FAQSection />

        {/* 10. Live Enquiry Form with Supabase & Email integration */}
        <EnquiryForm
          initialBudget={selectedBudget}
          initialWebsiteType={selectedWebsiteType}
        />
      </main>

      {/* 11. Quiet Footer */}
      <Footer />

      {/* Persistent Quick WhatsApp Button on Mobile/Desktop */}
      <aside aria-label="Direct WhatsApp Contact" className="fixed bottom-6 right-6 z-40">
        <a
          href={getWhatsAppClickToChatUrl("Hi Tabish Web! I have a question about building a website.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs rounded-full shadow-2xl shadow-emerald-950/50 hover:scale-105 active:scale-95 transition-all"
          aria-label={`Chat on WhatsApp with ${BUSINESS_CONFIG.name}`}
        >
          <MessageSquare className="w-4 h-4" />
          <span className="hidden sm:inline">WhatsApp Us</span>
        </a>
      </aside>
    </div>
  );
}
