export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
}

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: "business-websites",
    number: "01",
    title: "Business Websites",
    tagline: "A dependable online home for local companies and shops.",
    description:
      "We design and code multi-section websites that clearly present your business location, operating hours, team, and services so local customers can discover you with confidence.",
    deliverables: [
      "Custom responsive design (mobile, tablet, desktop)",
      "Clear service listings with pricing or call-to-quote",
      "About, location, map link, and business hours",
      "Direct WhatsApp and phone call triggers",
    ],
  },
  {
    id: "landing-pages",
    number: "02",
    title: "Single-Page Landing Pages",
    tagline: "High-focus single-page sites built to generate enquiries.",
    description:
      "Ideal for new product launches, special service promotions, seasonal campaigns, or solo professionals who want all key details presented on a single streamlined page.",
    deliverables: [
      "Persuasive hero headline & value proposition",
      "Feature highlights and benefits breakdown",
      "Customer enquiry capture form",
      "Optimized layout for rapid mobile scrolling",
    ],
  },
  {
    id: "portfolio-websites",
    number: "03",
    title: "Portfolio Websites",
    tagline: "Showcase your craftsmanship, photography, or creative work.",
    description:
      "Designed for photographers, designers, freelancers, contractors, and creators who need their past projects presented with editorial elegance and clean categorization.",
    deliverables: [
      "High-resolution media galleries with lightbox previews",
      "Case study detail summaries and project briefs",
      "Client enquiry and commission request forms",
      "Fast image loading with modern responsive formats",
    ],
  },
  {
    id: "showcase-websites",
    number: "04",
    title: "Product & Service Showcase",
    tagline: "Display your catalog without the complexity of heavy e-commerce.",
    description:
      "Perfect for electronics retailers, clothing boutiques, furniture workshops, and salons to display menus or inventory items with direct WhatsApp order enquiries.",
    deliverables: [
      "Categorized catalog layouts with photos and specs",
      "Direct 'Enquire on WhatsApp' button for each item",
      "Clear warranty, return, or booking terms",
      "Easily updatable content structure",
    ],
  },
  {
    id: "website-redesigns",
    number: "05",
    title: "Website Redesigns",
    tagline: "Upgrade slow, outdated, or broken websites to modern standards.",
    description:
      "If your current site looks dated, breaks on smartphones, or fails to bring in enquiries, we rebuild it from the ground up with modern aesthetics, clean code, and fast performance.",
    deliverables: [
      "Full design audit of existing site friction points",
      "Clean dark or light contemporary aesthetic",
      "Improved mobile responsiveness and touch targets",
      "URL preservation to maintain existing links",
    ],
  },
  {
    id: "lead-gen-forms",
    number: "06",
    title: "Contact & Lead-Generation Forms",
    tagline: "Capture visitor details securely with instant alerts.",
    description:
      "Turn anonymous website visitors into actionable customer enquiries with validated form inputs, spam protection, database logging, and email alerts.",
    deliverables: [
      "Client-side and server-side input validation",
      "Honeypot protection against automated spam bots",
      "Persistent enquiry recording in Supabase database",
      "Email notification dispatch to owner inbox",
    ],
  },
  {
    id: "seo-foundations",
    number: "07",
    title: "Basic On-Page SEO",
    tagline: "Solid technical foundations so search engines can read your site.",
    description:
      "We configure proper semantic HTML markup, metadata, OpenGraph preview cards for social sharing, clean headings, and Schema.org structured data for local search visibility.",
    deliverables: [
      "Accurate meta titles and meta descriptions",
      "OpenGraph tags for WhatsApp, Facebook & X previews",
      "Schema.org LocalBusiness structured JSON-LD data",
      "Valid sitemap.xml and robots.txt configuration",
    ],
  },
  {
    id: "deployment-configuration",
    number: "08",
    title: "Website Deployment & Configuration",
    tagline: "Fast, secure global hosting on Cloudflare infrastructure.",
    description:
      "We handle the technical setup to take your website live on Cloudflare's free subdomain or link it to your custom domain, configuring SSL encryption for maximum safety.",
    deliverables: [
      "Automated deployment on Cloudflare Pages/Workers",
      "Free HTTPS SSL security certificate",
      "Custom domain DNS configuration assistance",
      "End-to-end testing across real mobile and desktop devices",
    ],
  },
];
