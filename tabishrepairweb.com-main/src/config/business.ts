export interface BusinessConfig {
  name: string;
  tagline: string;
  headline: string;
  supportingCopy: string;
  location: {
    city: string;
    state: string;
    country: string;
    full: string;
  };
  contact: {
    email: string;
    whatsappRaw: string;
    whatsappFormatted: string;
    whatsappIntl: string;
  };
  currency: {
    code: string;
    symbol: string;
  };
  defaults: {
    heroImage: string;
    aboutImage: string;
  };
}

export const BUSINESS_CONFIG: BusinessConfig = {
  name: "Tabish Web",
  tagline: "We build modern websites for businesses",
  headline: "Websites That Make Your Business Stand Out.",
  supportingCopy:
    "We build modern, responsive websites that help businesses showcase their services, build trust, and turn visitors into enquiries.",
  location: {
    city: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    full: "Chennai, Tamil Nadu, India",
  },
  contact: {
    email: "ta480105@gmail.com",
    whatsappRaw: "9507375721",
    whatsappFormatted: "+91 9507375721",
    whatsappIntl: "919507375721",
  },
  currency: {
    code: "INR",
    symbol: "₹",
  },
  defaults: {
    // Verified high-definition Unsplash photography for web design / digital workspace
    heroImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    aboutImage:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
  },
};

export function getWhatsAppClickToChatUrl(customMessage?: string): string {
  const defaultText = `Hello Tabish Web! I am interested in building a website for my business.`;
  const text = encodeURIComponent(customMessage || defaultText);
  return `https://wa.me/${BUSINESS_CONFIG.contact.whatsappIntl}?text=${text}`;
}
