export interface PricingPackage {
  id: string;
  name: string;
  priceLabel: string;
  priceRange: string;
  budgetOption: string;
  badge?: string;
  popular?: boolean;
  idealFor: string;
  features: string[];
  revisionRounds: number;
  deploymentAssistance: boolean;
  limitations: string[];
}

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: "starter",
    name: "Starter",
    priceLabel: "₹1,000 – ₹1,300",
    priceRange: "₹1,000–₹1,300",
    budgetOption: "₹1,000–₹1,300",
    idealFor: "Small shops, single technicians & businesses needing a clean first online presence.",
    features: [
      "Clean 1-page modern website structure",
      "Fully responsive mobile and desktop layout",
      "Hero section with headline & business introduction",
      "Core services list & business hours showcase",
      "Click-to-chat WhatsApp direct button",
      "Contact details & location display",
      "Curated high-resolution stock photography",
      "Basic page title and meta description for SEO",
      "Basic form UI if included in agreed scope",
      "Cloudflare deployment assistance",
      "1 agreed revision round",
    ],
    revisionRounds: 1,
    deploymentAssistance: true,
    limitations: [
      "Database-backed form not automatically included",
      "Automated email notifications require separate scope",
      "Content & logo must be provided by business",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    priceLabel: "₹1,500 – ₹1,800",
    priceRange: "₹1,500–₹1,800",
    budgetOption: "₹1,500–₹1,800",
    popular: true,
    badge: "Most Popular",
    idealFor: "Retail stores, salons, cafes & businesses wanting stronger presentation & FAQ.",
    features: [
      "Everything in Starter package",
      "Multi-section layout with enhanced visual hierarchy",
      "Detailed service breakdown cards",
      "Photo gallery or portfolio showcase section",
      "Interactive FAQ section with accordions",
      "Customer testimonials section (when genuine reviews supplied)",
      "Strategic conversion call-to-action placement",
      "Basic on-page SEO setup & structured tags",
      "Enquiry form UI (subject to agreed backend scope)",
      "Cloudflare deployment assistance & configuration",
      "2 agreed revision rounds",
    ],
    revisionRounds: 2,
    deploymentAssistance: true,
    limitations: [
      "Database & automated notifications quoted separately if needed",
      "Third-party custom domain costs paid directly to registrar",
    ],
  },
  {
    id: "business-growth",
    name: "Business Growth",
    priceLabel: "₹2,000",
    priceRange: "₹2,000",
    budgetOption: "₹2,000",
    idealFor: "Businesses requiring a working enquiry capture workflow and email notifications.",
    features: [
      "Everything in Professional package",
      "Multiple comprehensive sections tailored to your brand",
      "Business work gallery with category tagging",
      "Detailed services with pricing/rate transparency",
      "Working enquiry form with client-side & server-side validation",
      "Supabase persistent enquiry storage (when configured)",
      "Gmail instant email alert to owner (when configured)",
      "WhatsApp click-to-chat with pre-filled enquiry text",
      "Basic metadata, sitemap & robots.txt foundations",
      "Clear success and error user feedback states",
      "Deployment & production connectivity testing",
      "2 agreed revision rounds",
    ],
    revisionRounds: 2,
    deploymentAssistance: true,
    limitations: [
      "WhatsApp API automated notifications require WhatsApp Business credentials",
      "Owner provides product details, text and business assets",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    priceLabel: "₹3,000",
    priceRange: "₹3,000",
    budgetOption: "₹3,000",
    badge: "Maximum Polish",
    idealFor: "Clients wanting custom page design, deeper integrations & comprehensive handover.",
    features: [
      "Everything in Business Growth package",
      "Custom tailored page layouts and polished visual aesthetics",
      "Enhanced portfolio/gallery layout with interactive filters",
      "Refined micro-interactions and smooth transitions",
      "Advanced enquiry form fields with honeypot spam protection",
      "Supabase database integration with Row Level Security",
      "Server-side email notification integration",
      "WhatsApp Business API support (if credentials provided by client)",
      "Basic analytics integration (with privacy/consent adherence)",
      "Optimized OpenGraph & social sharing link previews",
      "Production performance verification & safety audit",
      "3 agreed revision rounds",
      "Complete handover documentation & deployment guide",
    ],
    revisionRounds: 3,
    deploymentAssistance: true,
    limitations: [
      "Third-party API subscriptions (e.g. Meta WhatsApp API) billed by provider",
      "Revisions beyond 3 rounds quoted at standard hourly rate",
    ],
  },
];

export const TRANSPARENCY_NOTES = [
  "Transparent Starting Rates: Prices shown are starting ranges for typical scopes. Final pricing depends on your agreed page count and features.",
  "Revision Scope: Revisions are clearly bounded (1 to 3 rounds by package) to ensure timely project delivery.",
  "Domains & Hosting: Deployed to fast Cloudflare free subdomains (.pages.dev). Custom domain names (.com, .in) are purchased directly by you from any registrar.",
  "Business Content: The business owner supplies brand logos, specific text, product photos, and pricing info.",
  "WhatsApp Distinction: Click-to-chat buttons are standard on all packages. Automated bot/API notifications require WhatsApp Cloud API credentials.",
];
