-- Migration: 001_create_enquiries.sql
-- Description: Creates the customer enquiries table with constraints, indexes, GRANT privileges, and secure Row Level Security (RLS)

-- 1. Create enquiries table
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL CHECK (char_length(trim(name)) >= 2 AND char_length(name) <= 100),
    email TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    whatsapp TEXT NOT NULL CHECK (char_length(trim(whatsapp)) >= 7 AND char_length(whatsapp) <= 25),
    business_name TEXT NOT NULL CHECK (char_length(trim(business_name)) >= 1 AND char_length(business_name) <= 150),
    website_type TEXT NOT NULL CHECK (char_length(website_type) <= 80),
    budget TEXT NOT NULL CHECK (char_length(budget) <= 50),
    message TEXT NOT NULL CHECK (char_length(trim(message)) >= 5 AND char_length(message) <= 3000),
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'completed', 'archived')),
    ip_hash TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Performance indexes
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON public.enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries (status);
CREATE INDEX IF NOT EXISTS idx_enquiries_email ON public.enquiries (email);

-- 3. Grant table privileges (CRITICAL: Prevents PostgreSQL 42501 / HTTP 403 Forbidden)
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.enquiries TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT INSERT ON TABLE public.enquiries TO anon, authenticated;

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- 5. Secure RLS policies:
-- Deny public reading: Only authenticated service_role can select enquiries
DROP POLICY IF EXISTS "Deny public read access to enquiries" ON public.enquiries;
CREATE POLICY "Deny public read access to enquiries"
    ON public.enquiries
    FOR SELECT
    TO anon
    USING (false);

-- Allow anonymous and authenticated insertions with validation checks
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

-- Comments for documentation
COMMENT ON TABLE public.enquiries IS 'Customer lead and quote enquiries submitted via Tabish Web agency website';
COMMENT ON COLUMN public.enquiries.status IS 'Lead progress status: new, contacted, in_progress, completed, archived';
