import React, { useState, useEffect } from "react";
import {
  VALID_WEBSITE_TYPES,
  VALID_BUDGETS,
  validateInquiryPayload,
  InquiryPayload,
} from "../shared/inquiryValidator";
import { BUSINESS_CONFIG, getWhatsAppClickToChatUrl } from "../config/business";
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Lock,
  RefreshCcw,
} from "lucide-react";

interface EnquiryFormProps {
  initialBudget?: string;
  initialWebsiteType?: string;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  initialBudget,
  initialWebsiteType,
}) => {
  const [formData, setFormData] = useState<InquiryPayload>({
    name: "",
    email: "",
    whatsapp: "",
    businessName: "",
    websiteType: initialWebsiteType || "Business website",
    budget: initialBudget || "₹1,500–₹1,800",
    message: "",
    botTrap: "", // Honeypot field
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [submissionId, setSubmissionId] = useState<string>("");
  const [deliveryDetails, setDeliveryDetails] = useState<{
    dbSaved?: boolean;
    emailSent?: boolean;
  }>({});

  // Sync props when user clicks "Choose This Package"
  useEffect(() => {
    if (initialBudget) {
      setFormData((prev) => ({ ...prev, budget: initialBudget }));
    }
  }, [initialBudget]);

  useEffect(() => {
    if (initialWebsiteType) {
      setFormData((prev) => ({ ...prev, websiteType: initialWebsiteType }));
    }
  }, [initialWebsiteType]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-level error on change
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Client-side validation
    const validation = validateInquiryPayload(formData);
    if (!validation.valid) {
      setFieldErrors(validation.errors);
      setSubmitStatus("error");
      setResponseMessage("Please correct the highlighted fields before submitting.");
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setResponseMessage("");

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      // Only show success if database write was actually confirmed
      if (response.ok && result.success && result.details?.dbSaved) {
        setSubmitStatus("success");
        setSubmissionId(result.inquiryId || `inq_${Date.now()}`);
        setResponseMessage(
          result.message ||
            "Thank you! Your enquiry has been received and saved. We will contact you on WhatsApp or email within 24 hours."
        );
        if (result.details) {
          setDeliveryDetails(result.details);
        }
      } else {
        setSubmitStatus("error");
        setResponseMessage(
          result.message ||
            "We were unable to save your enquiry to the database at this time. Please contact us directly on WhatsApp or email."
        );
        if (result.errors) {
          setFieldErrors(result.errors);
        }
      }
    } catch (err: any) {
      setSubmitStatus("error");
      setResponseMessage(
        "Network connection error. Could not connect to the enquiry service. You can also contact us directly via WhatsApp."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      whatsapp: "",
      businessName: "",
      websiteType: "Business website",
      budget: "₹1,500–₹1,800",
      message: "",
      botTrap: "",
    });
    setSubmitStatus("idle");
    setResponseMessage("");
    setFieldErrors({});
    setSubmissionId("");
  };

  const generateWhatsAppBackupText = () => {
    const text = `Hi Tabish Web! I submitted an enquiry for ${formData.businessName || "my business"}.
Website Type: ${formData.websiteType}
Budget Range: ${formData.budget}
Contact Email: ${formData.email}
Phone: ${formData.whatsapp}
Details: ${formData.message}`;
    return getWhatsAppClickToChatUrl(text);
  };

  return (
    <section id="contact" className="py-24 bg-neutral-950 border-b border-neutral-800/80 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Context & Direct Contact */}
          <div className="lg:col-span-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">
              Start Your Project
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Get a Free Quote & Consultation
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed mb-8">
              Tell us about your business, the pages you need, and your target budget.
              We will review your requirements and provide a clear, fixed quote with no hidden extras.
            </p>

            {/* Direct Contact Card */}
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4 mb-6">
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                Direct Contact Channels
              </div>

              <div>
                <div className="text-[11px] text-neutral-400">WhatsApp Discussion</div>
                <a
                  href={getWhatsAppClickToChatUrl("Hi Tabish Web, I would like to get a quote for a new website.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1.5 mt-0.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{BUSINESS_CONFIG.contact.whatsappFormatted}</span>
                </a>
              </div>

              <div>
                <div className="text-[11px] text-neutral-400">Enquiries Email</div>
                <a
                  href={`mailto:${BUSINESS_CONFIG.contact.email}`}
                  className="text-sm font-semibold text-white hover:text-indigo-400 transition-colors mt-0.5 block"
                >
                  {BUSINESS_CONFIG.contact.email}
                </a>
              </div>

              <div>
                <div className="text-[11px] text-neutral-400">Operating Location</div>
                <div className="text-sm text-neutral-300 mt-0.5">{BUSINESS_CONFIG.location.full}</div>
              </div>
            </div>

            <div className="text-xs text-neutral-400 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span>We never sell or spam your contact details. Used strictly for quote delivery.</span>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800 shadow-xl">
              {submitStatus === "success" ? (
                /* Success View */
                <div className="py-8 text-center space-y-6">
                  <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Enquiry Received!</h3>
                    <p className="text-neutral-300 text-sm max-w-md mx-auto leading-relaxed">
                      {responseMessage}
                    </p>
                  </div>

                  {/* Submission metadata */}
                  <div className="bg-neutral-950/70 p-4 rounded-xl border border-neutral-800 text-left max-w-md mx-auto space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-neutral-400">
                      <span>Reference ID:</span>
                      <span className="text-indigo-400 font-semibold">{submissionId}</span>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                      <span>Business:</span>
                      <span className="text-white">{formData.businessName}</span>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                      <span>Budget:</span>
                      <span className="text-white">{formData.budget}</span>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                      <span>Website Type:</span>
                      <span className="text-white">{formData.websiteType}</span>
                    </div>
                    <div className="flex justify-between text-neutral-400 pt-1 border-t border-neutral-800">
                      <span>Database Record:</span>
                      <span className="text-emerald-400 font-semibold">Confirmed</span>
                    </div>
                    {deliveryDetails.emailSent !== undefined && (
                      <div className="flex justify-between text-neutral-400">
                        <span>Email Notification:</span>
                        <span className={deliveryDetails.emailSent ? "text-emerald-400" : "text-neutral-400"}>
                          {deliveryDetails.emailSent ? "Dispatched" : "Queued"}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={generateWhatsAppBackupText()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider rounded-lg inline-flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Speed Up via WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold rounded-lg inline-flex items-center justify-center gap-2"
                    >
                      <RefreshCcw className="w-3.5 h-3.5" />
                      <span>Submit Another Enquiry</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Form Fields */
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Honeypot field (hidden from real users, caught if bots fill it) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="botTrap">Do not fill this field</label>
                    <input
                      type="text"
                      id="botTrap"
                      name="botTrap"
                      value={formData.botTrap || ""}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {submitStatus === "error" && (
                    <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-800 text-xs text-rose-200 flex items-start gap-3">
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <div>{responseMessage}</div>
                    </div>
                  )}

                  {/* 1. Full Name & Business Name Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-neutral-200 mb-1.5">
                        Your Full Name <span className="text-indigo-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Ramesh Kumar"
                        className={`w-full px-3.5 py-2.5 text-sm rounded-lg bg-neutral-950 border ${
                          fieldErrors.name ? "border-rose-500 ring-1 ring-rose-500" : "border-neutral-800 focus:border-indigo-500"
                        } text-white placeholder-neutral-500 focus:outline-none transition-colors`}
                      />
                      {fieldErrors.name && (
                        <p className="text-[11px] text-rose-400 mt-1">{fieldErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="businessName" className="block text-xs font-semibold text-neutral-200 mb-1.5">
                        Business Name <span className="text-indigo-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="businessName"
                        name="businessName"
                        required
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="e.g. City Tech Repair"
                        className={`w-full px-3.5 py-2.5 text-sm rounded-lg bg-neutral-950 border ${
                          fieldErrors.businessName ? "border-rose-500 ring-1 ring-rose-500" : "border-neutral-800 focus:border-indigo-500"
                        } text-white placeholder-neutral-500 focus:outline-none transition-colors`}
                      />
                      {fieldErrors.businessName && (
                        <p className="text-[11px] text-rose-400 mt-1">{fieldErrors.businessName}</p>
                      )}
                    </div>
                  </div>

                  {/* 2. Email & WhatsApp Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-neutral-200 mb-1.5">
                        Email Address <span className="text-indigo-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@business.com"
                        className={`w-full px-3.5 py-2.5 text-sm rounded-lg bg-neutral-950 border ${
                          fieldErrors.email ? "border-rose-500 ring-1 ring-rose-500" : "border-neutral-800 focus:border-indigo-500"
                        } text-white placeholder-neutral-500 focus:outline-none transition-colors`}
                      />
                      {fieldErrors.email && (
                        <p className="text-[11px] text-rose-400 mt-1">{fieldErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="whatsapp" className="block text-xs font-semibold text-neutral-200 mb-1.5">
                        WhatsApp Number <span className="text-indigo-400">*</span>
                      </label>
                      <input
                        type="tel"
                        id="whatsapp"
                        name="whatsapp"
                        required
                        value={formData.whatsapp}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className={`w-full px-3.5 py-2.5 text-sm rounded-lg bg-neutral-950 border ${
                          fieldErrors.whatsapp ? "border-rose-500 ring-1 ring-rose-500" : "border-neutral-800 focus:border-indigo-500"
                        } text-white placeholder-neutral-500 focus:outline-none transition-colors`}
                      />
                      {fieldErrors.whatsapp && (
                        <p className="text-[11px] text-rose-400 mt-1">{fieldErrors.whatsapp}</p>
                      )}
                    </div>
                  </div>

                  {/* 3. Website Type & Budget Dropdowns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="websiteType" className="block text-xs font-semibold text-neutral-200 mb-1.5">
                        Website Type <span className="text-indigo-400">*</span>
                      </label>
                      <select
                        id="websiteType"
                        name="websiteType"
                        value={formData.websiteType}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:border-indigo-500 focus:outline-none transition-colors"
                      >
                        {VALID_WEBSITE_TYPES.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {fieldErrors.websiteType && (
                        <p className="text-[11px] text-rose-400 mt-1">{fieldErrors.websiteType}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="budget" className="block text-xs font-semibold text-neutral-200 mb-1.5">
                        Target Budget (INR) <span className="text-indigo-400">*</span>
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:border-indigo-500 focus:outline-none transition-colors"
                      >
                        {VALID_BUDGETS.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                      {fieldErrors.budget && (
                        <p className="text-[11px] text-rose-400 mt-1">{fieldErrors.budget}</p>
                      )}
                    </div>
                  </div>

                  {/* 4. Message / Project Requirements */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-neutral-200 mb-1.5">
                      Tell Us About Your Project <span className="text-indigo-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe what services you offer, how many pages you want, or share a link to your current website/Instagram page..."
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg bg-neutral-950 border ${
                        fieldErrors.message ? "border-rose-500 ring-1 ring-rose-500" : "border-neutral-800 focus:border-indigo-500"
                      } text-white placeholder-neutral-500 focus:outline-none transition-colors`}
                    />
                    {fieldErrors.message && (
                      <p className="text-[11px] text-rose-400 mt-1">{fieldErrors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 text-xs font-bold uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-500 disabled:bg-neutral-800 disabled:text-neutral-500 rounded-lg shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting Enquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Free Quote Request</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] text-neutral-400 text-center">
                    By submitting, you agree to receive a project quote via WhatsApp or email.
                    No spam. No obligation.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
