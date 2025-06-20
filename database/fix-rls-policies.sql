-- Fix RLS Policies for LAKNOR Email Subscriptions
-- Run this in your Supabase SQL Editor if you're getting RLS policy errors

-- Drop existing policies
DROP POLICY IF EXISTS "Service role can manage email_subscriptions" ON email_subscriptions;
DROP POLICY IF EXISTS "Service role can manage market_research_participants" ON market_research_participants;

-- Create more permissive policies that work with API routes
CREATE POLICY "Allow API inserts to email_subscriptions"
    ON email_subscriptions
    FOR INSERT
    TO anon, authenticated, service_role
    WITH CHECK (true);

CREATE POLICY "Allow API inserts to market_research_participants"
    ON market_research_participants
    FOR INSERT
    TO anon, authenticated, service_role
    WITH CHECK (true);

-- Allow service role to read for analytics
CREATE POLICY "Allow service role to read email_subscriptions"
    ON email_subscriptions
    FOR SELECT
    TO service_role
    USING (true);

CREATE POLICY "Allow service role to read market_research_participants"
    ON market_research_participants
    FOR SELECT
    TO service_role
    USING (true);

-- Allow service role to update for analytics
CREATE POLICY "Allow service role to update email_subscriptions"
    ON email_subscriptions
    FOR UPDATE
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow service role to update market_research_participants"
    ON market_research_participants
    FOR UPDATE
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Temporarily disable RLS for testing (NOT for production)
ALTER TABLE email_subscriptions DISABLE ROW LEVEL SECURITY;
ALTER TABLE market_research_participants DISABLE ROW LEVEL SECURITY; 