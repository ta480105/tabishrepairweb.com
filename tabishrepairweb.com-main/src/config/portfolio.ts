export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  badge: "Demo Project" | "Concept Project" | "Client Project";
  sector: string;
  summary: string;
  keyFeatures: string[];
  imageUrl: string;
  imageAlt: string;
  fallbackGradient: string;
  liveUrl?: string; // Optional live URL for future actual clients
  clientName?: string;
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "techfix-pro",
    title: "TechFix Pro",
    category: "Mobile Repair Shop",
    badge: "Concept Project",
    sector: "Smartphone & Tablet Repair",
    summary:
      "A fast, high-converting concept website for an electronics and smartphone repair shop featuring direct diagnostic price estimates and 1-tap WhatsApp booking.",
    keyFeatures: [
      "Repair service rate card with transparent diagnostics",
      "Instant WhatsApp booking with pre-filled device details",
      "Interactive repair warranty & FAQ section",
      "Walk-in address and live shop hours banner",
    ],
    // High-resolution photo of professional smartphone workbench repair
    imageUrl:
      "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Technician repairing smartphone circuit board with precision tools",
    fallbackGradient: "from-blue-900/40 via-neutral-900 to-neutral-950",
  },
  {
    id: "volta-electronics",
    title: "Volta Electronics",
    category: "Electronics Store",
    badge: "Concept Project",
    sector: "Retail & Consumer Electronics",
    summary:
      "A clean catalog showcase for a neighborhood electronics retail shop displaying audio systems, smart TVs, appliances, and in-store promotional offers.",
    keyFeatures: [
      "Weekly specials showcase without complex checkout friction",
      "Specifications table with filter by product category",
      "Direct WhatsApp enquiry button per product card",
      "Store location map link and EMI financing options",
    ],
    // High-resolution photo of modern electronics and audio equipment
    imageUrl:
      "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Modern consumer electronics and audio headphones display",
    fallbackGradient: "from-indigo-900/40 via-neutral-900 to-neutral-950",
  },
  {
    id: "spice-wood",
    title: "Spice & Wood Kitchen",
    category: "Restaurant & Cafe",
    badge: "Concept Project",
    sector: "Hospitality & Dining",
    summary:
      "An atmospheric dining website for a contemporary local cafe with a digital food menu, table reservation requests, and direct takeaway ordering via WhatsApp.",
    keyFeatures: [
      "Mobile-optimized dietary-tagged food & beverage menu",
      "Reservation enquiry form with date and party size",
      "High-definition photography of signature dishes",
      "Timings, parking notes, and chef's daily specials",
    ],
    // High-resolution photo of warm restaurant dining interior
    imageUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Warmly lit restaurant interior with tables set for dining",
    fallbackGradient: "from-amber-950/40 via-neutral-900 to-neutral-950",
  },
  {
    id: "urban-cut",
    title: "Urban Cut Studio",
    category: "Salon & Barbershop",
    badge: "Concept Project",
    sector: "Personal Grooming & Care",
    summary:
      "A sleek dark-mode portfolio for a premium hair and grooming salon, highlighting styling packages, stylist profiles, and time-slot appointment requests.",
    keyFeatures: [
      "Categorized service menu (Haircut, Beard, Styling, Spa)",
      "Stylist portfolio gallery with grooming results",
      "Simple appointment request flow into WhatsApp",
      "Walk-in guidelines and hygiene commitment",
    ],
    // High-resolution photo of modern barber chair and salon interior
    imageUrl:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Modern barbershop chair and grooming styling equipment",
    fallbackGradient: "from-stone-900/60 via-neutral-900 to-neutral-950",
  },
  {
    id: "kaveri-threads",
    title: "Kaveri Threads",
    category: "Clothing Store",
    badge: "Concept Project",
    sector: "Boutique Apparel & Textiles",
    summary:
      "An editorial collection showcase for a boutique clothing brand displaying seasonal fabrics, bridal wear collections, and custom tailoring consultations.",
    keyFeatures: [
      "Lookbook gallery with high-resolution textile textures",
      "Fabric care guides and custom measurement request form",
      "Direct chat link to check garment size availability",
      "Store timings in Chennai and parking details",
    ],
    // High-resolution photo of artisan fabrics and clothing rack
    imageUrl:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80",
    imageAlt: "High quality apparel collection displayed on minimalist racks",
    fallbackGradient: "from-rose-950/40 via-neutral-900 to-neutral-950",
  },
  {
    id: "apex-services",
    title: "Apex Home Solutions",
    category: "Local Service Business",
    badge: "Concept Project",
    sector: "Electrical & Plumbing Services",
    summary:
      "A trustworthy local contractor website built for fast lead generation, emergency contact visibility, and transparent inspection fees.",
    keyFeatures: [
      "Emergency service hotline click-to-call banner",
      "Verified technician checklist and safety protocols",
      "Quote request form with service category selection",
      "Service coverage area map across Chennai districts",
    ],
    // High-resolution photo of professional electrical technician tools
    imageUrl:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Professional technician preparing equipment for home maintenance",
    fallbackGradient: "from-slate-900/60 via-neutral-900 to-neutral-950",
  },
];
