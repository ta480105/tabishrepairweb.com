-- Migration 003: Enquiries are written only by the Render server.
-- Run after 001_create_enquiries.sql and 002_fix_permissions.sql.
-- This keeps RLS enabled and removes direct browser insert privileges.

ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

REVOKE ALL PRIVILEGES ON TABLE public.enquiries FROM anon, authenticated;
GRANT SELECT, INSERT ON TABLE public.enquiries TO service_role;

-- No public SELECT/INSERT policy is needed for the Render server:
-- it uses a server-side service_role/secret key, which must never be exposed
-- in the browser. RLS remains enabled as defense in depth.
DROP POLICY IF EXISTS "Allow anonymous submission of enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Deny public read access to enquiries" ON public.enquiries;
