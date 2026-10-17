import { createClient } from "@supabase/supabase-js";
import { validateInquiryPayload, InquiryPayload } from "../shared/inquiryValidator.js";

// In-memory rate limiting map for basic abuse prevention
const rateLimitMap = new Map<string, { count: number; firstSeen: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS_PER_WINDOW = 5;

export interface ServiceEnv {
  SUPABASE_URL?: string;
  SUPABASE_ANON_KEY?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  SUPABASE_SECRET_KEY?: string;
  EMAIL_PROVIDER_API_KEY?: string;
  EMAIL_FROM?: string;
  INQUIRY_TO?: string;
  WHATSAPP_NUMBER?: string;
  WHATSAPP_CLOUD_API_TOKEN?: string;
  WHATSAPP_PHONE_NUMBER_ID?: string;
}

export interface ProcessInquiryResult {
  success: boolean;
  statusCode: number;
  inquiryId?: string;
  message: string;
  errors?: Record<string, string>;
  details?: {
    dbSaved: boolean;
    emailSent: boolean;
    whatsappStatus: "not_configured" | "delivered" | "failed";
  };
}

export function checkRateLimit(clientIp: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(clientIp);

  if (!entry) {
    rateLimitMap.set(clientIp, { count: 1, firstSeen: now });
    return true;
  }

  if (now - entry.firstSeen > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(clientIp, { count: 1, firstSeen: now });
    return true;
  }

  entry.count += 1;
  if (entry.count > MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  return true;
}

export async function processInquiry(
  rawPayload: unknown,
  clientIp: string,
  env: ServiceEnv
): Promise<ProcessInquiryResult> {
  // 1. Rate limiting check
  if (!checkRateLimit(clientIp)) {
    return {
      success: false,
      statusCode: 429,
      message: "Too many submission attempts. Please wait 1 minute before trying again.",
    };
  }

  // 2. Validate input
  const validation = validateInquiryPayload((rawPayload || {}) as Partial<InquiryPayload>);
  if (!validation.valid || !validation.sanitized) {
    return {
      success: false,
      statusCode: 400,
      message: "Validation failed. Please correct the highlighted errors.",
      errors: validation.errors,
    };
  }

  const { sanitized } = validation;
  // Cloudflare Pages Functions do not guarantee a Node.js `process` global.
  const runtimeEnv = typeof process !== "undefined" ? process.env : {};
  let inquiryId = `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  let dbSaved = false;
  let databaseFailureStatus = 500;
  let emailSent = false;
  let whatsappStatus: "not_configured" | "delivered" | "failed" = "not_configured";

  // Structured server-side logging: masked client and metadata
  const maskedIp = hashIp(clientIp);
  console.log(
    `[INQUIRY_REQUEST] Ref: ${inquiryId} | Client: ${maskedIp} | Type: ${sanitized.website_type} | Budget: ${sanitized.budget}`
  );

  // 3. Save to Supabase if configured
  const supabaseUrl = (env.SUPABASE_URL || runtimeEnv.SUPABASE_URL || "").trim();
  // Enquiries are inserted only from the server using a server-side secret.
  // Never fall back to the public anon key: that can fail on INSERT grants/RLS
  // and can make the production configuration appear healthy when it is not.
  const serviceKey =
    (env.SUPABASE_SECRET_KEY || "").trim() ||
    (env.SUPABASE_SERVICE_ROLE_KEY || "").trim() ||
    (runtimeEnv.SUPABASE_SECRET_KEY || "").trim() ||
    (runtimeEnv.SUPABASE_SERVICE_ROLE_KEY || "").trim();

  console.log(
    `[SUPABASE_KEY_CONFIG] Ref: ${inquiryId} | Server key configured: ${Boolean(serviceKey)} | URL configured: ${Boolean(supabaseUrl)}`
  );

  if (supabaseUrl && serviceKey) {
    try {
      const supabase = createClient(supabaseUrl, serviceKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      });

      const insertPayload = {
        name: sanitized.name,
        email: sanitized.email,
        whatsapp: sanitized.whatsapp,
        business_name: sanitized.business_name,
        website_type: sanitized.website_type,
        budget: sanitized.budget,
        message: sanitized.message,
        status: "new",
        ip_hash: clientIp ? hashIp(clientIp) : null,
      };

      const { data, error } = await supabase
        .from("enquiries")
        .insert([insertPayload])
        .select("id")
        .single();

      if (error) {
        // Do not log PostgREST message/details: some database errors can echo submitted values.
        console.error(
          `[SUPABASE_ERROR] Ref: ${inquiryId} | Code: ${error.code || "unknown"} | HTTP status: ${error.status || "unknown"}`
        );
      } else if (data?.id) {
        inquiryId = data.id;
        dbSaved = true;
        console.log(`[SUPABASE_STATUS] Ref: ${inquiryId} | Saved: true`);
      } else {
        console.error(`[SUPABASE_ERROR] Ref: ${inquiryId} | Code: EMPTY_INSERT_RESPONSE | Insert returned no row ID`);
      }
    } catch (err: any) {
      const errorName = typeof err?.name === "string" ? err.name : "UnknownError";
      console.error(`[SUPABASE_ERROR] Ref: ${inquiryId} | Connection error type: ${errorName}`);
    }
  } else {
    databaseFailureStatus = 503;
    const missingSetting = !supabaseUrl
      ? "SUPABASE_URL"
      : "SUPABASE_SECRET_KEY or SUPABASE_SERVICE_ROLE_KEY";
    console.error(`[SUPABASE_CONFIG_ERROR] Ref: ${inquiryId} | Missing required setting: ${missingSetting}`);
  }

  // A database failure must stop the pipeline. Do not send notifications for an
  // enquiry that was not durably stored, and never return a success-shaped result.
  if (!dbSaved) {
    return {
      success: false,
      statusCode: databaseFailureStatus,
      inquiryId,
      message:
        "Unable to record your enquiry in the database at this time. Please contact us directly on WhatsApp or email so we can take your requirements right away.",
      details: {
        dbSaved: false,
        emailSent: false,
        whatsappStatus: "not_configured",
      },
    };
  }

  // 4. Send Email Notification if configured (supports EMAIL_PROVIDER_API_KEY or RESEND_API_KEY)
  const emailApiKey =
    env.EMAIL_PROVIDER_API_KEY ||
    runtimeEnv.EMAIL_PROVIDER_API_KEY ||
    (env as any).RESEND_API_KEY ||
    runtimeEnv.RESEND_API_KEY;
  const targetEmail = env.INQUIRY_TO || runtimeEnv.INQUIRY_TO || "ta480105@gmail.com";
  const emailFrom = env.EMAIL_FROM || runtimeEnv.EMAIL_FROM || "Tabish Web <onboarding@resend.dev>";

  if (emailApiKey) {
    try {
      const emailHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h2 style="color: #1e1b4b; margin-top: 0;">New Website Enquiry – Tabish Web</h2>
          <p><strong>Customer Name:</strong> ${escapeHtml(sanitized.name)}</p>
          <p><strong>Business Name:</strong> ${escapeHtml(sanitized.business_name)}</p>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(sanitized.email)}">${escapeHtml(sanitized.email)}</a></p>
          <p><strong>WhatsApp:</strong> <a href="https://wa.me/${sanitized.whatsapp}">${escapeHtml(sanitized.whatsapp)}</a></p>
          <p><strong>Requested Website Type:</strong> ${escapeHtml(sanitized.website_type)}</p>
          <p><strong>Budget Range:</strong> ${escapeHtml(sanitized.budget)}</p>
          <p><strong>Submission ID:</strong> ${inquiryId}</p>
          <p><strong>Timestamp (UTC):</strong> ${new Date().toISOString()}</p>
          <div style="background-color: #f3f4f6; padding: 12px; border-radius: 6px; margin-top: 15px;">
            <p style="margin: 0 0 6px 0; font-weight: bold;">Project Details & Message:</p>
            <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(sanitized.message)}</p>
          </div>
        </div>
      `;

      // Dispatch via Resend API (standard HTTP JSON request, works in both Node and Cloudflare Workers)
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${emailApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: emailFrom,
          to: [targetEmail],
          reply_to: sanitized.email,
          subject: `New Enquiry from ${sanitized.business_name} (${sanitized.name}) - ${sanitized.budget}`,
          html: emailHtml,
        }),
      });

      if (res.ok) {
        emailSent = true;
        const resData: any = await res.json().catch(() => ({}));
        console.log(
          `[RESEND_STATUS] Ref: ${inquiryId} | Delivered: true | HTTP ${res.status} | ResendID: ${resData?.id || 'OK'}`
        );
      } else {
        const errorText = await res.text();
        console.warn(
          `[RESEND_STATUS] Ref: ${inquiryId} | Delivered: false | HTTP ${res.status} | Error: ${errorText}`
        );
      }
    } catch (err: any) {
      console.warn(`[RESEND_STATUS] Ref: ${inquiryId} | Delivered: false | Provider Error: ${err?.message || err}`);
    }
  } else {
    console.info(`[RESEND_STATUS] Ref: ${inquiryId} | Email provider API key not set; dispatch bypassed.`);
  }

  // 5. WhatsApp Automated API (if WhatsApp Cloud API credentials configured)
  const waToken = env.WHATSAPP_CLOUD_API_TOKEN || runtimeEnv.WHATSAPP_CLOUD_API_TOKEN;
  const waPhoneId = env.WHATSAPP_PHONE_NUMBER_ID || runtimeEnv.WHATSAPP_PHONE_NUMBER_ID;
  const waRecipient = env.WHATSAPP_NUMBER || runtimeEnv.WHATSAPP_NUMBER || "919507375721";

  if (waToken && waPhoneId) {
    try {
      const waRes = await fetch(`https://graph.facebook.com/v19.0/${waPhoneId}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${waToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: waRecipient,
          type: "text",
          text: {
            body: `*New Website Lead from Tabish Web*\n\n*Name:* ${sanitized.name}\n*Business:* ${sanitized.business_name}\n*Budget:* ${sanitized.budget}\n*Type:* ${sanitized.website_type}\n*WhatsApp:* ${sanitized.whatsapp}\n*Email:* ${sanitized.email}\n*ID:* ${inquiryId}`,
          },
        }),
      });
      if (waRes.ok) {
        whatsappStatus = "delivered";
      } else {
        whatsappStatus = "failed";
      }
    } catch {
      whatsappStatus = "failed";
    }
  }

  return {
    success: true,
    statusCode: 200,
    inquiryId,
    message: "Thank you! Your enquiry has been received. We will contact you on WhatsApp or email within 24 hours.",
    details: {
      dbSaved,
      emailSent,
      whatsappStatus,
    },
  };
}

function hashIp(ip: string): string {
  // Simple non-reversible mask for privacy compliance
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    hash = (hash << 5) - hash + ip.charCodeAt(i);
    hash |= 0;
  }
  return `ip_${Math.abs(hash)}`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
