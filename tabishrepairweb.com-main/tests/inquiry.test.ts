import { validateInquiryPayload } from "../src/shared/inquiryValidator";
import { processInquiry, checkRateLimit } from "../src/server/inquiryService";

console.log("=== RUNNING TABISH WEB SUITE TESTS ===");

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string) {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passed++;
  } else {
    console.error(`[FAIL] ${testName}`);
    failed++;
  }
}

// 1. Valid Payload Test
const validPayload = {
  name: "Arun Prakash",
  email: "arun@chennaitech.com",
  whatsapp: "+91 98765 43210",
  businessName: "Chennai Tech Solutions",
  websiteType: "Business website",
  budget: "₹1,500–₹1,800",
  message: "Need a multi-section website with our repair services and Google Map location.",
};
const res1 = validateInquiryPayload(validPayload);
assert(res1.valid === true, "Valid payload passes client/server validation");
assert(res1.sanitized?.whatsapp === "+919876543210", "WhatsApp phone digits sanitized properly");

// 2. Honeypot Anti-Spam Bot Test
const spamPayload = {
  ...validPayload,
  botTrap: "I am a spam bot attempting injection",
};
const resSpam = validateInquiryPayload(spamPayload);
assert(resSpam.valid === false, "Honeypot botTrap detects bot submission");
assert(!!resSpam.errors.botTrap, "botTrap error recorded");

// 3. Missing Fields Test
const missingPayload = {
  name: "",
  email: "bademail",
  whatsapp: "",
  businessName: "",
  websiteType: "InvalidType",
  budget: "InvalidBudget",
  message: "Hi",
};
const resMissing = validateInquiryPayload(missingPayload);
assert(resMissing.valid === false, "Incomplete payload rejected");
assert(!!resMissing.errors.name, "Name required error flagged");
assert(!!resMissing.errors.email, "Invalid email error flagged");
assert(!!resMissing.errors.whatsapp, "WhatsApp required error flagged");
assert(!!resMissing.errors.businessName, "Business name required error flagged");
assert(!!resMissing.errors.websiteType, "Invalid website type flagged");
assert(!!resMissing.errors.budget, "Invalid budget flagged");
assert(!!resMissing.errors.message, "Short message (<5 chars) flagged");

// 4. Server processInquiry behavior tests
async function runAsyncTests() {
  // Test A: Database failure scenario (e.g. Supabase permission denied 42501)
  // When SUPABASE_URL is configured but database rejects insertion, it MUST return failure
  const processResWithDb = await processInquiry(validPayload, "127.0.0.1", process.env);
  if (!processResWithDb.details?.dbSaved) {
    assert(processResWithDb.success === false, "Returns success: false when database insertion fails");
    assert(processResWithDb.statusCode === 500, "Returns statusCode 500 on database failure");
  } else {
    assert(processResWithDb.success === true, "Returns success: true when database insertion succeeds");
    assert(processResWithDb.statusCode === 200, "Returns statusCode 200 on database success");
  }

  // Test B: Validation rejection
  const processFail = await processInquiry({ name: "" }, "127.0.0.1", {});
  assert(processFail.success === false, "processInquiry rejects invalid data");
  assert(processFail.statusCode === 400, "Returns 400 on validation failure");

  // Test C: Unique inquiryId generated
  assert(!!processResWithDb.inquiryId, "Generates unique inquiryId");

  console.log(`\nTests Summary: ${passed} Passed, ${failed} Failed`);
  if (failed > 0) {
    process.exit(1);
  }
}

runAsyncTests().catch((err) => {
  console.error("Test execution error:", err);
  process.exit(1);
});
