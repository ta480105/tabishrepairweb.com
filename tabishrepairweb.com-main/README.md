# Tabish Web — Render + Supabase

This repository contains the Tabish Web React/Vite frontend and the Express API server used by Render. Enquiry submissions go through `POST /api/inquiries` and are saved server-side to `public.enquiries` in Supabase.

## Render deployment

The included `render.yaml` uses:
- Dependency install: Render detects `bun.lock` and uses Bun; the build command is `npm run build`
- Start command: `npm start`
- Health check: `/api/health`

If configuring the service manually, use the same commands. The repository root must be the folder containing `package.json`.

## Required Render environment variables

In Render → your Web Service → Environment, configure:

- `NODE_ENV` = `production`
- `SUPABASE_URL` = `https://hferuydnljjfuccxhnbn.supabase.co` (the project URL provided for this deployment)
- `SUPABASE_SERVICE_ROLE_KEY` = your project's legacy `service_role` secret key, **or** use the newer server-side key as `SUPABASE_SECRET_KEY` instead. Set one server-side key; the server accepts either name. Do not use a publishable/anon key for this server insert path.
- `PORT` is supplied by Render automatically; do not hardcode it.

Optional:
- `EMAIL_PROVIDER_API_KEY` = Resend API key (email is sent only when configured)
- `EMAIL_FROM` = a sender verified with your email provider; default in the blueprint is `Tabish Web <onboarding@resend.dev>` and may need changing for production.
- `INQUIRY_TO` = destination email for enquiry notifications.
- `WHATSAPP_CLOUD_API_TOKEN` and `WHATSAPP_PHONE_NUMBER_ID` = configure both to enable automated WhatsApp API notifications.
- `WHATSAPP_NUMBER` = recipient phone number in international digits-only format.

Never place `SUPABASE_SERVICE_ROLE_KEY` or `SUPABASE_SECRET_KEY` in any `VITE_` variable, browser code, or client bundle. Never paste secrets into chat or commit them to GitHub.

## Supabase database setup

The code inserts into `public.enquiries` using these columns:
`name`, `email`, `whatsapp`, `business_name`, `website_type`, `budget`, `message`, `status`, `ip_hash`.

Run the SQL files in order in Supabase Dashboard → SQL Editor:
1. `supabase/migrations/001_create_enquiries.sql`
2. `supabase/migrations/002_fix_permissions.sql`
3. `supabase/migrations/003_server_only_enquiries.sql`

Migration 003 keeps RLS enabled and removes direct `anon`/`authenticated` table privileges because the website form submits only through the Render backend. The backend uses a server-side secret and the Supabase client requests the inserted row ID to confirm the write. Do not disable RLS.

The migration files are idempotent for the included schema, but review them against any custom policies or grants before applying to an existing production database.

To inspect the actual live table before/after migration, run this read-only query in Supabase SQL Editor:

```sql
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'enquiries'
ORDER BY ordinal_position;

SELECT c.relrowsecurity AS rls_enabled
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public' AND c.relname = 'enquiries';
```

The ZIP cannot prove the live database's current schema or grants. Compare this query's output with migration 001 and review any custom policies before changing production permissions.

## Local setup

```bash
bun install --frozen-lockfile
cp .env.example .env
# Fill .env locally with a valid Supabase URL and one server-side key.
npm run dev
```

## Build, lint, and tests

```bash
bun install --frozen-lockfile
npm run build
npm run lint
npm test
npm start
```

`npm start` listens on Render's `PORT` or port 3000 locally. Health check: `GET /api/health`.

## Enquiry API behavior

- `POST /api/inquiries` accepts JSON.
- Invalid payloads return HTTP 400 with field errors.
- More than five requests per IP in one minute returns HTTP 429 (in-memory, per process).
- Missing Supabase configuration returns HTTP 503.
- A Supabase insert error returns a failure response and never a false success.
- Email/WhatsApp notifications run only after the database insert is confirmed. A notification failure does not change the saved enquiry's success response.
- Logs include a generated reference and safe status metadata. Never log environment values or keys.

## Replacing the GitHub project

From the project root after copying the corrected files into your existing checkout:

```powershell
git status
git add -A
git commit -m "Fix Render enquiry database pipeline"
git push origin main
```

Then wait for Render to deploy the new commit. Check `/api/health`, then submit a clearly labelled test enquiry and verify the row in Supabase Table Editor → `public.enquiries`. Delete the test row afterward if desired.
