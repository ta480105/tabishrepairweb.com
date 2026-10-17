-- Migration: 002_fix_permissions.sql
-- Description: Fixes HTTP 403 / Postgres error 42501 (permission denied for table enquiries)
-- Run this in the Supabase Dashboard -> SQL Editor

-- 1. Grant schema usage to standard Supabase API roles
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

-- 2. Grant full table permissions to service_role (used by server-side endpoints in Cloudflare Pages and local dev)
GRANT ALL ON TABLE public.enquiries TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- 3. Grant INSERT permission to anon and authenticated roles (used when anon key is provided)
GRANT INSERT ON TABLE public.enquiries TO anon, authenticated;

-- 4. Ensure Row Level Security (RLS) is enabled
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- 5. Security Policy: Deny public SELECT/reading (protects customer privacy)
DROP POLICY IF EXISTS "Deny public read access to enquiries" ON public.enquiries;
CREATE POLICY "Deny public read access to enquiries"
    ON public.enquiries
    FOR SELECT
    TO anon
    USING (false);

-- 6. Security Policy: Allow anonymous and authenticated INSERT
DROP POLICY IF EXISTS "Allow anonymous submission of enquiries" ON public.enquiries;
CREATE POLICY "Allow anonymous submission of enquiries"
    ON public.enquiries
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        char_length(trim(name)) >= 2 AND
        char_length(trim(business_name)) >= 1 AND
        char_length(trim(message)) >= 5
    );
