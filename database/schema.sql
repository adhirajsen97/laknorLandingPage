-- LAKNOR Email Subscription Database Schema
-- Run these commands in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table for "Get Notified" email subscriptions (main waitlist)
CREATE TABLE email_subscriptions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    marketing_consent BOOLEAN DEFAULT FALSE,
    source VARCHAR(100) DEFAULT 'landing_page',
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE,
    ip_address INET,
    user_agent TEXT,
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    notes TEXT
);

-- Table for Market Research participants
CREATE TABLE market_research_participants (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE,
    source VARCHAR(100) DEFAULT 'email_modal',
    ip_address INET,
    user_agent TEXT,
    survey_completed BOOLEAN DEFAULT FALSE,
    survey_completed_at TIMESTAMP WITH TIME ZONE,
    notes TEXT
);

-- Create indexes for better performance
CREATE INDEX idx_email_subscriptions_email ON email_subscriptions(email);
CREATE INDEX idx_email_subscriptions_subscribed_at ON email_subscriptions(subscribed_at);
CREATE INDEX idx_email_subscriptions_active ON email_subscriptions(is_active) WHERE is_active = TRUE;

CREATE INDEX idx_market_research_email ON market_research_participants(email);
CREATE INDEX idx_market_research_subscribed_at ON market_research_participants(subscribed_at);
CREATE INDEX idx_market_research_active ON market_research_participants(is_active) WHERE is_active = TRUE;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_email_subscriptions_updated_at
    BEFORE UPDATE ON email_subscriptions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_market_research_updated_at
    BEFORE UPDATE ON market_research_participants
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE email_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_research_participants ENABLE ROW LEVEL SECURITY;

-- Policy for service role to have full access (for API)
CREATE POLICY "Service role can manage email_subscriptions"
    ON email_subscriptions
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Service role can manage market_research_participants"
    ON market_research_participants
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- View for analytics (combining both tables)
CREATE VIEW subscription_analytics AS
SELECT 
    'email_subscription' as type,
    email,
    subscribed_at,
    source,
    is_active
FROM email_subscriptions
UNION ALL
SELECT 
    'market_research' as type,
    email,
    subscribed_at,
    source,
    is_active
FROM market_research_participants;

-- Function to get subscription stats
CREATE OR REPLACE FUNCTION get_subscription_stats()
RETURNS TABLE(
    total_subscriptions BIGINT,
    total_market_research BIGINT,
    today_subscriptions BIGINT,
    today_market_research BIGINT,
    active_subscriptions BIGINT,
    active_market_research BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        (SELECT COUNT(*) FROM email_subscriptions),
        (SELECT COUNT(*) FROM market_research_participants),
        (SELECT COUNT(*) FROM email_subscriptions WHERE DATE(subscribed_at) = CURRENT_DATE),
        (SELECT COUNT(*) FROM market_research_participants WHERE DATE(subscribed_at) = CURRENT_DATE),
        (SELECT COUNT(*) FROM email_subscriptions WHERE is_active = TRUE),
        (SELECT COUNT(*) FROM market_research_participants WHERE is_active = TRUE);
END;
$$ LANGUAGE plpgsql; 