# Tabish Web — Modern Agency Website

> **Tagline:** We build modern websites for businesses  
> **Location:** Chennai, Tamil Nadu, India  
> **WhatsApp:** [+91 9507375721](https://wa.me/919507375721)  
> **Contact Email:** ta480105@gmail.com  
> **Currency:** Indian Rupees (INR)  
> **Hosting Target:** Cloudflare Free Subdomain (`.pages.dev`)  
> **Database:** Supabase PostgreSQL with Row Level Security (RLS)  

---

## 1. Project Overview

Tabish Web is a high-performance digital studio website engineered for conversion. It helps small shops, retailers, restaurants, and local service businesses establish a professional online presence with transparent pricing, fast mobile responsiveness, and direct WhatsApp lead capture.

### Key Sections
1. **Hero Section:** Striking value proposition, verified photography, and clear dual CTAs.
2. **Trust & Benefits:** Highlighting mobile-first design, speed, SEO, and transparent pricing.
3. **Core Services:** 8 detailed service breakdown cards with scope deliverables.
4. **Portfolio Showcase:** 6 industry concept demos (Mobile Repair, Electronics, Dining, Grooming, Apparel, Contracting) with filter tabs and explicit Demo Project labels.
5. **Pricing Packages:** All 4 packages (Starter ₹1,000–₹1,300, Professional ₹1,500–₹1,800, Business Growth ₹2,000, Premium ₹3,000) with feature comparison table and scope transparency notes.
6. **8-Step Workflow:** Transparent step-by-step collaboration from inquiry to deployment.
7. **About Studio:** Grounded agency philosophy based in Chennai, Tamil Nadu with direct developer access.
8. **Comprehensive FAQ:** 12 questions with accessible accordions covering cost, timelines, revisions, domains, and hosting.
9. **Enquiry Capture Form:** Honeypot spam defense, client-side & server-side validation, Supabase persistence, and instant WhatsApp click-to-chat fallback.

---

## 2. Architecture & Tech Stack

- **Frontend:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4 + Plus Jakarta Sans + JetBrains Mono
- **Backend (Local / AI Studio):** Express full-stack server mounted in `server.ts` with Vite middlewares on port 3000
- **Backend (Cloudflare Production):** Cloudflare Pages Functions (`functions/api/inquiries.ts`, `functions/api/health.ts`)
- **Database:** Supabase PostgreSQL with RLS (`supabase/migrations/001_create_enquiries.sql`)
- **SEO & Social:** OpenGraph tags, Twitter Cards, Schema.org LocalBusiness JSON-LD, `sitemap.xml`, and `robots.txt`

---

## 3. Local Development & Testing

```bash
# Install dependencies
npm install

# Run the full-stack development server on port 3000
npm run dev

# Run TypeScript compilation check
npm run lint

# Run the automated test suite
npx tsx tests/inquiry.test.ts

# Build production bundle
npm run build
```

---

## 4. Supabase Setup Instructions

1. Log in to [Supabase](https://supabase.com) and create a new project.
2. Navigate to the **SQL Editor** tab in your Supabase dashboard.
3. Open `supabase/migrations/001_create_enquiries.sql` from this repository, paste its contents into the SQL Editor, and click **Run**.
4. This script will:
   - Create the `public.enquiries` table with constraints and indexes.
   - Enable **Row Level Security (RLS)**.
   - Restrict public `SELECT` queries (preventing public data leaks).
   - Allow validated `INSERT` submissions.
5. Navigate to **Project Settings > API** in Supabase and copy:
   - `Project URL` (`SUPABASE_URL`)
   - `service_role` key (`SUPABASE_SERVICE_ROLE_KEY`) as a server-side encrypted secret. A supported server-side `SUPABASE_SECRET_KEY` can be used instead. Never put either secret in frontend `VITE_` variables or commit it to Git. The backend does not fall back to the public anon key for writes.

---

## 5. Email Notification Provider Setup

When an enquiry is submitted, the server sends an alert to `ta480105@gmail.com`.
The backend uses standard HTTP REST calls compatible with **Resend**, **Brevo**, or **SendGrid**:

1. Sign up at [Resend](https://resend.com) (or your preferred email provider).
2. Generate an API Key.
3. Configure the following environment variables / Cloudflare secrets:
   ```bash
   EMAIL_PROVIDER_API_KEY="re_xxxxxxxxxxxxxx"
   EMAIL_FROM="Tabish Web Leads <onboarding@resend.dev>"
   INQUIRY_TO="ta480105@gmail.com"
   ```

---

## 6. WhatsApp Integration

### A. Click-to-Chat (100% Implemented & Active)
- Direct 1-tap WhatsApp buttons throughout the website formatted for international numbers (`+91 9507375721`).
- Pre-encoded messages pre-populate the visitor's WhatsApp chat with their requested package or service.

### B. Automated WhatsApp Notifications (Status: Pending Provider Credentials)
- Automated programmatic delivery to a personal WhatsApp number requires Meta's WhatsApp Cloud API or a verified provider (e.g. Twilio).
- The backend handler is pre-wired to support `WHATSAPP_CLOUD_API_TOKEN` and `WHATSAPP_PHONE_NUMBER_ID` when you decide to register a WhatsApp Business number.
- In the meantime, visitors can immediately forward their quote details via the 1-tap WhatsApp button on the success screen.

---

## 7. Cloudflare Deployment Steps

### Option A: Cloudflare Pages (Recommended)
1. Push your repository to GitHub or GitLab.
2. In the [Cloudflare Dashboard](https://dash.cloudflare.com/), go to **Workers & Pages > Create application > Pages > Connect to Git**.
3. Select your repository and set:
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. In **Settings > Environment variables**, add:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY` (Encrypted secret), or `SUPABASE_SECRET_KEY` (Encrypted secret)
   - `EMAIL_PROVIDER_API_KEY` (Encrypted secret)
   - `INQUIRY_TO` = `ta480105@gmail.com`
   - `WHATSAPP_NUMBER` = `919507375721`
5. Click **Save and Deploy**. Cloudflare automatically deploys your static frontend and mounts the Pages Functions in `functions/api/`.

### Option B: Cloudflare Wrangler CLI
```bash
# Build the project
npm run build

# Deploy directly via Wrangler
npx wrangler pages deploy dist --project-name tabish-web
```

---

## 8. Feature Status Matrix

| Feature | Status | Notes |
| :--- | :--- | :--- |
| **Hero, Services, About, Process** | **Implemented & Verified** | Responsive, dark luxury theme, verified Unsplash photography with fallbacks |
| **All 4 Pricing Packages** | **Implemented & Verified** | INR ranges (₹1,000 to ₹3,000), comparison table, transparency guidelines |
| **Portfolio Demos** | **Implemented & Verified** | 6 industry concepts with filter tabs and "Concept Project" badges |
| **FAQ Accordions** | **Implemented & Verified** | 12 questions answered with accessible toggles |
| **Enquiry Validation & Honeypot** | **Implemented & Verified** | 17/17 automated test assertions passed |
| **WhatsApp Click-to-Chat** | **Implemented & Verified** | Active across Hero, Navbar, Packages, and Floating button |
| **Supabase DB Storage** | **Code Complete** | Active once `SUPABASE_URL` & keys are provided |
| **Email Dispatch to ta480105@gmail.com** | **Code Complete** | Active once `EMAIL_PROVIDER_API_KEY` is provided |
| **Automated WhatsApp API** | **Pending Credentials** | Requires WhatsApp Cloud API setup; click-to-chat active |
