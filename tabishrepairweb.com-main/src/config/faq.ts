export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_LIST: FAQItem[] = [
  {
    id: "cost",
    question: "How much does a website cost?",
    answer:
      "Our package starting rates range from ₹1,000 for a simple 1-page Starter website up to ₹3,000 for a comprehensive custom Premium site. The final investment depends entirely on the agreed scope, number of sections, custom features, and backend integrations required.",
  },
  {
    id: "timeline",
    question: "How long will my website take?",
    answer:
      "A Starter single-page website typically takes 2 to 4 business days once you supply your business information, photos, and copy. Larger multi-section sites with custom forms or galleries typically take 5 to 10 business days. Timelines vary based on prompt feedback and revision requests.",
  },
  {
    id: "revisions",
    question: "Can I request changes?",
    answer:
      "Yes. Every package includes a clearly agreed number of revision rounds (1 round for Starter, 2 for Professional and Business Growth, and 3 for Premium). We review the preview together and apply your agreed refinements before final deployment.",
  },
  {
    id: "whatsapp-contact",
    question: "Can I contact you through WhatsApp?",
    answer:
      "Absolutely. We are available directly on WhatsApp at +91 9507375721 for requirement discussions, progress updates, and quick questions. Click any 'Chat on WhatsApp' button on this site to start a conversation.",
  },
  {
    id: "redesign",
    question: "Can you redesign my existing website?",
    answer:
      "Yes. If your current website is slow, outdated, or hard to navigate on mobile devices, we can completely redesign it with a modern aesthetic, clean code, and faster load times while preserving your existing domain and business branding.",
  },
  {
    id: "mobile",
    question: "Will the website work on mobile?",
    answer:
      "Yes, 100%. Over 80% of local visitors in India browse websites from smartphones. We engineer every website using a responsive, mobile-first approach so it looks crisp and functions seamlessly across iPhones, Android devices, tablets, and desktop computers.",
  },
  {
    id: "deployment-help",
    question: "Can you help me deploy the website?",
    answer:
      "Yes, full deployment assistance is included in every package. We configure your site for production on Cloudflare's high-speed global network so it loads fast and securely from day one.",
  },
  {
    id: "hosting-included",
    question: "Is hosting included?",
    answer:
      "Yes, deployment on Cloudflare's high-performance free tier subdomain (e.g. yourbusiness.pages.dev) is included with no recurring hosting fees for standard traffic. For high-volume dedicated server requirements, hosting is billed separately according to your infrastructure choice.",
  },
  {
    id: "custom-domain",
    question: "Is a custom domain included?",
    answer:
      "Custom domains (such as yourbusiness.com or yourbusiness.in) are not included in the base design price. You purchase your domain directly from reputable registrars (such as Cloudflare Registrar, Namecheap, or GoDaddy) so you retain 100% legal ownership. We assist you in linking it to your website at no extra fee.",
  },
  {
    id: "third-party-costs",
    question: "Are domain and third-party service costs included?",
    answer:
      "No. Domain registration fees, third-party payment gateways, paid SMS gateways, and Meta WhatsApp Business Cloud API charges are paid directly by you to the respective providers. We maintain 100% transparent pricing so there are never hidden markups.",
  },
  {
    id: "enquiries-destination",
    question: "How do website enquiries reach me?",
    answer:
      "Depending on your package: visitors can instantly initiate a direct WhatsApp conversation via 1-tap buttons, and for packages with form backend integrations (Business Growth and Premium), submitted enquiries are stored in a secure Supabase database and instantly emailed to your inbox.",
  },
  {
    id: "after-form-submission",
    question: "What happens after I submit the form?",
    answer:
      "Once you submit the quote form on this page, your enquiry is logged. We review your requirements and reach out via WhatsApp or email within 24 hours to confirm your project details, recommend the right package, and schedule a kickoff.",
  },
];
