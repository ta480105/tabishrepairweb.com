export interface InquiryPayload {
  name: string;
  email: string;
  whatsapp: string;
  businessName: string;
  websiteType: string;
  budget: string;
  message: string;
  // Honeypot field for bot detection (must be empty)
  botTrap?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
  sanitized?: {
    name: string;
    email: string;
    whatsapp: string;
    business_name: string;
    website_type: string;
    budget: string;
    message: string;
  };
}

export const VALID_WEBSITE_TYPES = [
  "Business website",
  "Landing page",
  "Portfolio website",
  "E-commerce website",
  "Website redesign",
  "Other",
] as const;

export const VALID_BUDGETS = [
  "₹1,000–₹1,300",
  "₹1,500–₹1,800",
  "₹2,000",
  "₹3,000",
  "Need advice",
] as const;

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
// Supports +91 9507375721, 9507375721, +91-9507375721, etc.
const PHONE_CLEAN_REGEX = /[^0-9+]/g;

export function validateInquiryPayload(payload: Partial<InquiryPayload>): ValidationResult {
  const errors: Record<string, string> = {};

  // 1. Honeypot check
  if (payload.botTrap && payload.botTrap.trim().length > 0) {
    errors.botTrap = "Spam detected";
    return { valid: false, errors };
  }

  // 2. Name validation
  const name = (payload.name || "").trim();
  if (!name) {
    errors.name = "Full name is required";
  } else if (name.length < 2) {
    errors.name = "Full name must be at least 2 characters";
  } else if (name.length > 100) {
    errors.name = "Full name must be under 100 characters";
  }

  // 3. Email validation
  const email = (payload.email || "").trim().toLowerCase();
  if (!email) {
    errors.email = "Email address is required";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Please enter a valid email address (e.g. name@example.com)";
  } else if (email.length > 120) {
    errors.email = "Email address is too long";
  }

  // 4. WhatsApp number validation
  const rawWhatsapp = (payload.whatsapp || "").trim();
  const cleanedWhatsapp = rawWhatsapp.replace(PHONE_CLEAN_REGEX, "");
  if (!rawWhatsapp) {
    errors.whatsapp = "WhatsApp number is required";
  } else if (cleanedWhatsapp.length < 7 || cleanedWhatsapp.length > 20) {
    errors.whatsapp = "Please enter a valid WhatsApp phone number";
  }

  // 5. Business Name validation
  const businessName = (payload.businessName || "").trim();
  if (!businessName) {
    errors.businessName = "Business name is required";
  } else if (businessName.length > 150) {
    errors.businessName = "Business name must be under 150 characters";
  }

  // 6. Website Type validation
  const websiteType = (payload.websiteType || "").trim();
  if (!websiteType) {
    errors.websiteType = "Please select a website type";
  } else if (!VALID_WEBSITE_TYPES.includes(websiteType as any)) {
    errors.websiteType = "Invalid website type selection";
  }

  // 7. Budget validation
  const budget = (payload.budget || "").trim();
  if (!budget) {
    errors.budget = "Please select a budget range";
  } else if (!VALID_BUDGETS.includes(budget as any)) {
    errors.budget = "Invalid budget range selection";
  }

  // 8. Message validation
  const message = (payload.message || "").trim();
  if (!message) {
    errors.message = "Please describe what your business needs";
  } else if (message.length < 5) {
    errors.message = "Message must be at least 5 characters";
  } else if (message.length > 3000) {
    errors.message = "Message must be under 3000 characters";
  }

  const valid = Object.keys(errors).length === 0;

  return {
    valid,
    errors,
    sanitized: valid
      ? {
          name,
          email,
          whatsapp: cleanedWhatsapp,
          business_name: businessName,
          website_type: websiteType,
          budget,
          message,
        }
      : undefined,
  };
}
