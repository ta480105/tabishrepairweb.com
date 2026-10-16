export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  responsibility: "Client" | "Tabish Web" | "Joint";
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Submit Your Enquiry",
    description:
      "Fill out the quick quote form on this page or message us directly on WhatsApp with your business type, goals, and budget.",
    responsibility: "Client",
  },
  {
    step: "02",
    title: "Discuss Requirements & Scope",
    description:
      "We discuss what pages, features, and visual style your business needs, identifying the best package for your budget.",
    responsibility: "Joint",
  },
  {
    step: "03",
    title: "Agree on Price & Timeline",
    description:
      "We establish a clear written agreement specifying the deliverables, timeline, revision rounds, and upfront terms before writing code.",
    responsibility: "Joint",
  },
  {
    step: "04",
    title: "Supply Business Assets",
    description:
      "You provide your business logo, contact details, operating hours, service list, and any available photos or menu items.",
    responsibility: "Client",
  },
  {
    step: "05",
    title: "Design & Development",
    description:
      "Tabish Web crafts a modern, mobile-responsive website tailored to your brand with clean typography and fast load performance.",
    responsibility: "Tabish Web",
  },
  {
    step: "06",
    title: "Interactive Preview Review",
    description:
      "We share a private working link so you can test the website on your phone, tablet, and computer to evaluate real interactions.",
    responsibility: "Client",
  },
  {
    step: "07",
    title: "Agreed Revisions",
    description:
      "We refine text, layouts, colors, or images based on your feedback within the agreed package revision rounds.",
    responsibility: "Tabish Web",
  },
  {
    step: "08",
    title: "Final Approval & Deployment",
    description:
      "Following your final approval and milestone settlement, we deploy your live website to Cloudflare and provide handover instructions.",
    responsibility: "Joint",
  },
];
