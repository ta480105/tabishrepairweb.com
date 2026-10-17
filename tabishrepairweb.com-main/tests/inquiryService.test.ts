import test from "node:test";
import assert from "node:assert/strict";
import { processInquiry } from "../src/server/inquiryService.js";

const validPayload = {
  name: "Sample Customer",
  email: "sample.customer@example.com",
  whatsapp: "+919876543210",
  businessName: "Sample Test Business",
  websiteType: "Business website",
  budget: "₹1,500–₹1,800",
  message: "This is a safe automated test enquiry.",
  botTrap: "",
};

function env(extra: Record<string, string> = {}) {
  return {
    SUPABASE_URL: "https://example.supabase.co",
    SUPABASE_SERVICE_ROLE_KEY: "test-server-only-key",
    ...extra,
  };
}

test("invalid payload is rejected before any database request", async () => {
  const originalFetch = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = (async () => {
    calls++;
    return new Response("{}", { status: 500 });
  }) as typeof fetch;
  try {
    const result = await processInquiry({ ...validPayload, email: "bad-email" }, "test-invalid", env());
    assert.equal(result.success, false);
    assert.equal(result.statusCode, 400);
    assert.ok(result.errors?.email);
    assert.equal(calls, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("missing server-side key fails closed with 503 and no success response", async () => {
  const originalFetch = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = (async () => {
    calls++;
    return new Response("{}", { status: 500 });
  }) as typeof fetch;
  try {
    const result = await processInquiry(validPayload, "test-missing-key", {
      SUPABASE_URL: "https://example.supabase.co",
    });
    assert.equal(result.success, false);
    assert.equal(result.statusCode, 503);
    assert.equal(result.details?.dbSaved, false);
    assert.equal(calls, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("successful insert requires a returned database row ID", async () => {
  const originalFetch = globalThis.fetch;
  const requests: string[] = [];
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    requests.push(String(input));
    return new Response(JSON.stringify({ id: "00000000-0000-4000-8000-000000000001" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;
  try {
    const result = await processInquiry(validPayload, "test-insert-success", env());
    assert.equal(result.success, true);
    assert.equal(result.statusCode, 200);
    assert.equal(result.details?.dbSaved, true);
    assert.equal(result.inquiryId, "00000000-0000-4000-8000-000000000001");
    assert.equal(requests.length, 1);
    assert.match(requests[0], /\/rest\/v1\/enquiries/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("database failure returns failure and does not send notification requests", async () => {
  const originalFetch = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = (async () => {
    calls++;
    return new Response(JSON.stringify({
      code: "42501",
      message: "permission denied for table enquiries",
      details: null,
      hint: null,
    }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;
  try {
    const result = await processInquiry(validPayload, "test-insert-failure", env({
      EMAIL_PROVIDER_API_KEY: "test-email-key",
      WHATSAPP_CLOUD_API_TOKEN: "test-wa-token",
      WHATSAPP_PHONE_NUMBER_ID: "test-phone-id",
    }));
    assert.equal(result.success, false);
    assert.equal(result.details?.dbSaved, false);
    assert.equal(result.details?.emailSent, false);
    assert.equal(result.details?.whatsappStatus, "not_configured");
    assert.equal(calls, 1, "no email or WhatsApp API request should run after insert failure");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
